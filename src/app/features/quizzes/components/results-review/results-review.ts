import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '@/shared/components/icon/icon';
import type { QuestionOption } from '@/shared/interfaces/content.interface';
import type { ReviewItem } from '../../interfaces/session.interface';
import { correctOptions, pickedOptions } from '../../lib/answer-options';
import { needsReview } from '../../lib/scoring';

/** Every question of the session with the user's answer, the right one and the explanation. */
@Component({
  selector: 'app-results-review',
  imports: [Icon],
  templateUrl: './results-review.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsReview {
  readonly items = input.required<readonly ReviewItem[]>();

  protected isMissed(item: ReviewItem): boolean {
    return !item.answer || needsReview(item.answer);
  }

  protected isLuckyGuess(item: ReviewItem): boolean {
    return !!item.answer?.correct && item.answer.confidence === 'guess';
  }

  protected picked(item: ReviewItem): QuestionOption[] {
    return pickedOptions(item, item.answer);
  }

  protected correct(item: ReviewItem): QuestionOption[] {
    return correctOptions(item);
  }
}
