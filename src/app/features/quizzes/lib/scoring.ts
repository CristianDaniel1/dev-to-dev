import type { Question, TopicSummary } from '@/shared/interfaces/content.interface';
import type { AnswerRecord, SessionSummary, TopicScore } from '../interfaces/scoring.interface';

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

const scoreTopics = (
  questions: readonly Question[],
  answersById: ReadonlyMap<string, AnswerRecord>,
  topics: readonly TopicSummary[],
): TopicScore[] =>
  topics
    .map((topic) => {
      const inTopic = questions.filter((question) => question.topic === topic.slug);
      return {
        slug: topic.slug,
        name: topic.name,
        total: inTopic.length,
        correct: inTopic.filter((question) => answersById.get(question.id)?.correct).length,
      };
    })
    .filter((score) => score.total > 0);

/**
 * Summarizes a finished session, with results grouped by topic in catalog order. Lucky
 * guesses count in the score but are listed for review.
 *
 * @param questions - Questions of the session.
 * @param answers - Answers given.
 * @param topics - Topics of the tech, in catalog order.
 * @returns The session summary.
 */
export const summarizeSession = (
  questions: readonly Question[],
  answers: readonly AnswerRecord[],
  topics: readonly TopicSummary[],
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
    byTopic: scoreTopics(questions, answersById, topics),
    missedIds: answers.filter(needsReview).map((answer) => answer.questionId),
  };
};
