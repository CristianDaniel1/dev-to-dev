import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Dev to Dev mark: two chevrons facing each other over a highlighter stroke. */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex items-center gap-2.5' },
  template: `
    <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" class="fill-ink" />
      <path d="M4 19.5 28 17v7.5L4 26z" class="fill-highlight" />
      <path
        d="M6 10 12 16 6 22M26 10 20 16 26 22"
        fill="none"
        class="stroke-paper"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span class="text-lg leading-none font-bold tracking-tight [font-stretch:85%]">Dev to Dev</span>
  `,
})
export class Logo {}
