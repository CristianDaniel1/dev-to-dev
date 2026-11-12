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
import { dueQuestions } from '@/core/lib/review-queue';
import { ProgressStore } from '@/core/services/progress.store';
import { CATALOG } from '@/shared/generated/catalog';
import { resumeTarget } from '../../lib/resume-target';

/**
 * "Pick up where you left off" for returning visitors: reviews due today and the last session.
 * Renders nothing on the server and for first-time visitors.
 */
@Component({
  selector: 'app-home-resume',
  imports: [RouterLink],
  templateUrl: './home-resume.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeResume {
  private readonly progress = inject(ProgressStore);
  protected readonly isHydrated = injectIsHydrated();
  private readonly now = signal(0);

  protected readonly dueCount = computed(() =>
    this.now() ? dueQuestions(this.progress.questions(), this.now()).length : 0,
  );
  protected readonly last = computed(() =>
    resumeTarget(this.progress.sessions()[0], CATALOG.techs),
  );
  protected readonly isVisible = computed(
    () => this.isHydrated() && (this.dueCount() > 0 || this.last() !== null),
  );

  constructor() {
    afterNextRender(() => this.now.set(Date.now()));
  }
}
