import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import type { SessionScope } from '../../interfaces/session-scope.interface';
import { isControlTarget, isTypingTarget, optionIndexForKey } from '../../lib/keyboard';
import { QuizSessionStore } from '../../services/quiz-session.store';
import { AnswerFeedback } from '../answer-feedback/answer-feedback';
import { ConfidencePrompt } from '../confidence-prompt/confidence-prompt';
import { QuestionCard } from '../question-card/question-card';
import { SessionHeader } from '../session-header/session-header';
import { SessionLoading } from '../session-loading/session-loading';
import { SessionResults } from '../session-results/session-results';
import { SessionTimer } from '../session-timer/session-timer';

/**
 * Screen of a running session, shared by every mode: loading, empty, questions (with feedback
 * in practice or silent answers in an exam) and results. The page provides the store and starts
 * the session; this component only renders it and handles the keyboard shortcuts.
 */
@Component({
  selector: 'app-session-runner',
  imports: [
    RouterLink,
    EmptyState,
    AnswerFeedback,
    ConfidencePrompt,
    QuestionCard,
    SessionHeader,
    SessionLoading,
    SessionResults,
    SessionTimer,
  ],
  templateUrl: './session-runner.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onKeydown($event)' },
})
export class SessionRunner {
  readonly scope = input.required<SessionScope>();
  /** The questions could not be loaded. */
  readonly loadFailed = input(false);
  /** Asks the page to load the questions again. */
  readonly reload = output();
  /** Asks the page for a new session with the same settings. */
  readonly restart = output();

  protected readonly store = inject(QuizSessionStore);

  protected onKeydown(event: KeyboardEvent): void {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
    if (this.store.status() !== 'active' || isTypingTarget(event.target)) return;

    if (!this.store.isRevealed()) {
      const position = optionIndexForKey(event.key);
      if (position >= 0) {
        event.preventDefault();
        this.store.toggleAt(position);
        return;
      }
      if (event.key === 'Enter' && this.store.isExam() && !isControlTarget(event.target)) {
        event.preventDefault();
        this.store.submitExam();
      }
      return;
    }
    if (event.key === 'Enter' && !isControlTarget(event.target)) {
      event.preventDefault();
      this.store.next();
    }
  }
}
