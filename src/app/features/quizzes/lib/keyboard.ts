import { OPTION_KEYS } from '../data/session-choices.data';

const TYPING_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

/**
 * Tells whether a key event comes from a field where the user is typing.
 *
 * @param target - Event target.
 * @returns True for inputs, textareas, selects and editable content.
 */
export const isTypingTarget = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement && (target.isContentEditable || TYPING_TAGS.has(target.tagName));

/**
 * Tells whether a key event comes from a button or link, which handle Enter themselves.
 *
 * @param target - Event target.
 * @returns True when the target is inside a button or link.
 */
export const isControlTarget = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement && !!target.closest('button, a');

/**
 * Maps a pressed key to an option position: letters A–F or digits 1–6.
 *
 * @param key - `KeyboardEvent.key`.
 * @returns The zero-based position, or -1 when the key picks no option.
 */
export const optionIndexForKey = (key: string): number => {
  const normalized = key.toLowerCase();
  if (/^[1-6]$/.test(normalized)) return Number(normalized) - 1;
  return OPTION_KEYS.indexOf(normalized);
};
