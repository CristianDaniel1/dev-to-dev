import type { SessionKind } from '@/core/interfaces/progress.interface';
import type { Question, TechSummary } from '@/shared/interfaces/content.interface';

/** A bucket of the results breakdown: a topic of one tech, or a whole tech in mixed sessions. */
export interface ScoreGroup {
  key: string;
  name: string;
  /** Accent of the result bar. */
  color: string;
}

/** What a session covers and where its links lead; built by each session page. */
export interface SessionScope {
  kind: SessionKind;
  /** Shown in the header and results, e.g. "HTML", "Revisão". */
  title: string;
  /** Accent of the progress bar. */
  color: string;
  /** The tech of a single-tech session, for its badge; `null` when several are mixed. */
  tech: TechSummary | null;
  /** Slugs of every tech in the session. */
  techs: readonly string[];
  groups: readonly ScoreGroup[];
  /** Picks the group of a question (its topic or its tech). */
  groupOf: (question: Question) => string;
  /** Where "Sair" leads. */
  exitLink: string;
  /** Where "Mudar filtros" leads. */
  setupLink: string;
  /** Practice route that accepts explicit question ids, used to retry mistakes. */
  retryRoute: readonly string[];
  /** Extra query params of the retry route (e.g. the techs of a mixed session). */
  retryParams: Readonly<Record<string, string>>;
  /** Label of the "same settings again" button, or `null` to hide it. */
  restartLabel: string | null;
  /** Label of the link to `setupLink`. */
  setupLabel: string;
  /** Empty state shown when no question matches. */
  emptyHeading: string;
  emptyDescription: string;
}
