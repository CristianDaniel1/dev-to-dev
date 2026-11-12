/** Number of questions per session when none is chosen. */
export const DEFAULT_SESSION_SIZE = 10;

/** Largest session size accepted from the URL. */
export const MAX_SESSION_SIZE = 100;

/** Letters shown next to the options, by position. */
export const OPTION_LETTERS = 'ABCDEF';

/** URL value of the session size that means "every matching question". */
export const ALL_QUESTIONS_PARAM = 'todas';

/** Number of questions of an exam when none is chosen. */
export const DEFAULT_EXAM_SIZE = 20;

/** Maximum number of due questions in one review session. */
export const REVIEW_SESSION_SIZE = 20;

/** One minute, in milliseconds (exam timer). */
export const MINUTE_MS = 60_000;

/** Exam timer durations offered, in minutes; `null` means no timer. */
export const EXAM_DURATIONS: readonly (number | null)[] = [null, 10, 20, 30];
