import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '@/shared/components/icon/icon';
import { Logo } from '@/shared/components/logo/logo';
import { NAV_LINKS } from '../../data/nav-links.data';
import { UI_TEXT } from '../../data/ui-text.data';
import { MobileMenu } from '../mobile-menu/mobile-menu';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

/** Sticky header with brand, main navigation and theme toggle. */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Icon, Logo, MobileMenu, ThemeToggle],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly text = UI_TEXT;
  protected readonly links = NAV_LINKS;
  protected readonly isMenuOpen = signal(false);
}
