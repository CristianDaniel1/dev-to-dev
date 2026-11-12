import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { formatCountdown, timerWarning } from '../../lib/countdown';

/** Exam countdown. Announces the last minutes to screen readers and reports when time is up. */
@Component({
  selector: 'app-session-timer',
  templateUrl: './session-timer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionTimer {
  /** When time runs out, in milliseconds. */
  readonly deadline = input.required<number>();
  readonly expired = output();

  private readonly now = signal(Date.now());
  protected readonly remaining = computed(() => Math.max(0, this.deadline() - this.now()));
  protected readonly label = computed(() => formatCountdown(this.remaining()));
  protected readonly warning = computed(() => timerWarning(this.remaining()));
  protected readonly isEnding = computed(() => this.remaining() <= 60_000);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const id = setInterval(() => this.now.set(Date.now()), 1000);
      destroyRef.onDestroy(() => clearInterval(id));
    });
    let hasExpired = false;
    effect(() => {
      if (this.remaining() > 0 || hasExpired) return;
      hasExpired = true;
      this.expired.emit();
    });
  }
}
