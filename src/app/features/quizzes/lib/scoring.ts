import type { Question } from '@/shared/interfaces/content.interface';
import type { AnswerRecord, GroupScore, SessionSummary } from '../interfaces/scoring.interface';
import type { ScoreGroup } from '../interfaces/session-scope.interface';

/**
 * Tells whether a selection matches the correct options exactly, in any order.
 *
 * @param question - Answered question.
 * @param selected - Selected option ids.
 * @returns True when the answer is right.
 */
export const isAnswerCorrect = (question: Question, selected: readonly string[]): boolean => {
  if (selected.length !== question.correct.length) return false;
  const chosen = new Set(selected);
  return question.correct.every((id) => chosen.has(id));
};

/**
 * Tells whether an answer should go back to review: wrong, or right only by guessing.
 *
 * @param answer - Recorded answer.
 * @returns True when the question needs review.
 */
export const needsReview = (answer: AnswerRecord): boolean =>
  !answer.correct || answer.confidence === 'guess';

const scoreGroups = (
  questions: readonly Question[],
  answersById: ReadonlyMap<string, AnswerRecord>,
  groups: readonly ScoreGroup[],
  groupOf: (question: Question) => string,
): GroupScore[] =>
  groups
    .map((group) => {
      const inGroup = questions.filter((question) => groupOf(question) === group.key);
      return {
        ...group,
        total: inGroup.length,
        correct: inGroup.filter((question) => answersById.get(question.id)?.correct).length,
      };
    })
    .filter((score) => score.total > 0);

/**
 * Summarizes a finished session, with results grouped in the given order. Lucky guesses count
 * in the score but are listed for review; unanswered questions count as wrong.
 *
 * @param questions - Questions of the session.
 * @param answers - Answers given.
 * @param groups - Result groups, in display order.
 * @param groupOf - Picks the group key of a question.
 * @returns The session summary.
 */
export const summarizeSession = (
  questions: readonly Question[],
  answers: readonly AnswerRecord[],
  groups: readonly ScoreGroup[],
  groupOf: (question: Question) => string,
): SessionSummary => {
  const answersById = new Map(answers.map((answer) => [answer.questionId, answer]));
  const correct = answers.filter((answer) => answer.correct).length;
  const total = questions.length;
  return {
    total,
    correct,
    percentage: total ? Math.round((correct / total) * 100) : 0,
    luckyGuesses: answers.filter((answer) => answer.correct && answer.confidence === 'guess')
      .length,
    unanswered: questions.filter((question) => !answersById.has(question.id)).length,
    byGroup: scoreGroups(questions, answersById, groups, groupOf),
    missedIds: questions
      .filter((question) => {
        const answer = answersById.get(question.id);
        return !answer || needsReview(answer);
      })
      .map((question) => question.id),
  };
};
