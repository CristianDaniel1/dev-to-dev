import { isPaletteShortcut } from './palette-shortcut';

describe('isPaletteShortcut', () => {
  it('accepts Ctrl+K and Meta+K only', () => {
    expect(isPaletteShortcut(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))).toBe(true);
    expect(isPaletteShortcut(new KeyboardEvent('keydown', { key: 'K', metaKey: true }))).toBe(true);
    expect(isPaletteShortcut(new KeyboardEvent('keydown', { key: 'k' }))).toBe(false);
    expect(
      isPaletteShortcut(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, shiftKey: true })),
    ).toBe(false);
  });
});
