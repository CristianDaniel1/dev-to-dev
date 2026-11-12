import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectIsHydrated } from '@/core/lib/hydration';
import { dueQuestions, nextReviewTime } from '@/core/lib/review-queue';
import { ProgressStore } from '@/core/services/progress.store';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import { PageHeader } from '@/shared/components/page-header/page-header';
import { CATALOG } from '@/shared/generated/catalog';
import { REVIEW_SESSION_SIZE } from '../../constants/session.constants';
import { leitnerBoxes } from '../../lib/leitner-boxes';
import { relativeDay } from '../../lib/relative-day';
import { LeitnerBoxes } from '../leitner-boxes/leitner-boxes';

/** Spaced review page: what is due today, by tech, and how the review boxes work. */
@Component({
  selector: 'app-review-overview',
  imports: [RouterLink, EmptyState, PageHeader, LeitnerBoxes],
  templateUrl: './review-overview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewOverview {
  private readonly progress = inject(ProgressStore);
  protected readonly isHydrated = injectIsHydrated();
  private readonly now = signal(0);

  private readonly due = computed(() =>
    this.isHydrated() ? dueQuestions(this.progress.questions(), this.now()) : [],
  );
  protected readonly dueCount = computed(() => this.due().length);
  protected readonly sessionSize = computed(() => Math.min(this.dueCount(), REVIEW_SESSION_SIZE));
  protected readonly answeredCount = computed(() => Object.keys(this.progress.questions()).length);
  protected readonly dueByTech = computed(() =>
    CATALOG.techs
      .map((tech) => ({
        tech,
        count: this.due().filter((entry) => entry.tech === tech.slug).length,
      }))
      .filter((row) => row.count > 0),
  );
  protected readonly nextReview = computed(() => {
    const time = nextReviewTime(this.progress.questions(), this.now());
    return time === null ? null : relativeDay(time, this.now());
  });
  protected readonly boxes = computed(() =>
    leitnerBoxes(this.isHydrated() ? this.progress.questions() : null),
  );

  constructor() {
    afterNextRender(() => this.now.set(Date.now()));
  }
}
