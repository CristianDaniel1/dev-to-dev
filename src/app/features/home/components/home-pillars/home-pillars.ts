import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RESOURCE_INDEX } from '@/shared/generated/resource-index';
import { HOME_CATEGORY_COUNT, LAUNCH_TECHS } from '../../data/home-content.data';

/** The two pillars of the platform: quizzes and the resource hub. */
@Component({
  selector: 'app-home-pillars',
  imports: [RouterLink],
  templateUrl: './home-pillars.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePillars {
  protected readonly techs = LAUNCH_TECHS;
  protected readonly categories = RESOURCE_INDEX.categories.slice(0, HOME_CATEGORY_COUNT);
  protected readonly resourceCount = RESOURCE_INDEX.categories.reduce(
    (sum, category) => sum + category.resourceCount,
    0,
  );
}
