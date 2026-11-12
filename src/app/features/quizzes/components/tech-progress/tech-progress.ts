import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ProgressStore } from '@/core/services/progress.store';
import type { TechSummary } from '@/shared/interfaces/content.interface';
import { ProgressMeter } from '../progress-meter/progress-meter';

/**
 * The user's progress on a tech or on one of its topics. Use it inside `@defer`: progress
 * lives in localStorage and must not render during prerendering.
 */
@Component({
  selector: 'app-tech-progress',
  imports: [ProgressMeter],
  templateUrl: './tech-progress.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class TechProgress {
  readonly tech = input.required<TechSummary>();
  readonly topic = input<string>();
  readonly showCaption = input(true);

  private readonly progress = inject(ProgressStore);

  protected readonly stats = computed(() => this.progress.statsFor(this.tech().slug, this.topic()));
  protected readonly total = computed(() => {
    const topicSlug = this.topic();
    if (!topicSlug) return this.tech().questionCount;
    return this.tech().topics.find((topic) => topic.slug === topicSlug)?.questionCount ?? 0;
  });
}
