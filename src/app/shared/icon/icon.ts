import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'
  | 'github'
  | 'external'
  | 'check'
  | 'cross'
  | 'quiz'
  | 'bookmark';

/** Inline SVG icons (24px stroke, inherit `currentColor`). Decorative: the accessible name comes from the control. */
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
