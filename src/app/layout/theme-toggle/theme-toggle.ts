import { ChangeDetectionStrategy, Component, afterNextRender, inject, signal } from '@angular/core';
import { Theme } from '@/core/theme/theme';
import { TEXT } from '@/core/i18n/pt-br';
import { Icon } from '@/shared/icon/icon';

/**
 * Toggles between light and dark themes. The icon swaps via CSS (`dark:`) so the
 * prerendered HTML already shows the right icon without a hydration mismatch.
 */
@Component({
  selector: 'app-theme-toggle',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="btn-icon"
      [attr.aria-pressed]="ready() ? theme.isDark() : null"
      [attr.aria-label]="text.toggle"
      [title]="text.toggle"
      (click)="theme.toggle()"
    >
      <span class="inline-flex dark:hidden"><app-icon name="moon" /></span>
      <span class="hidden dark:inline-flex"><app-icon name="sun" /></span>
    </button>
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(Theme);
  protected readonly text = TEXT.theme;
  protected readonly ready = signal(false);

  constructor() {
    afterNextRender(() => this.ready.set(true));
  }
}
