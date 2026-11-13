import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectIsHydrated } from '@/core/lib/hydration';
import { PageHeader } from '@/shared/components/page-header/page-header';
import { LEVEL_LABELS } from '@/shared/data/content-labels.data';
import { LEARNING_PATHS } from '@/shared/generated/paths';
import type { LearningPath } from '@/shared/interfaces/path.interface';
import { PathProgressStore } from '../../services/path-progress.store';

/** Index of the learning paths, with how far the user got in each. */
@Component({
  selector: 'app-paths-page',
  imports: [RouterLink, PageHeader],
  templateUrl: './paths-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PathsPage {
  private readonly checklist = inject(PathProgressStore);

  protected readonly isHydrated = injectIsHydrated();
  protected readonly paths = LEARNING_PATHS;
  protected readonly levelLabels = LEVEL_LABELS;

  /**
   * Counts the done steps of a path. Reactive inside the template.
   *
   * @param path - Learning path.
   * @returns How many steps are done.
   */
  protected doneCount(path: LearningPath): number {
    return this.checklist.doneCount(
      path.slug,
      path.steps.map((step) => step.id),
    );
  }
}
