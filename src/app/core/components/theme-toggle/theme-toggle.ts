import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from '@/shared/components/icon/icon';
import { UI_TEXT } from '../../data/ui-text.data';
import { injectIsHydrated } from '../../lib/hydration';
import { ThemeStore } from '../../services/theme.store';

/**
 * Toggles between light and dark themes. The icon swaps via CSS (`dark:`) so the prerendered
 * HTML already shows the right icon without a hydration mismatch.
 */
@Component({
  selector: 'app-theme-toggle',
  imports: [Icon],
  templateUrl: './theme-toggle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeStore);
  protected readonly text = UI_TEXT.theme;
  protected readonly isHydrated = injectIsHydrated();
}
