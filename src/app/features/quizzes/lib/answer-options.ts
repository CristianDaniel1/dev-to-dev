import type { QuestionOption } from '@/shared/interfaces/content.interface';
import type { FeedbackGroups } from '../interfaces/feedback.interface';
import type { AnswerRecord } from '../interfaces/scoring.interface';
import type { SessionItem } from '../interfaces/session.interface';

/**
 * Lists the correct options of a question, in display order.
 *
 * @param item - Session item.
 * @returns The correct options.
 */
export const correctOptions = (item: SessionItem): QuestionOption[] =>
  item.options.filter((option) => item.question.correct.includes(option.id));

/**
 * Lists the options the user picked, in display order.
 *
 * @param item - Session item.
 * @param answer - Submitted answer, if any.
 * @returns The picked options.
 */
export const pickedOptions = (
  item: SessionItem,
  answer: AnswerRecord | undefined,
): QuestionOption[] => item.options.filter((option) => answer?.selected.includes(option.id));

/**
 * Splits the options of an answered question into wrong picks, correct options and the rest.
 *
 * @param item - Session item.
 * @param answer - Submitted answer.
 * @returns The three groups, each in display order.
 */
export const feedbackGroups = (item: SessionItem, answer: AnswerRecord): FeedbackGroups => {
  const correct = correctOptions(item);
  const wrongPicks = pickedOptions(item, answer).filter((option) => !correct.includes(option));
  const others = item.options.filter(
    (option) => !correct.includes(option) && !wrongPicks.includes(option),
  );
  return { wrongPicks, correct, others };
};
