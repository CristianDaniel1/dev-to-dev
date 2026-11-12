/** localStorage key of the quiz progress (app: core/constants/storage.constants.ts). */
export const PROGRESS_STORAGE_KEY = 'd2d:v1:progress';

/** localStorage key of the favorite resources (app: core/constants/storage.constants.ts). */
export const FAVORITES_STORAGE_KEY = 'd2d:v1:favorites';

/** localStorage key of the theme preference (app: core/constants/storage.constants.ts). */
export const THEME_STORAGE_KEY = 'd2d:theme';

/** Prerendered pages that must render their content without JavaScript. */
export const PRERENDERED_PAGES = [
  '/',
  '/quizzes',
  '/quizzes/html',
  '/recursos',
  '/recursos/ferramentas',
  '/recursos/colecoes/primeiro-projeto-frontend',
  '/sobre',
] as const;

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

/** Question id that does not exist, so a session filtered by it is always empty. */
export const MISSING_QUESTION_ID = 'missing-question-000';

/** Tech, topic and level with no question yet (update when such questions are written). */
export const EMPTY_FILTER = { tech: 'react', topic: 'Estado', level: 'Avançado' } as const;

/** Favicon service the resource cards load icons from; stubbed so tests stay offline. */
export const FAVICON_SERVICE_PATTERN = 'https://icons.duckduckgo.com/**';

/** A 1×1 transparent PNG, served in place of external images. */
export const TRANSPARENT_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  'base64',
);

/** Resource in Portuguese and free: Flexbox Froggy (practice). */
export const PT_PRACTICE_RESOURCE = 'Flexbox Froggy';

/** Practice resource only in English: Exercism. */
export const EN_PRACTICE_RESOURCE = 'Exercism';

/** Topic of the two known JavaScript questions. */
export const KNOWN_QUESTIONS_TOPIC = 'fundamentos';

/** Tech of the two known questions. */
export const KNOWN_QUESTIONS_TECH = 'javascript';
