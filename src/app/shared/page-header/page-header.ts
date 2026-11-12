import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Standard heading and intro for inner pages. */
@Component({
  selector: 'app-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block pt-12 pb-10 sm:pt-16' },
  template: `
    <h1 class="text-3xl font-extrabold [font-stretch:78%] sm:text-[3.25rem] sm:leading-none">
      {{ heading() }}
    </h1>
    @if (intro()) {
      <p class="prose-width mt-4 text-lg text-ink-muted">{{ intro() }}</p>
    }
  `,
})
export class PageHeader {
  readonly heading = input.required<string>();
  readonly intro = input<string>();
}
