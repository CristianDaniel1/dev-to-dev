import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechBadge } from '@/shared/components/tech-badge/tech-badge';
import { LEVELS } from '@/shared/constants/content.constants';
import { LEVEL_LABELS } from '@/shared/data/content-labels.data';
import { CATALOG } from '@/shared/generated/catalog';
import { RESOURCE_INDEX } from '@/shared/generated/resource-index';
import { HOME_CATEGORY_COUNT, UPCOMING_TECHS } from '../../data/home-content.data';

/** The two pillars: available quizzes as an answer grid, and the support material index. */
@Component({
  selector: 'app-home-pillars',
  imports: [RouterLink, TechBadge],
  templateUrl: './home-pillars.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePillars {
  protected readonly techs = CATALOG.techs;
  protected readonly levels = LEVELS;
  protected readonly levelLabels = LEVEL_LABELS;
  protected readonly upcoming = UPCOMING_TECHS.join(', ');
  protected readonly categories = RESOURCE_INDEX.categories.slice(0, HOME_CATEGORY_COUNT);
  protected readonly resourceCount = RESOURCE_INDEX.categories.reduce(
    (sum, category) => sum + category.resourceCount,
    0,
  );
}
