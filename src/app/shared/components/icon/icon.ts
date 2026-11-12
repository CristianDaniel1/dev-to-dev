import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { IconName } from '../../interfaces/icon.interface';

/** Inline SVG icon (24px grid, inherits `currentColor`). Decorative: the control carries the name. */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-flex shrink-0',
    'aria-hidden': 'true',
  },
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(20);
}
