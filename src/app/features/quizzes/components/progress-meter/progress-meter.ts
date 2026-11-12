import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { progressLabel, toPercent } from '../../lib/progress-label';

/** Thin two-layer bar: answered questions (light) and mastered questions (solid). */
@Component({
  selector: 'app-progress-meter',
  templateUrl: './progress-meter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ProgressMeter {
  readonly answered = input.required<number>();
  readonly mastered = input.required<number>();
  readonly total = input.required<number>();
  readonly color = input('var(--color-pen)');
  readonly showCaption = input(true);

  protected readonly answeredPercent = computed(() => toPercent(this.answered(), this.total()));
  protected readonly masteredPercent = computed(() => toPercent(this.mastered(), this.total()));
  protected readonly label = computed(() =>
    progressLabel(this.answered(), this.mastered(), this.total()),
  );
}
