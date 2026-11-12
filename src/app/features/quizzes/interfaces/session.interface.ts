import type { Level, Question, QuestionOption } from '@/shared/interfaces/content.interface';
import type { AnswerRecord } from './scoring.interface';

export type SessionStatus = 'idle' | 'active' | 'finished' | 'empty';

export interface QuestionFilters {
  /** Topic slugs to include; empty means every topic. */
  topics: readonly string[];
  /** `null` means every level. */
  level: Level | null;
  onlyUnanswered: boolean;
  /** Explicit question ids (e.g. retrying mistakes); overrides the other filters when non-empty. */
  ids: readonly string[];
}

export interface SessionConfig {
  filters: QuestionFilters;
  /** `null` means every matching question. */
  limit: number | null;
  seed: number;
}

export interface SessionItem {
  question: Question;
  /** Options in the order shown to the user (shuffled per session). */
  options: QuestionOption[];
}

export interface ReviewItem extends SessionItem {
  answer: AnswerRecord | undefined;
}

/** Raw session query params, as read from the URL. */
export interface SessionQueryInput {
  topico: string | undefined;
  nivel: string | undefined;
  qtd: string | undefined;
  novas: string | undefined;
  ids: string | undefined;
}

/** Query params of the practice route, as built by the setup form. */
export interface SessionQueryParams {
  topico: string | null;
  nivel: string | null;
  qtd: number | 'todas';
  novas: '1' | null;
}

/** Choices made in the session setup form. */
export interface SessionSetup {
  topics: readonly string[];
  level: Level | null;
  size: number | null;
  onlyUnanswered: boolean;
}
