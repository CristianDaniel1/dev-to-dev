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
import { THEME_STORAGE_KEY } from '../constants/storage.constants';
import { DARK_SCHEME_QUERY } from '../constants/theme.constants';
import type { ResolvedTheme, ThemePreference } from '../interfaces/theme.interface';
import { isThemePreference } from '../lib/theme';
import { PersistentStorage } from './persistent-storage';

/**
 * Light/dark theme. The inline script in index.html applies the theme before the first paint;
 * this store takes over after hydration.
 */
@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private readonly document = inject(DOCUMENT);
  private readonly storage = inject(PersistentStorage);
  private readonly destroyRef = inject(DestroyRef);

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
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    this.restorePreference();
    this.watchSystemScheme();
    effect(() => {
      this.document.documentElement.dataset['theme'] = this.resolved();
    });
  }

  /**
   * Sets and persists the preference.
   *
   * @param preference - Theme chosen by the user.
   */
  setPreference(preference: ThemePreference): void {
    this.preferenceState.set(preference);
    this.storage.writeRaw(THEME_STORAGE_KEY, preference);
  }

  /** Switches between light and dark based on the currently visible theme. */
  toggle(): void {
    this.setPreference(this.isDark() ? 'light' : 'dark');
  }

  private restorePreference(): void {
    const stored = this.storage.readRaw(THEME_STORAGE_KEY);
    if (isThemePreference(stored)) this.preferenceState.set(stored);
  }

  private watchSystemScheme(): void {
    const media = this.document.defaultView?.matchMedia(DARK_SCHEME_QUERY);
    if (!media) return;
    this.systemPrefersDark.set(media.matches);
    const onChange = (event: MediaQueryListEvent) => this.systemPrefersDark.set(event.matches);
    media.addEventListener('change', onChange);
    this.destroyRef.onDestroy(() => media.removeEventListener('change', onChange));
  }
}
