import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TECH_BADGE_SIZE_CLASSES } from '../../data/tech-badge-sizes.data';
import type { TechSummary } from '../../interfaces/content.interface';
import type { TechBadgeSize } from '../../interfaces/tech-badge.interface';

/** Label-like tag with the tech monogram in its brand color. Decorative: the tech name is always shown next to it. */
@Component({
  selector: 'app-tech-badge',
  templateUrl: './tech-badge.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', class: 'inline-flex shrink-0' },
})
export class TechBadge {
  readonly tech = input.required<Pick<TechSummary, 'badge' | 'color' | 'onColor'>>();
  readonly size = input<TechBadgeSize>('md');

  protected readonly sizeClasses = computed(() => TECH_BADGE_SIZE_CLASSES[this.size()]);
}
