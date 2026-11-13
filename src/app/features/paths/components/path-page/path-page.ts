import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectIsHydrated } from '@/core/lib/hydration';
import { Breadcrumb } from '@/shared/components/breadcrumb/breadcrumb';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import { LEVEL_LABELS } from '@/shared/data/content-labels.data';
import { PATHS_BREADCRUMB } from '../../data/paths-breadcrumb.data';
import { findPath } from '../../lib/find-path';
import { PathProgressStore } from '../../services/path-progress.store';
import { PathStep } from '../path-step/path-step';

/** Page of one learning path: its steps in order and how many are done. */
@Component({
  selector: 'app-path-page',
  imports: [RouterLink, Breadcrumb, EmptyState, PathStep],
  templateUrl: './path-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PathPage {
  /** Route param, bound by `withComponentInputBinding`. */
  readonly trilha = input.required<string>();

  private readonly checklist = inject(PathProgressStore);
  private readonly isHydrated = injectIsHydrated();

  protected readonly trail = PATHS_BREADCRUMB;
  protected readonly levelLabels = LEVEL_LABELS;

  protected readonly path = computed(() => findPath(this.trilha()));
  protected readonly doneCount = computed(() => {
    const path = this.path();
    if (!path || !this.isHydrated()) return 0;
    return this.checklist.doneCount(
      path.slug,
      path.steps.map((step) => step.id),
    );
  });
}
