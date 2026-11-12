import type { Question, QuestionOption } from '@/shared/interfaces/content.interface';
import type { OptionState } from '../interfaces/option-state.interface';
import type { AnswerRecord } from '../interfaces/scoring.interface';

/**
 * Works out how an option should look, before and after the answer is revealed.
 *
 * @param question - Question the option belongs to.
 * @param option - Option to style.
 * @param selection - Option ids currently selected.
 * @param answer - Submitted answer, or `null` while answering.
 * @returns The visual state of the option.
 */
export const optionStateFor = (
  question: Question,
  option: QuestionOption,
  selection: readonly string[],
  answer: AnswerRecord | null,
): OptionState => {
  if (!answer) return selection.includes(option.id) ? 'selected' : 'idle';
  const isCorrect = question.correct.includes(option.id);
  const wasSelected = answer.selected.includes(option.id);
  if (isCorrect) return wasSelected ? 'correct' : 'missed';
  return wasSelected ? 'wrong' : 'dimmed';
};
