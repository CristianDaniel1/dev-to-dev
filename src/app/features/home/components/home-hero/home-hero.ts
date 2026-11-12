import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoQuestionCard } from '../demo-question/demo-question';

/** Home opening: headline, calls to action and the sample question. */
@Component({
  selector: 'app-home-hero',
  imports: [RouterLink, DemoQuestionCard],
  templateUrl: './home-hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHero {}
