import type { Level, ReadingLink } from './content.interface';
import type { PracticeTopic, RelatedTerm } from './glossary.interface';

/** The quiz topic a step practices, with its size. */
export interface StepPractice extends PracticeTopic {
  questionCount: number;
}

export interface PathStep {
  /** Stable id inside the path; the checklist is keyed by it. */
  id: string;
  title: string;
  description: string;
  practice: StepPractice;
  terms: RelatedTerm[];
  resources: ReadingLink[];
}

/** A learning path: an ordered sequence of quiz topics, glossary terms and resources. */
export interface LearningPath {
  /** Stable id, used in the URL and as the checklist key. */
  slug: string;
  name: string;
  description: string;
  level: Level;
  steps: PathStep[];
}
