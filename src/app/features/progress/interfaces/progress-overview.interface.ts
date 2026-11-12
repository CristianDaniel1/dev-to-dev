/** Headline numbers of the progress page. */
export interface ProgressOverview {
  answered: number;
  mastered: number;
  due: number;
  sessions: number;
}

/** A past session as listed in the history. */
export interface HistoryEntry {
  title: string;
  correct: number;
  total: number;
  finishedAt: number;
}

/** A backup read from a file, waiting for the user to confirm the import. */
export interface PendingImport {
  questionCount: number;
  sessionCount: number;
}
