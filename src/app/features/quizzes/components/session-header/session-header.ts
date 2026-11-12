import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechBadge } from '@/shared/components/tech-badge/tech-badge';
import type { TechSummary } from '@/shared/interfaces/content.interface';
import { toPercent } from '../../lib/progress-label';

/** Session top bar: tech, exit link and, while answering, the question counter and progress bar. */
@Component({
  selector: 'app-session-header',
  imports: [RouterLink, TechBadge],
  templateUrl: './session-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SessionHeader {
  readonly tech = input.required<TechSummary>();
  readonly showProgress = input(false);
  readonly position = input(0);
  readonly total = input(0);
  readonly answered = input(0);

  protected readonly progressPercent = computed(() => toPercent(this.answered(), this.total()));
}
