import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechBadge } from '@/shared/components/tech-badge/tech-badge';
import type { TechSummary } from '@/shared/interfaces/content.interface';
import { TechProgress } from '../tech-progress/tech-progress';

/** Catalog card linking to a tech page, with the user's progress once hydrated. */
@Component({
  selector: 'app-tech-card',
  imports: [RouterLink, TechBadge, TechProgress],
  templateUrl: './tech-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
})
export class TechCard {
  readonly tech = input.required<TechSummary>();
}
