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
import { injectIsHydrated } from '@/core/lib/hydration';
import { CATALOG } from '@/shared/generated/catalog';
import { QuizContent } from '@/shared/services/quiz-content';
import { toSessionConfig } from '../../lib/session-params';
import { mixedScope } from '../../lib/session-scope';
import { techListFromParam } from '../../lib/tech-list';
import { QuizSessionStore } from '../../services/quiz-session.store';
import { SessionRunner } from '../session-runner/session-runner';

/** Practice session mixing questions of several techs. Starts only in the browser. */
@Component({
  selector: 'app-random-session',
  imports: [SessionRunner],
  providers: [QuizSessionStore],
  templateUrl: './random-session.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomSession {
  /** Query params, bound by `withComponentInputBinding`. */
  readonly techs = input<string>();
  readonly nivel = input<string>();
  readonly qtd = input<string>();
  readonly novas = input<string>();
  readonly ids = input<string>();

  private readonly store = inject(QuizSessionStore);
  private readonly content = inject(QuizContent);
  private readonly isHydrated = injectIsHydrated();

  private readonly chosen = computed(() => {
    const slugs = techListFromParam(
      this.techs(),
      CATALOG.techs.map((tech) => tech.slug),
    );
    return CATALOG.techs.filter((tech) => slugs.includes(tech.slug));
  });
  protected readonly scope = computed(() => mixedScope(this.chosen(), 'random'));
  protected readonly questions = resource({
    params: () => (this.isHydrated() ? this.chosen().map((tech) => tech.slug) : undefined),
    loader: ({ params }) => this.content.loadQuestions(params),
  });
  private readonly config = computed(() =>
    toSessionConfig({
      topico: undefined,
      nivel: this.nivel(),
      qtd: this.qtd(),
      novas: this.novas(),
      ids: this.ids(),
    }),
  );

  constructor() {
    effect(() => {
      const questions = this.questions.value();
      const scope = this.scope();
      const config = this.config();
      if (!questions) return;
      untracked(() => this.store.start(scope, questions, { ...config, seed: Date.now() }));
    });
  }

  /** Starts a new round with the same choices. */
  protected restart(): void {
    const questions = this.questions.value();
    if (!questions) return;
    this.store.start(this.scope(), questions, { ...this.config(), seed: Date.now() });
    globalThis.scrollTo?.({ top: 0 });
  }
}
