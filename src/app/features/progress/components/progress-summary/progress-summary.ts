import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { ProgressOverview } from '../../interfaces/progress-overview.interface';

/** Headline numbers: answered, mastered, due today and finished sessions. */
@Component({
  selector: 'app-progress-summary',
  imports: [RouterLink],
  templateUrl: './progress-summary.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSummary {
  readonly overview = input.required<ProgressOverview>();
}
