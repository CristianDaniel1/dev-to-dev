import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { HistoryEntry } from '../../interfaces/progress-overview.interface';
import { formatSessionDate, toIsoDate } from '../../lib/date-format';

/** The most recent sessions with their scores. */
@Component({
  selector: 'app-session-history',
  templateUrl: './session-history.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionHistory {
  readonly entries = input.required<readonly HistoryEntry[]>();

  protected readonly formatDate = formatSessionDate;
  protected readonly isoDate = toIsoDate;
}
