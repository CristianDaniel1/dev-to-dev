import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRACTICE_MODES } from '../../data/practice-modes.data';

/** Links to the modes that are not tied to one tech: review, random and progress. */
@Component({
  selector: 'app-practice-modes',
  imports: [RouterLink],
  templateUrl: './practice-modes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PracticeModes {
  protected readonly modes = PRACTICE_MODES;
}
