import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '@/shared/components/icon/icon';
import { TechBadge } from '@/shared/components/tech-badge/tech-badge';
import type { SessionScope } from '../../interfaces/session-scope.interface';
import { toPercent } from '../../lib/progress-label';

/**
 * Session top bar: what the session covers, an exit link, a slot for the exam timer and, while
 * answering, the question counter and progress bar.
 */
@Component({
  selector: 'app-session-header',
  imports: [RouterLink, Icon, TechBadge],
  templateUrl: './session-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SessionHeader {
  readonly scope = input.required<SessionScope>();
  readonly showProgress = input(false);
  readonly position = input(0);
  readonly total = input(0);
  readonly answered = input(0);

  protected readonly progressPercent = computed(() => toPercent(this.answered(), this.total()));
}
