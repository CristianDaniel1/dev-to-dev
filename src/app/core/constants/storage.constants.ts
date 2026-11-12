/** Prefix for every app key in localStorage. */
export const STORAGE_PREFIX = 'd2d:';

/** Theme preference key. The inline script in index.html reads the same key (`d2d:theme`). */
export const THEME_STORAGE_KEY = 'theme';

/** Quiz progress key, versioned so the stored shape can migrate later. */
export const PROGRESS_STORAGE_KEY = 'v1:progress';

/** Favorite resources key, versioned like the progress. */
export const FAVORITES_STORAGE_KEY = 'v1:favorites';
