import type { AnswerRecord } from '../interfaces/scoring.interface';
import type { SessionItem, SessionMark } from '../interfaces/session.interface';

/**
 * Builds the session map: one mark per question. Practice reveals right and wrong; an exam only
 * shows that a question was answered.
 *
 * @param items - Questions of the session, in order.
 * @param answers - Answers given so far.
 * @param index - Position of the current question.
 * @param hidesResults - True in an exam.
 * @returns One mark per question.
 */
export const sessionMarks = (
  items: readonly SessionItem[],
  answers: readonly AnswerRecord[],
  index: number,
  hidesResults: boolean,
): SessionMark[] => {
  const byId = new Map(answers.map((answer) => [answer.questionId, answer]));
  return items.map((item, position) => {
    const answer = byId.get(item.question.id);
    if (!answer) return position === index ? 'current' : 'pending';
    if (hidesResults) return 'answered';
    return answer.correct ? 'correct' : 'wrong';
  });
};
