import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  resource,
  signal,
  untracked,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import { findTech } from '@/shared/lib/find-tech';
import { QuizContent } from '@/shared/services/quiz-content';
import { isControlTarget, isTypingTarget, optionIndexForKey } from '../../lib/keyboard';
import { toSessionConfig } from '../../lib/session-params';
import { QuizSessionStore } from '../../services/quiz-session.store';
import { AnswerFeedback } from '../answer-feedback/answer-feedback';
import { ConfidencePrompt } from '../confidence-prompt/confidence-prompt';
import { QuestionCard } from '../question-card/question-card';
import { SessionHeader } from '../session-header/session-header';
import { SessionLoading } from '../session-loading/session-loading';
import { SessionResults } from '../session-results/session-results';

/**
 * Practice session page. Prerendered as a loading shell; the question bank loads and the
 * session starts only in the browser.
 */
@Component({
  selector: 'app-quiz-session',
  imports: [
    RouterLink,
    EmptyState,
    AnswerFeedback,
    ConfidencePrompt,
    QuestionCard,
    SessionHeader,
    SessionLoading,
    SessionResults,
  ],
  providers: [QuizSessionStore],
  templateUrl: './quiz-session.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onKeydown($event)' },
})
export class QuizSession {
  /** Route param and query params, bound by `withComponentInputBinding`. */
  readonly tech = input.required<string>();
  readonly topico = input<string>();
  readonly nivel = input<string>();
  readonly qtd = input<string>();
  readonly novas = input<string>();
  readonly ids = input<string>();

  protected readonly store = inject(QuizSessionStore);
  private readonly content = inject(QuizContent);
  private readonly isHydrated = signal(false);

  protected readonly summary = computed(() => findTech(this.tech()));
  protected readonly bank = resource({
    params: () => (this.isHydrated() ? this.tech() : undefined),
    loader: ({ params }) => this.content.loadBank(params),
  });
  private readonly config = computed(() =>
    toSessionConfig({
      topico: this.topico(),
      nivel: this.nivel(),
      qtd: this.qtd(),
      novas: this.novas(),
      ids: this.ids(),
    }),
  );

  constructor() {
    afterNextRender(() => this.isHydrated.set(true));
    effect(() => {
      const bank = this.bank.value();
      const tech = this.summary();
      const config = this.config();
      if (!bank || !tech) return;
      untracked(() => this.store.start(tech, bank, { ...config, seed: Date.now() }));
    });
  }

  /** Starts a fresh session with the same filters and a new random order. */
  protected restart(): void {
    const bank = this.bank.value();
    const tech = this.summary();
    if (!bank || !tech) return;
    this.store.start(tech, bank, { ...this.config(), seed: Date.now() });
    globalThis.scrollTo?.({ top: 0 });
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
    if (this.store.status() !== 'active' || isTypingTarget(event.target)) return;

    if (!this.store.isRevealed()) {
      const position = optionIndexForKey(event.key);
      if (position < 0) return;
      event.preventDefault();
      this.store.toggleAt(position);
      return;
    }
    if (event.key === 'Enter' && !isControlTarget(event.target)) {
      event.preventDefault();
      this.store.next();
    }
  }
}
