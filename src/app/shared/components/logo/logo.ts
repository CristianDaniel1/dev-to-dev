import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Dev to Dev mark: two chevrons facing each other over a highlighter stroke, plus the name. */
@Component({
  selector: 'app-logo',
  templateUrl: './logo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex items-center gap-2.5' },
})
export class Logo {}
