import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import { TechBadge } from '@/shared/components/tech-badge/tech-badge';
import { findTech } from '@/shared/lib/find-tech';
import { SessionSetup } from '../session-setup/session-setup';
import { TopicList } from '../topic-list/topic-list';

/** Tech page: header, topics and the setup form for a practice session. */
@Component({
  selector: 'app-tech-overview',
  imports: [RouterLink, EmptyState, TechBadge, SessionSetup, TopicList],
  templateUrl: './tech-overview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechOverview {
  /** Route param, bound by `withComponentInputBinding`. */
  readonly tech = input.required<string>();

  protected readonly summary = computed(() => findTech(this.tech()));
}
