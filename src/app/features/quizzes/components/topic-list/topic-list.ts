import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { TechSummary } from '@/shared/interfaces/content.interface';
import { TechProgress } from '../tech-progress/tech-progress';

/** Topics of a tech with their question counts and the user's progress on each. */
@Component({
  selector: 'app-topic-list',
  imports: [TechProgress],
  templateUrl: './topic-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicList {
  readonly tech = input.required<TechSummary>();
}
