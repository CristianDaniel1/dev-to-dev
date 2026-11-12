import type { OptionState } from '../interfaces/option-state.interface';

/** Option button classes for each state. */
export const OPTION_STATE_CLASSES: Record<OptionState, string> = {
  idle: 'bg-surface border-line-strong hover:border-pen cursor-pointer',
  selected: 'bg-surface border-pen ring-2 ring-pen/25 cursor-pointer',
  correct: 'bg-correct-soft border-correct',
  missed: 'bg-surface border-correct border-dashed',
  wrong: 'bg-wrong-soft border-wrong',
  dimmed: 'bg-surface border-line opacity-60',
};

/** Option text classes: highlighter on correct answers, red-pen strike on wrong picks. */
export const OPTION_TEXT_CLASSES: Record<OptionState, string> = {
  idle: '',
  selected: '',
  correct: 'highlight highlight-draw text-highlight-ink',
  missed: 'highlight text-highlight-ink',
  wrong: 'line-through decoration-wrong decoration-2',
  dimmed: '',
};

/** Screen-reader suffix announcing each revealed state. */
export const OPTION_STATE_LABELS: Record<OptionState, string> = {
  idle: '',
  selected: '',
  correct: '(correta, você marcou)',
  missed: '(correta, você não marcou)',
  wrong: '(incorreta, você marcou)',
  dimmed: '',
};
