import { TestBed } from '@angular/core/testing';
import { STORAGE_PREFIX } from '@/core/storage/persistent-storage';
import { THEME_STORAGE_KEY, Theme } from './theme';

function mockSystemDark(matches: boolean): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
}

describe('Theme', () => {
  const storageKey = STORAGE_PREFIX + THEME_STORAGE_KEY;

  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
  });

  afterEach(() => vi.unstubAllGlobals());

  it('follows the system when there is no saved preference', () => {
    mockSystemDark(true);
    const theme = TestBed.inject(Theme);

    expect(theme.preference()).toBe('system');
    expect(theme.resolved()).toBe('dark');
  });

  it('restores the saved preference', () => {
    mockSystemDark(true);
    localStorage.setItem(storageKey, 'light');
    const theme = TestBed.inject(Theme);

    expect(theme.resolved()).toBe('light');
  });

  it('ignores an invalid saved value', () => {
    mockSystemDark(false);
    localStorage.setItem(storageKey, 'sepia');
    const theme = TestBed.inject(Theme);

    expect(theme.preference()).toBe('system');
  });

  it('toggles, persists and applies data-theme on <html>', () => {
    mockSystemDark(false);
    const theme = TestBed.inject(Theme);

    theme.toggle();
    TestBed.tick();

    expect(theme.resolved()).toBe('dark');
    expect(localStorage.getItem(storageKey)).toBe('dark');
    expect(document.documentElement.dataset['theme']).toBe('dark');
  });
});
