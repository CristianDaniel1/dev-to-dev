/** localStorage key of the quiz progress (app: core/constants/storage.constants.ts). */
export const PROGRESS_STORAGE_KEY = 'd2d:v1:progress';

/** localStorage key of the theme preference (app: core/constants/storage.constants.ts). */
export const THEME_STORAGE_KEY = 'd2d:theme';

/** Prerendered pages that must render their content without JavaScript. */
export const PRERENDERED_PAGES = ['/', '/quizzes', '/quizzes/html', '/recursos', '/sobre'] as const;

/** Question id whose right answer is known: `'2' + 2` prints "22". */
export const STRING_CONCAT_QUESTION_ID = 'javascript-fundamentos-002';

/** Second known question: the assignment operator is `=`. */
export const ASSIGNMENT_QUESTION_ID = 'javascript-fundamentos-003';

/** Tag of the tests that only make sense on a small screen. */
export const MOBILE_TAG = '@mobile';

/** Tag of the fast checks that cover the critical paths. */
export const SMOKE_TAG = '@smoke';

/** Console error the browser logs for a page served with status 404. */
export const NOT_FOUND_RESPONSE_ERROR = /status of 404/;
