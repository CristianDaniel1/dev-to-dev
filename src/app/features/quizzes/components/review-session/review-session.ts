import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  effect,
  inject,
  resource,
  signal,
  untracked,
} from '@angular/core';
import type { DueEntry } from '@/core/lib/review-queue';
import { dueQuestions } from '@/core/lib/review-queue';
import { ProgressStore } from '@/core/services/progress.store';
import { CATALOG } from '@/shared/generated/catalog';
import { QuizContent } from '@/shared/services/quiz-content';
import { REVIEW_SESSION_SIZE } from '../../constants/session.constants';
import { mixedScope } from '../../lib/session-scope';
import { QuizSessionStore } from '../../services/quiz-session.store';
import { SessionRunner } from '../session-runner/session-runner';

/**
 * Review session with the most overdue questions. The due list is taken once when the page
 * opens, so answering (which reschedules questions) does not change the running session.
 */
@Component({
  selector: 'app-review-session',
  imports: [SessionRunner],
  providers: [QuizSessionStore],
  templateUrl: './review-session.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewSession {
  private readonly store = inject(QuizSessionStore);
  private readonly content = inject(QuizContent);
  private readonly progress = inject(ProgressStore);
  private readonly due = signal<readonly DueEntry[] | null>(null);

  private readonly techs = computed(() => {
    const slugs = new Set(this.due()?.map((entry) => entry.tech));
    return CATALOG.techs.filter((tech) => slugs.has(tech.slug));
  });
  protected readonly scope = computed(() => mixedScope(this.techs(), 'review'));
  protected readonly questions = resource({
    params: () => (this.due() ? this.techs().map((tech) => tech.slug) : undefined),
    loader: ({ params }) => this.content.loadQuestions(params),
  });

  constructor() {
    afterNextRender(() =>
      this.due.set(
        dueQuestions(this.progress.questions(), Date.now()).slice(0, REVIEW_SESSION_SIZE),
      ),
    );
    effect(() => {
      const questions = this.questions.value();
      const due = this.due();
      if (!questions || !due) return;
      const scope = this.scope();
      untracked(() =>
        this.store.start(scope, due.length ? questions : [], {
          filters: {
            topics: [],
            level: null,
            onlyUnanswered: false,
            ids: due.map((entry) => entry.id),
          },
          limit: null,
          seed: Date.now(),
        }),
      );
    });
  }
}
