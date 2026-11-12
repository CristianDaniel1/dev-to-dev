import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeader } from '@/shared/components/page-header/page-header';

/** About page: what the project is and how its content is made. */
@Component({
  selector: 'app-about',
  imports: [RouterLink, PageHeader],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
