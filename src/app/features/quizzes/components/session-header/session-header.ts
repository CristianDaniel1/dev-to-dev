import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '@/shared/components/icon/icon';
import { TechBadge } from '@/shared/components/tech-badge/tech-badge';
import { SESSION_MARK_CLASSES } from '../../data/session-mark.data';
import type { SessionScope } from '../../interfaces/session-scope.interface';
import type { SessionMark } from '../../interfaces/session.interface';

/**
 * Session top bar: what the session covers, a slot for the exam timer, an exit link and, while
 * answering, the question counter and the answer map (one bubble per question).
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
  readonly marks = input<readonly SessionMark[]>([]);

  protected readonly markClasses = SESSION_MARK_CLASSES;
  protected readonly isCompact = computed(() => this.total() > 20);
}
