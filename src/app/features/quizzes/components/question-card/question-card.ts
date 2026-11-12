import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  afterRenderEffect,
  computed,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Icon } from '@/shared/components/icon/icon';
import { LEVEL_LABELS } from '@/shared/data/content-labels.data';
import type { QuestionOption } from '@/shared/interfaces/content.interface';
import { OPTION_LETTERS } from '../../constants/session.constants';
import {
  OPTION_STATE_CLASSES,
  OPTION_STATE_LABELS,
  OPTION_TEXT_CLASSES,
} from '../../data/option-state.data';
import type { OptionState } from '../../interfaces/option-state.interface';
import type { AnswerRecord } from '../../interfaces/scoring.interface';
import type { SessionItem } from '../../interfaces/session.interface';
import { optionStateFor } from '../../lib/option-state';

/** One question with its options; moves focus to the prompt whenever the question changes. */
@Component({
  selector: 'app-question-card',
  imports: [Icon],
  templateUrl: './question-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionCard {
  readonly item = input.required<SessionItem>();
  readonly selection = input.required<readonly string[]>();
  readonly answer = input<AnswerRecord | null>(null);
  readonly toggled = output<string>();

  protected readonly optionClasses = OPTION_STATE_CLASSES;
  protected readonly optionTextClasses = OPTION_TEXT_CLASSES;
  protected readonly optionLabels = OPTION_STATE_LABELS;
  protected readonly levelLabels = LEVEL_LABELS;
  protected readonly letters = OPTION_LETTERS;
  protected readonly isMultiple = computed(() => this.item().question.kind === 'multiple');

  private readonly prompt = viewChild.required<ElementRef<HTMLElement>>('prompt');

  constructor() {
    afterRenderEffect(() => {
      this.item();
      this.prompt().nativeElement.focus();
    });
  }

  protected stateOf(option: QuestionOption): OptionState {
    return optionStateFor(this.item().question, option, this.selection(), this.answer());
  }
}
