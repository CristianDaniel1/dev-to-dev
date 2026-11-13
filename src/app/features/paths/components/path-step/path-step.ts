import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectIsHydrated } from '@/core/lib/hydration';
import { ProgressStore } from '@/core/services/progress.store';
import { Icon } from '@/shared/components/icon/icon';
import type { PathStep as Step } from '@/shared/interfaces/path.interface';
import { PathProgressStore } from '../../services/path-progress.store';

/** One step of a learning path: what to practice, read and study, with a done toggle. */
@Component({
  selector: 'app-path-step',
  imports: [RouterLink, Icon],
  templateUrl: './path-step.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PathStep {
  readonly path = input.required<string>();
  readonly step = input.required<Step>();
  readonly position = input.required<number>();

  private readonly checklist = inject(PathProgressStore);
  private readonly progress = inject(ProgressStore);

  protected readonly isHydrated = injectIsHydrated();
  protected readonly isDone = computed(
    () => this.isHydrated() && this.checklist.isDone(this.path(), this.step().id),
  );
  protected readonly answered = computed(() => {
    const { techSlug, topicSlug } = this.step().practice;
    return this.progress.statsFor(techSlug, topicSlug).answered;
  });

  /** Marks the step as done, or as not done. */
  protected toggle(): void {
    this.checklist.toggle(this.path(), this.step().id);
  }
}
