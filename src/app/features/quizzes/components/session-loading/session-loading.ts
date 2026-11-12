import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Skeleton shown while the question bank loads (also the prerendered state of the session). */
@Component({
  selector: 'app-session-loading',
  templateUrl: './session-loading.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionLoading {
  protected readonly placeholders = [1, 2, 3, 4];
}
