import type { Confidence } from '@/core/interfaces/progress.interface';

export interface AnswerRecord {
  questionId: string;
  selected: readonly string[];
  correct: boolean;
  confidence: Confidence;
}

export interface TopicScore {
  slug: string;
  name: string;
  correct: number;
  total: number;
}

export interface SessionSummary {
  total: number;
  correct: number;
  /** Rounded percentage, 0–100. */
  percentage: number;
  /** Right answers the user marked as a guess. */
  luckyGuesses: number;
  byTopic: TopicScore[];
  missedIds: string[];
}
