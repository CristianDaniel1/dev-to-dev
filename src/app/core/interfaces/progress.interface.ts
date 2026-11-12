/** How sure the user was before seeing the answer. */
export type Confidence = 'sure' | 'unsure' | 'guess';

/** The fields of a question the progress store needs. */
export interface ProgressQuestionRef {
  id: string;
  tech: string;
  topic: string;
}

export interface QuestionProgress {
  tech: string;
  topic: string;
  attempts: number;
  correctCount: number;
  lastCorrect: boolean;
  lastConfidence: Confidence;
  /** Leitner box, 1–5. */
  box: number;
  lastAnsweredAt: number;
  nextReviewAt: number;
}

/** Kind of session: practice or exam of one tech, spaced review or a random mix. */
export type SessionKind = 'practice' | 'exam' | 'review' | 'random';

export interface SessionRecord {
  /** Tech slug, or an empty string when the session mixed several techs. */
  tech: string;
  /** Missing in sessions saved before modes existed; read them as practice. */
  kind?: SessionKind;
  total: number;
  correct: number;
  finishedAt: number;
}

export interface ProgressState {
  version: 1;
  questions: Record<string, QuestionProgress>;
  sessions: SessionRecord[];
}

export interface ProgressStats {
  /** Questions answered at least once. */
  answered: number;
  /** Questions whose last answer was right and not a guess. */
  mastered: number;
}
