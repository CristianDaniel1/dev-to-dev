/**
 * Checks the stored shape of the favorites: an array of resource ids.
 *
 * @param value - Parsed value from storage.
 * @returns True when it is an array of strings.
 */
export const isFavoriteIds = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');
