import type { OptionState } from '../interfaces/option-state.interface';

/** Option row classes for each state. */
export const OPTION_STATE_CLASSES: Record<OptionState, string> = {
  idle: 'cursor-pointer hover:bg-sheet-sunken',
  selected: 'cursor-pointer bg-sheet-sunken',
  correct: 'bg-correct-soft',
  missed: 'bg-correct-soft',
  wrong: 'bg-wrong-soft',
  dimmed: 'opacity-55',
};

/** Answer bubble classes: the pencil mark, or the grading pen once revealed. */
export const OPTION_BUBBLE_CLASSES: Record<OptionState, string> = {
  idle: 'group-hover:border-ink group-hover:bg-form-soft',
  selected: 'bubble-filled',
  correct: 'bubble-correct',
  missed: 'border-correct border-dashed text-correct',
  wrong: 'bubble-wrong',
  dimmed: '',
};

/** Option text classes: emphasis on the right answer, red-pen strike on wrong picks. */
export const OPTION_TEXT_CLASSES: Record<OptionState, string> = {
  idle: '',
  selected: 'font-semibold',
  correct: 'font-semibold',
  missed: 'font-semibold',
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
