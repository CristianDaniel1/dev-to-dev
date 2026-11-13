import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Dev to Dev mark: the code sign `< >` around a filled answer bubble, plus the name. */
@Component({
  selector: 'app-logo',
  templateUrl: './logo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex items-center gap-2.5' },
})
export class Logo {}
