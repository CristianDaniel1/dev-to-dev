import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechResources } from '@/features/resources';
import { Breadcrumb } from '@/shared/components/breadcrumb/breadcrumb';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import { TechBadge } from '@/shared/components/tech-badge/tech-badge';
import { GLOSSARY_GROUPS } from '@/shared/generated/glossary-groups';
import { findTech } from '@/shared/lib/find-tech';
import { QUIZ_BREADCRUMB } from '../../data/quiz-breadcrumb.data';
import { SessionSetup } from '../session-setup/session-setup';
import { TopicList } from '../topic-list/topic-list';

/** Tech page: header, topics, the setup form for a practice session and resources to study. */
@Component({
  selector: 'app-tech-overview',
  imports: [RouterLink, Breadcrumb, EmptyState, TechBadge, SessionSetup, TopicList, TechResources],
  templateUrl: './tech-overview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechOverview {
  /** Route param, bound by `withComponentInputBinding`. */
  readonly tech = input.required<string>();

  protected readonly trail = QUIZ_BREADCRUMB;

  protected readonly summary = computed(() => findTech(this.tech()));
  protected readonly glossaryGroup = computed(() =>
    GLOSSARY_GROUPS.find((group) => group.slug === this.tech()),
  );
}
