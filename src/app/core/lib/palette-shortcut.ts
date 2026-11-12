/**
 * Tells whether a key press is the command palette shortcut (Ctrl+K, or ⌘K on macOS).
 *
 * @param event - Key press.
 * @returns True for Ctrl+K or Meta+K without other modifiers.
 */
export const isPaletteShortcut = (event: KeyboardEvent): boolean =>
  (event.ctrlKey || event.metaKey) &&
  !event.altKey &&
  !event.shiftKey &&
  event.key.toLowerCase() === 'k';
