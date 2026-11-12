import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EMPTY_PROGRESS_STATE, MAX_SESSION_HISTORY } from '../constants/progress.constants';
import { PROGRESS_STORAGE_KEY } from '../constants/storage.constants';
import type {
  Confidence,
  ProgressQuestionRef,
  ProgressState,
  ProgressStats,
  QuestionProgress,
  SessionRecord,
} from '../interfaces/progress.interface';
import { nextBox, nextReviewAt } from '../lib/leitner';
import { isMastered, isProgressState } from '../lib/progress';
import { PersistentStorage } from './persistent-storage';

/**
 * The user's quiz progress, kept only in this browser. Loaded on the client; on the server it
 * stays empty, so prerendered pages show the neutral state.
 */
@Injectable({ providedIn: 'root' })
export class ProgressStore {
  private readonly storage = inject(PersistentStorage);
  private readonly state = signal<ProgressState>(EMPTY_PROGRESS_STATE);

  readonly questions = computed(() => this.state().questions);
  readonly sessions = computed(() => this.state().sessions);

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    const stored = this.storage.read(PROGRESS_STORAGE_KEY, isProgressState);
    if (stored) this.state.set(stored);
  }

  /**
   * Counts answered and mastered questions. Reactive inside `computed` and templates.
   *
   * @param tech - Tech slug.
   * @param topic - Optional topic slug to narrow the count.
   * @returns The answered and mastered counts.
   */
  statsFor(tech: string, topic?: string): ProgressStats {
    const entries = Object.values(this.questions()).filter(
      (progress) => progress.tech === tech && (!topic || progress.topic === topic),
    );
    return { answered: entries.length, mastered: entries.filter(isMastered).length };
  }

  /**
   * Records one answer and moves the question between Leitner boxes.
   *
   * @param question - The answered question.
   * @param correct - Whether the answer was right.
   * @param confidence - How sure the user was.
   * @param now - Current time, in milliseconds.
   */
  recordAnswer(
    question: ProgressQuestionRef,
    correct: boolean,
    confidence: Confidence,
    now = Date.now(),
  ): void {
    this.update((state) => {
      const previous = state.questions[question.id];
      const box = nextBox(previous?.box ?? 0, correct, confidence);
      const progress: QuestionProgress = {
        tech: question.tech,
        topic: question.topic,
        attempts: (previous?.attempts ?? 0) + 1,
        correctCount: (previous?.correctCount ?? 0) + (correct ? 1 : 0),
        lastCorrect: correct,
        lastConfidence: confidence,
        box,
        lastAnsweredAt: now,
        nextReviewAt: nextReviewAt(box, now),
      };
      return { ...state, questions: { ...state.questions, [question.id]: progress } };
    });
  }

  /**
   * Adds a finished session to the history, keeping the most recent ones.
   *
   * @param session - Summary of the finished session.
   */
  recordSession(session: SessionRecord): void {
    this.update((state) => ({
      ...state,
      sessions: [session, ...state.sessions].slice(0, MAX_SESSION_HISTORY),
    }));
  }

  private update(change: (state: ProgressState) => ProgressState): void {
    this.state.update(change);
    this.storage.write(PROGRESS_STORAGE_KEY, this.state());
  }
}
