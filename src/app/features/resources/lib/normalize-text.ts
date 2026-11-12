/**
 * Lowercases a text and strips accents, so "Formulários" matches "formularios".
 *
 * @param text - Any text.
 * @returns The normalized text, trimmed.
 */
export const normalizeText = (text: string): string =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
