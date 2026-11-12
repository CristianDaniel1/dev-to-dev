import type { Confidence } from '@/core/interfaces/progress.interface';

export interface AnswerRecord {
  questionId: string;
  selected: readonly string[];
  correct: boolean;
  confidence: Confidence;
}

/** Score of one results group (a topic, or a tech in mixed sessions). */
export interface GroupScore {
  key: string;
  name: string;
  color: string;
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
  /** Questions left without an answer (an exam that ran out of time). */
  unanswered: number;
  byGroup: GroupScore[];
  /** Wrong, guessed or unanswered questions, to retry. */
  missedIds: string[];
}
