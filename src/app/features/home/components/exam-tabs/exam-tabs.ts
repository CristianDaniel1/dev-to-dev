import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATALOG } from '@/shared/generated/catalog';

/** Folder tabs on top of the hero pile: one per tech, each leading to its quiz. */
@Component({
  selector: 'app-exam-tabs',
  imports: [RouterLink],
  templateUrl: './exam-tabs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ExamTabs {
  /** Tech whose tab is pulled to the front, as the exam on top of the pile. */
  readonly front = input.required<string>();

  protected readonly techs = CATALOG.techs;
}
