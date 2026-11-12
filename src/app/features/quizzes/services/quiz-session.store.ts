import { Injectable, computed, inject, signal } from '@angular/core';
import type { Confidence } from '@/core/interfaces/progress.interface';
import { ProgressStore } from '@/core/services/progress.store';
import type { QuizBank, TechSummary } from '@/shared/interfaces/content.interface';
import type { AnswerRecord } from '../interfaces/scoring.interface';
import type {
  ReviewItem,
  SessionConfig,
  SessionItem,
  SessionStatus,
} from '../interfaces/session.interface';
import { createRandom, shuffle } from '../lib/random';
import { isAnswerCorrect, summarizeSession } from '../lib/scoring';
import { selectQuestions } from '../lib/select-questions';

/**
 * State of one practice session. Provided by the session page, so it is created on entry and
 * discarded when the user leaves.
 */
@Injectable()
export class QuizSessionStore {
  private readonly progress = inject(ProgressStore);

  private readonly tech = signal<TechSummary | null>(null);
  private readonly items = signal<SessionItem[]>([]);
  private readonly answers = signal<AnswerRecord[]>([]);
  private readonly statusState = signal<SessionStatus>('idle');
  private readonly indexState = signal(0);
  private readonly selectionState = signal<readonly string[]>([]);

  readonly status = this.statusState.asReadonly();
  readonly index = this.indexState.asReadonly();
  readonly selection = this.selectionState.asReadonly();
  readonly total = computed(() => this.items().length);
  readonly current = computed(() => this.items()[this.index()] ?? null);
  readonly currentAnswer = computed(() => {
    const questionId = this.current()?.question.id;
    return this.answers().find((answer) => answer.questionId === questionId) ?? null;
  });
  readonly isRevealed = computed(() => !!this.currentAnswer());
  readonly isLast = computed(() => this.index() === this.total() - 1);
  readonly answeredCount = computed(() => this.answers().length);
  readonly summary = computed(() => {
    const tech = this.tech();
    if (!tech || this.status() !== 'finished') return null;
    return summarizeSession(
      this.items().map((item) => item.question),
      this.answers(),
      tech.topics,
    );
  });
  readonly reviewItems = computed<ReviewItem[]>(() => {
    const answersById = new Map(this.answers().map((answer) => [answer.questionId, answer]));
    return this.items().map((item) => ({ ...item, answer: answersById.get(item.question.id) }));
  });

  /**
   * Starts a new session from a question bank.
   *
   * @param tech - Tech of the session.
   * @param bank - Question bank of the tech.
   * @param config - Filters, size and random seed.
   */
  start(tech: TechSummary, bank: QuizBank, config: SessionConfig): void {
    const random = createRandom(config.seed);
    const questions = selectQuestions(
      bank.questions,
      config.filters,
      this.progress.questions(),
      config.limit,
      random,
    );
    this.tech.set(tech);
    this.items.set(
      questions.map((question) => ({ question, options: shuffle(question.options, random) })),
    );
    this.answers.set([]);
    this.indexState.set(0);
    this.selectionState.set([]);
    this.statusState.set(questions.length ? 'active' : 'empty');
  }

  /**
   * Selects an option (single choice) or toggles it (multiple choice); ignored after submitting.
   *
   * @param optionId - Option to select or toggle.
   */
  toggle(optionId: string): void {
    const item = this.current();
    if (!item || this.isRevealed()) return;
    if (item.question.kind === 'single') {
      this.selectionState.set([optionId]);
      return;
    }
    this.selectionState.update((selected) =>
      selected.includes(optionId)
        ? selected.filter((id) => id !== optionId)
        : [...selected, optionId],
    );
  }

  /**
   * Selects the option shown at a position, as the keyboard shortcuts do.
   *
   * @param position - Zero-based position of the option.
   */
  toggleAt(position: number): void {
    const option = this.current()?.options[position];
    if (option) this.toggle(option.id);
  }

  /**
   * Submits the current selection with the user's confidence and records the progress.
   *
   * @param confidence - How sure the user was.
   */
  submit(confidence: Confidence): void {
    const item = this.current();
    const selected = this.selection();
    if (!item || !selected.length || this.isRevealed()) return;
    const correct = isAnswerCorrect(item.question, selected);
    this.answers.update((answers) => [
      ...answers,
      { questionId: item.question.id, selected, correct, confidence },
    ]);
    this.progress.recordAnswer(item.question, correct, confidence);
  }

  /** Moves to the next question, or finishes the session after the last one. */
  next(): void {
    if (!this.isRevealed()) return;
    if (!this.isLast()) {
      this.indexState.update((index) => index + 1);
      this.selectionState.set([]);
      return;
    }
    this.finish();
  }

  private finish(): void {
    this.statusState.set('finished');
    const tech = this.tech();
    if (!tech) return;
    this.progress.recordSession({
      tech: tech.slug,
      total: this.total(),
      correct: this.answers().filter((answer) => answer.correct).length,
      finishedAt: Date.now(),
    });
  }
}
