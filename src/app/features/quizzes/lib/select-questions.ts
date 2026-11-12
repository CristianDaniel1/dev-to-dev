import type { QuestionProgress } from '@/core/interfaces/progress.interface';
import type { Question } from '@/shared/interfaces/content.interface';
import type { QuestionFilters } from '../interfaces/session.interface';
import { shuffle, type RandomFn } from './random';

const priority = (progress: QuestionProgress | undefined): number => {
  if (!progress) return 0;
  if (!progress.lastCorrect) return 1;
  return 2 + progress.box;
};

const matchesFilters = (
  question: Question,
  filters: QuestionFilters,
  topics: ReadonlySet<string>,
  progress: Readonly<Record<string, QuestionProgress>>,
): boolean =>
  (!topics.size || topics.has(question.topic)) &&
  (!filters.level || question.level === filters.level) &&
  (!filters.onlyUnanswered || !progress[question.id]);

/**
 * Picks the questions for a session: applies the filters, shuffles, then puts unseen questions
 * first, missed ones next and the rest by Leitner box.
 *
 * @param questions - Whole question bank of the tech.
 * @param filters - Session filters; explicit ids override the others.
 * @param progress - User progress by question id.
 * @param limit - Maximum number of questions, or `null` for every match.
 * @param random - Source of randomness.
 * @returns The questions of the session, in order.
 */
export const selectQuestions = (
  questions: readonly Question[],
  filters: QuestionFilters,
  progress: Readonly<Record<string, QuestionProgress>>,
  limit: number | null,
  random: RandomFn,
): Question[] => {
  if (filters.ids.length) {
    const wanted = new Set(filters.ids);
    return shuffle(
      questions.filter((question) => wanted.has(question.id)),
      random,
    );
  }

  const topics = new Set(filters.topics);
  const matches = questions.filter((question) =>
    matchesFilters(question, filters, topics, progress),
  );
  const ordered = shuffle(matches, random).sort(
    (left, right) => priority(progress[left.id]) - priority(progress[right.id]),
  );
  return limit === null ? ordered : ordered.slice(0, limit);
};
