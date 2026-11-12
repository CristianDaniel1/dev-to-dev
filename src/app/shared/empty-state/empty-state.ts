import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon, type IconName } from '@/shared/icon/icon';

/** Empty state with a heading, explanation and a slot for an action (`<ng-content>`). */
@Component({
  selector: 'app-empty-state',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex flex-col items-start gap-4 rounded-card border border-dashed border-line-strong bg-surface/60 p-6 sm:p-10"
    >
      <span
        class="inline-flex size-11 items-center justify-center rounded-control bg-highlight text-highlight-ink"
      >
        <app-icon [name]="icon()" [size]="22" />
      </span>
      <div class="prose-width">
        <h2 class="text-xl font-bold">{{ heading() }}</h2>
        <p class="mt-2 text-ink-muted">{{ description() }}</p>
      </div>
      <ng-content />
    </div>
  `,
})
export class EmptyState {
  readonly heading = input.required<string>();
  readonly description = input.required<string>();
  readonly icon = input<IconName>('quiz');
}
