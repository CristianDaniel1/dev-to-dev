import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeHero } from '../home-hero/home-hero';
import { HomePillars } from '../home-pillars/home-pillars';
import { PracticeSteps } from '../practice-steps/practice-steps';

/** Home page. */
@Component({
  selector: 'app-home',
  imports: [HomeHero, HomePillars, PracticeSteps],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
