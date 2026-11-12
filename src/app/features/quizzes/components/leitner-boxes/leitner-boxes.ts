import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { LeitnerBoxView } from '../../interfaces/leitner-box.interface';

/** The five review boxes side by side, with their interval and optional question counts. */
@Component({
  selector: 'app-leitner-boxes',
  templateUrl: './leitner-boxes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeitnerBoxes {
  readonly boxes = input.required<readonly LeitnerBoxView[]>();
}
