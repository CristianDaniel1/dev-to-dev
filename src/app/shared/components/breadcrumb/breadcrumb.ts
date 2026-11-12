import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { BreadcrumbLink } from '../../interfaces/breadcrumb.interface';

/** Breadcrumb trail: links to the parent pages, then the current page. */
@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumb {
  readonly parents = input.required<readonly BreadcrumbLink[]>();
  readonly current = input.required<string>();
}
