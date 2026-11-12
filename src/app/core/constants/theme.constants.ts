import type { ThemePreference } from '../interfaces/theme.interface';

/** Every theme preference the user can store. */
export const THEME_PREFERENCES: readonly ThemePreference[] = ['light', 'dark', 'system'];

/** Media query that reports the operating system's dark mode. */
export const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';
