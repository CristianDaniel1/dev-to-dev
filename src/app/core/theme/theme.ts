import {
  DOCUMENT,
  DestroyRef,
  Injectable,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PersistentStorage } from '@/core/storage/persistent-storage';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

/** Theme storage key. The inline script in index.html reads the same key (`d2d:theme`). */
export const THEME_STORAGE_KEY = 'theme';

const PREFERENCES: readonly ThemePreference[] = ['light', 'dark', 'system'];
const DARK_QUERY = '(prefers-color-scheme: dark)';

function isThemePreference(value: string | null): value is ThemePreference {
  return PREFERENCES.some((preference) => preference === value);
}

/**
 * Light/dark theme. The inline script in index.html applies the theme before the
 * first paint; this service takes over after hydration.
 */
@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly document = inject(DOCUMENT);
  private readonly storage = inject(PersistentStorage);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly systemPrefersDark = signal(false);
  private readonly preferenceState = signal<ThemePreference>('system');

  readonly preference = this.preferenceState.asReadonly();
  readonly resolved = computed<ResolvedTheme>(() => {
    const preference = this.preferenceState();
    if (preference !== 'system') return preference;
    return this.systemPrefersDark() ? 'dark' : 'light';
  });
  readonly isDark = computed(() => this.resolved() === 'dark');

  constructor() {
    if (!this.isBrowser) return;

    const stored = this.storage.readRaw(THEME_STORAGE_KEY);
    if (isThemePreference(stored)) this.preferenceState.set(stored);

    const media = this.document.defaultView?.matchMedia(DARK_QUERY);
    if (media) {
      this.systemPrefersDark.set(media.matches);
      const onChange = (event: MediaQueryListEvent) => this.systemPrefersDark.set(event.matches);
      media.addEventListener('change', onChange);
      inject(DestroyRef).onDestroy(() => media.removeEventListener('change', onChange));
    }

    effect(() => {
      this.document.documentElement.dataset['theme'] = this.resolved();
    });
  }

  /** Sets and persists the preference. */
  setPreference(preference: ThemePreference): void {
    this.preferenceState.set(preference);
    this.storage.writeRaw(THEME_STORAGE_KEY, preference);
  }

  /** Switches between light and dark based on the currently visible theme. */
  toggle(): void {
    this.setPreference(this.isDark() ? 'light' : 'dark');
  }
}
