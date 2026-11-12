import type { QuestionOption } from '@/shared/interfaces/content.interface';

/** Options of an answered question split by how the explanation presents them. */
export interface FeedbackGroups {
  wrongPicks: QuestionOption[];
  correct: QuestionOption[];
  others: QuestionOption[];
}
