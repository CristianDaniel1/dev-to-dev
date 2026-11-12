import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { IconName } from '../../interfaces/icon.interface';
import { Icon } from '../icon/icon';

/** Empty state with a heading, an explanation and a slot for an action. */
@Component({
  selector: 'app-empty-state',
  imports: [Icon],
  templateUrl: './empty-state.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyState {
  readonly heading = input.required<string>();
  readonly description = input.required<string>();
  readonly icon = input<IconName>('quiz');
}
