import type { AREAS, LEVELS } from '../constants/content.constants';

export type Level = (typeof LEVELS)[number];

export type Area = (typeof AREAS)[number];

export type LevelCounts = Record<Level, number>;

export interface TopicSummary {
  slug: string;
  name: string;
  description: string;
  questionCount: number;
  levelCounts: LevelCounts;
}

export interface TechSummary {
  slug: string;
  name: string;
  description: string;
  area: Area;
  /** Short label shown inside the tech badge, e.g. "JS". */
  badge: string;
  /** Brand color used as an accent. */
  color: string;
  /** Text color with at least 4.5:1 contrast on `color`. */
  onColor: string;
  questionCount: number;
  levelCounts: LevelCounts;
  topics: TopicSummary[];
}

export interface Catalog {
  techs: TechSummary[];
}

export interface QuestionOption {
  id: string;
  /** Inline HTML (escaped text with `<code>`/`<strong>` only). */
  html: string;
  /** Inline HTML explaining why this option is right or wrong. */
  explanationHtml: string;
}

export interface CodeSnippet {
  lang: string;
  /** Highlighted HTML produced at build time (classes only, no inline styles). */
  html: string;
}

export interface Question {
  /** Stable id; user progress is keyed by it. */
  id: string;
  tech: string;
  topic: string;
  level: Level;
  /** `multiple` when more than one option is correct. */
  kind: 'single' | 'multiple';
  promptHtml: string;
  code?: CodeSnippet;
  options: QuestionOption[];
  correct: string[];
  explanationHtml: string;
  tags: string[];
}

export interface QuizBank {
  tech: string;
  questions: Question[];
}
