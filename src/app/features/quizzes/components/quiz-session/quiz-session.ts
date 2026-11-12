import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  resource,
  untracked,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectIsHydrated } from '@/core/lib/hydration';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import { findTech } from '@/shared/lib/find-tech';
import type { Question } from '@/shared/interfaces/content.interface';
import { QuizContent } from '@/shared/services/quiz-content';
import {
  DEFAULT_EXAM_SIZE,
  DEFAULT_SESSION_SIZE,
  MINUTE_MS,
} from '../../constants/session.constants';
import type { SessionScope } from '../../interfaces/session-scope.interface';
import type { SessionConfig } from '../../interfaces/session.interface';
import { examMinutesFromParam } from '../../lib/exam-params';
import { toSessionConfig } from '../../lib/session-params';
import { techScope } from '../../lib/session-scope';
import { QuizSessionStore } from '../../services/quiz-session.store';
import { SessionRunner } from '../session-runner/session-runner';

/**
 * Practice or exam session of one tech. Prerendered as a loading shell; the question bank
 * loads and the session starts only in the browser.
 */
@Component({
  selector: 'app-quiz-session',
  imports: [RouterLink, EmptyState, SessionRunner],
  providers: [QuizSessionStore],
  templateUrl: './quiz-session.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizSession {
  /** Route param, route data and query params, bound by `withComponentInputBinding`. */
  readonly tech = input.required<string>();
  readonly kind = input<'practice' | 'exam'>('practice');
  readonly topico = input<string>();
  readonly nivel = input<string>();
  readonly qtd = input<string>();
  readonly novas = input<string>();
  readonly ids = input<string>();
  readonly tempo = input<string>();

  private readonly store = inject(QuizSessionStore);
  private readonly content = inject(QuizContent);
  private readonly isHydrated = injectIsHydrated();

  protected readonly summary = computed(() => findTech(this.tech()));
  protected readonly scope = computed(() => {
    const tech = this.summary();
    return tech ? techScope(tech, this.kind()) : null;
  });
  protected readonly questions = resource({
    params: () => (this.isHydrated() ? this.tech() : undefined),
    loader: ({ params }) => this.content.loadQuestions([params]),
  });
  private readonly config = computed(() =>
    toSessionConfig(
      {
        topico: this.topico(),
        nivel: this.nivel(),
        qtd: this.qtd(),
        novas: this.novas(),
        ids: this.ids(),
      },
      this.kind() === 'exam' ? DEFAULT_EXAM_SIZE : DEFAULT_SESSION_SIZE,
    ),
  );
  private readonly examMinutes = computed(() =>
    this.kind() === 'exam' ? examMinutesFromParam(this.tempo()) : null,
  );

  constructor() {
    effect(() => {
      const questions = this.questions.value();
      const scope = this.scope();
      const config = this.config();
      const minutes = this.examMinutes();
      if (!questions || !scope) return;
      untracked(() => this.start(questions, scope, config, minutes));
    });
  }

  /** Starts a fresh session with the same settings and a new random order. */
  protected restart(): void {
    const questions = this.questions.value();
    const scope = this.scope();
    if (!questions || !scope) return;
    this.start(questions, scope, this.config(), this.examMinutes());
    globalThis.scrollTo?.({ top: 0 });
  }

  private start(
    questions: readonly Question[],
    scope: SessionScope,
    config: Omit<SessionConfig, 'seed'>,
    minutes: number | null,
  ): void {
    const now = Date.now();
    const deadline = minutes ? now + minutes * MINUTE_MS : null;
    this.store.start(scope, questions, { ...config, seed: now }, deadline);
  }
}
