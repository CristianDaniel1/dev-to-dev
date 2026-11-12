import { THEME_PREFERENCES } from '../constants/theme.constants';
import type { ThemePreference } from '../interfaces/theme.interface';

/**
 * Checks whether a stored string is a valid theme preference.
 *
 * @param value - Raw stored value.
 * @returns True when it is one of the known preferences.
 */
export const isThemePreference = (value: string | null): value is ThemePreference =>
  THEME_PREFERENCES.some((preference) => preference === value);
