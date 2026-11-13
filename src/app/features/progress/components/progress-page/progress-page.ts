import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectHydrationTime, injectIsHydrated } from '@/core/lib/hydration';
import { ProgressStore } from '@/core/services/progress.store';
import { LeitnerBoxes, TechProgress, leitnerBoxes } from '@/features/quizzes';
import { PageHeader } from '@/shared/components/page-header/page-header';
import { CATALOG } from '@/shared/generated/catalog';
import { HISTORY_LIMIT } from '../../constants/progress-page.constants';
import { historyEntries } from '../../lib/history-entries';
import { progressOverview } from '../../lib/progress-overview';
import { ProgressBackup } from '../progress-backup/progress-backup';
import { ProgressSummary } from '../progress-summary/progress-summary';
import { SessionHistory } from '../session-history/session-history';

/**
 * The user's progress: headline numbers, progress by tech, review boxes, recent sessions and
 * backup. Everything comes from localStorage, so it renders only after hydration.
 */
@Component({
  selector: 'app-progress-page',
  imports: [
    RouterLink,
    PageHeader,
    LeitnerBoxes,
    TechProgress,
    ProgressBackup,
    ProgressSummary,
    SessionHistory,
  ],
  templateUrl: './progress-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressPage {
  private readonly progress = inject(ProgressStore);
  protected readonly isHydrated = injectIsHydrated();
  private readonly now = injectHydrationTime();

  protected readonly techs = CATALOG.techs;
  protected readonly overview = computed(() =>
    progressOverview(this.progress.snapshot(), this.now()),
  );
  protected readonly boxes = computed(() => leitnerBoxes(this.progress.questions()));
  protected readonly history = computed(() =>
    historyEntries(this.progress.sessions(), this.techs, HISTORY_LIMIT),
  );
}
