import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEVELS } from '@/shared/constants/content.constants';
import { LEVEL_LABELS } from '@/shared/data/content-labels.data';
import type { Level, TechSummary } from '@/shared/interfaces/content.interface';
import { DEFAULT_SESSION_SIZE } from '../../constants/session.constants';
import { SESSION_SIZES } from '../../data/session-choices.data';
import { countAvailable } from '../../lib/available-count';
import { toSessionQuery } from '../../lib/session-params';

/** Form that sets up a practice session and links to it with the chosen filters. */
@Component({
  selector: 'app-session-setup',
  imports: [RouterLink],
  templateUrl: './session-setup.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionSetup {
  readonly tech = input.required<TechSummary>();

  protected readonly levels = LEVELS;
  protected readonly levelLabels = LEVEL_LABELS;
  protected readonly sizes = SESSION_SIZES;

  protected readonly topics = signal<readonly string[]>([]);
  protected readonly level = signal<Level | null>(null);
  protected readonly size = signal<number | null>(DEFAULT_SESSION_SIZE);
  protected readonly onlyUnanswered = signal(false);

  protected readonly availableCount = computed(() =>
    countAvailable(this.tech(), this.topics(), this.level()),
  );
  protected readonly sessionCount = computed(() => {
    const size = this.size();
    return size === null ? this.availableCount() : Math.min(size, this.availableCount());
  });
  protected readonly queryParams = computed(() =>
    toSessionQuery({
      topics: this.topics(),
      level: this.level(),
      size: this.size(),
      onlyUnanswered: this.onlyUnanswered(),
    }),
  );

  protected isTopicSelected(slug: string): boolean {
    return this.topics().includes(slug);
  }

  protected toggleTopic(slug: string): void {
    this.topics.update((topics) =>
      topics.includes(slug) ? topics.filter((topic) => topic !== slug) : [...topics, slug],
    );
  }
}
