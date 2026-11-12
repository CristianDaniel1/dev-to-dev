import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Icon } from '@/shared/icon/icon';
import { DEMO_QUESTION, type DemoOption } from './demo-question.data';

type OptionState = 'idle' | 'correct' | 'wrong' | 'dimmed';

/** Option button classes for each state. */
const OPTION_CLASSES: Record<OptionState, string> = {
  idle: 'bg-surface border-line-strong hover:border-pen cursor-pointer',
  correct: 'bg-correct-soft border-correct',
  wrong: 'bg-wrong-soft border-wrong',
  dimmed: 'bg-surface border-line opacity-60',
};

/** Option text classes: highlighter on the correct answer, red-pen strike on the wrong one. */
const OPTION_TEXT_CLASSES: Record<OptionState, string> = {
  idle: '',
  correct: 'highlight highlight-draw text-highlight-ink',
  wrong: 'line-through decoration-wrong decoration-2',
  dimmed: '',
};

/** Interactive question card on the home page: practice mode in miniature. */
@Component({
  selector: 'app-demo-question',
  imports: [Icon],
  templateUrl: './demo-question.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoQuestionCard {
  protected readonly question = DEMO_QUESTION;
  protected readonly optionClasses = OPTION_CLASSES;
  protected readonly optionTextClasses = OPTION_TEXT_CLASSES;
  protected readonly selectedId = signal<string | null>(null);
  protected readonly answered = computed(() => this.selectedId() !== null);
  protected readonly isCorrect = computed(() => this.selectedId() === this.question.correctId);

  protected readonly selectedOption = computed(() =>
    this.question.options.find((option) => option.id === this.selectedId()),
  );
  protected readonly correctOption = computed(() =>
    this.question.options.find((option) => option.id === this.question.correctId),
  );

  protected stateOf(option: DemoOption): OptionState {
    const selectedId = this.selectedId();
    if (selectedId === null) return 'idle';
    if (option.id === this.question.correctId) return 'correct';
    if (option.id === selectedId) return 'wrong';
    return 'dimmed';
  }

  protected select(option: DemoOption): void {
    if (this.answered()) return;
    this.selectedId.set(option.id);
  }

  protected reset(): void {
    this.selectedId.set(null);
  }
}
