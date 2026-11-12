import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeHero } from '../home-hero/home-hero';
import { HomePillars } from '../home-pillars/home-pillars';
import { HomeResume } from '../home-resume/home-resume';
import { PracticeSteps } from '../practice-steps/practice-steps';

/** Home page. */
@Component({
  selector: 'app-home',
  imports: [HomeHero, HomeResume, HomePillars, PracticeSteps],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
