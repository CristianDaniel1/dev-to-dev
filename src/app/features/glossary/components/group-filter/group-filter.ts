import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { GlossaryGroup } from '@/shared/interfaces/glossary.interface';

/** Links that filter the glossary by tech; the choice lives in the `grupo` query param. */
@Component({
  selector: 'app-group-filter',
  imports: [RouterLink],
  templateUrl: './group-filter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFilter {
  readonly groups = input.required<readonly GlossaryGroup[]>();
  readonly active = input<string>();
}
