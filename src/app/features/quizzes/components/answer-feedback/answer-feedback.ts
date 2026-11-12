import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { AnswerRecord } from '../../interfaces/scoring.interface';
import type { SessionItem } from '../../interfaces/session.interface';
import { feedbackGroups } from '../../lib/answer-options';

/** Explanation shown after answering: why the picks were wrong and why the right ones are right. */
@Component({
  selector: 'app-answer-feedback',
  templateUrl: './answer-feedback.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerFeedback {
  readonly item = input.required<SessionItem>();
  readonly answer = input.required<AnswerRecord>();

  protected readonly groups = computed(() => feedbackGroups(this.item(), this.answer()));
  protected readonly isLuckyGuess = computed(
    () => this.answer().correct && this.answer().confidence === 'guess',
  );
}
