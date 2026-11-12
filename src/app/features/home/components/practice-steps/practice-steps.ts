import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PRACTICE_STEPS } from '../../data/home-content.data';

/** Numbered explanation of how practice mode works. */
@Component({
  selector: 'app-practice-steps',
  templateUrl: './practice-steps.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PracticeSteps {
  protected readonly steps = PRACTICE_STEPS;
}
