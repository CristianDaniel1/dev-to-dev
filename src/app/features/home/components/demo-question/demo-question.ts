import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  OPTION_BUBBLE_CLASSES,
  OPTION_STATE_CLASSES,
  OPTION_TEXT_CLASSES,
  type OptionState,
} from '@/features/quizzes';
import { Icon } from '@/shared/components/icon/icon';
import { DEMO_QUESTION } from '../../data/demo-question.data';
import type { DemoOption } from '../../interfaces/demo-question.interface';
import { demoOptionState } from '../../lib/demo-option-state';

/** Interactive sample question on the home page: practice mode in miniature. */
@Component({
  selector: 'app-demo-question',
  imports: [Icon],
  templateUrl: './demo-question.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoQuestionCard {
  protected readonly question = DEMO_QUESTION;
  protected readonly optionClasses = OPTION_STATE_CLASSES;
  protected readonly bubbleClasses = OPTION_BUBBLE_CLASSES;
  protected readonly optionTextClasses = OPTION_TEXT_CLASSES;
  protected readonly selectedId = signal<string | null>(null);

  protected readonly isAnswered = computed(() => this.selectedId() !== null);
  protected readonly isCorrect = computed(() => this.selectedId() === this.question.correctId);
  protected readonly selectedOption = computed(() =>
    this.question.options.find((option) => option.id === this.selectedId()),
  );
  protected readonly correctOption = computed(() =>
    this.question.options.find((option) => option.id === this.question.correctId),
  );

  protected stateOf(option: DemoOption): OptionState {
    return demoOptionState(option.id, this.question.correctId, this.selectedId());
  }

  protected select(option: DemoOption): void {
    if (this.isAnswered()) return;
    this.selectedId.set(option.id);
  }

  protected reset(): void {
    this.selectedId.set(null);
  }
}
