import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Standard heading and intro for inner pages. */
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block pt-12 pb-10 sm:pt-16' },
})
export class PageHeader {
  readonly heading = input.required<string>();
  readonly intro = input<string>();
}
