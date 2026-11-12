import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LAUNCH_TECHS, RESOURCE_CATEGORIES } from '../../data/home-content.data';

/** The two pillars of the platform: quizzes and the resource hub. */
@Component({
  selector: 'app-home-pillars',
  imports: [RouterLink],
  templateUrl: './home-pillars.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePillars {
  protected readonly techs = LAUNCH_TECHS;
  protected readonly categories = RESOURCE_CATEGORIES;
}
