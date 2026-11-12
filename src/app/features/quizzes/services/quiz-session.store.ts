import { Injectable, computed, inject, signal } from '@angular/core';
import type { Confidence } from '@/core/interfaces/progress.interface';
import { ProgressStore } from '@/core/services/progress.store';
import type { Question } from '@/shared/interfaces/content.interface';
import type { AnswerRecord } from '../interfaces/scoring.interface';
import type { SessionScope } from '../interfaces/session-scope.interface';
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
 * State of one session (practice, exam, review or random). Provided by the session page, so it
 * is created on entry and discarded when the user leaves.
 *
 * In practice-like sessions each answer is revealed with its explanation before moving on. In
 * an exam, answers are recorded silently and the results come at the end, or when time runs out.
 */
@Injectable()
export class QuizSessionStore {
  private readonly progress = inject(ProgressStore);

  private readonly scopeState = signal<SessionScope | null>(null);
  private readonly items = signal<SessionItem[]>([]);
  private readonly answers = signal<AnswerRecord[]>([]);
  private readonly statusState = signal<SessionStatus>('idle');
  private readonly indexState = signal(0);
  private readonly selectionState = signal<readonly string[]>([]);
  private readonly deadlineState = signal<number | null>(null);

  readonly scope = this.scopeState.asReadonly();
  readonly status = this.statusState.asReadonly();
  readonly index = this.indexState.asReadonly();
  readonly selection = this.selectionState.asReadonly();
  /** When an exam ends by itself, in milliseconds; `null` without a timer. */
  readonly deadline = this.deadlineState.asReadonly();
  readonly isExam = computed(() => this.scopeState()?.kind === 'exam');
  readonly total = computed(() => this.items().length);
  readonly current = computed(() => this.items()[this.index()] ?? null);
  readonly currentAnswer = computed(() => {
    const questionId = this.current()?.question.id;
    return this.answers().find((answer) => answer.questionId === questionId) ?? null;
  });
  readonly isRevealed = computed(() => !this.isExam() && !!this.currentAnswer());
  readonly isLast = computed(() => this.index() === this.total() - 1);
  readonly answeredCount = computed(() => this.answers().length);
  readonly summary = computed(() => {
    const scope = this.scopeState();
    if (!scope || this.status() !== 'finished') return null;
    return summarizeSession(
      this.items().map((item) => item.question),
      this.answers(),
      scope.groups,
      scope.groupOf,
    );
  });
  readonly reviewItems = computed<ReviewItem[]>(() => {
    const answersById = new Map(this.answers().map((answer) => [answer.questionId, answer]));
    return this.items().map((item) => ({ ...item, answer: answersById.get(item.question.id) }));
  });

  /**
   * Starts a new session.
   *
   * @param scope - What the session covers.
   * @param questions - Pool to pick from (one or more question banks).
   * @param config - Filters, size and random seed.
   * @param deadline - When an exam ends by itself, or `null` for no timer.
   */
  start(
    scope: SessionScope,
    questions: readonly Question[],
    config: SessionConfig,
    deadline: number | null = null,
  ): void {
    const random = createRandom(config.seed);
    const picked = selectQuestions(
      questions,
      config.filters,
      this.progress.questions(),
      config.limit,
      random,
    );
    this.scopeState.set(scope);
    this.items.set(
      picked.map((question) => ({ question, options: shuffle(question.options, random) })),
    );
    this.answers.set([]);
    this.indexState.set(0);
    this.selectionState.set([]);
    this.deadlineState.set(picked.length ? deadline : null);
    this.statusState.set(picked.length ? 'active' : 'empty');
  }

  /**
   * Selects an option (single choice) or toggles it (multiple choice); ignored after submitting.
   *
   * @param optionId - Option to select or toggle.
   */
  toggle(optionId: string): void {
    const item = this.current();
    if (!item || this.isRevealed() || this.status() !== 'active') return;
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
   * Submits the current selection with the user's confidence and reveals the answer
   * (practice-like sessions only).
   *
   * @param confidence - How sure the user was.
   */
  submit(confidence: Confidence): void {
    if (this.isExam() || this.currentAnswer()) return;
    this.record(confidence);
  }

  /** Records the exam answer without revealing it and moves on (exam only). */
  submitExam(): void {
    if (!this.isExam() || this.currentAnswer()) return;
    if (!this.record('sure')) return;
    this.advance();
  }

  /** Moves to the next revealed question, or finishes after the last one. */
  next(): void {
    if (!this.isRevealed()) return;
    this.advance();
  }

  /** Ends an exam whose time ran out; unanswered questions count as wrong. */
  expire(): void {
    if (this.status() === 'active') this.finish();
  }

  private record(confidence: Confidence): boolean {
    const item = this.current();
    const selected = this.selection();
    if (!item || !selected.length || this.status() !== 'active') return false;
    const correct = isAnswerCorrect(item.question, selected);
    this.answers.update((answers) => [
      ...answers,
      { questionId: item.question.id, selected, correct, confidence },
    ]);
    this.progress.recordAnswer(item.question, correct, confidence);
    return true;
  }

  private advance(): void {
    if (this.isLast()) {
      this.finish();
      return;
    }
    this.indexState.update((index) => index + 1);
    this.selectionState.set([]);
  }

  private finish(): void {
    this.statusState.set('finished');
    this.deadlineState.set(null);
    const scope = this.scopeState();
    if (!scope) return;
    this.progress.recordSession({
      tech: scope.techs.length === 1 ? (scope.techs[0] ?? '') : '',
      kind: scope.kind,
      total: this.total(),
      correct: this.answers().filter((answer) => answer.correct).length,
      finishedAt: Date.now(),
    });
  }
}
