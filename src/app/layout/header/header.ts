import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TEXT } from '@/core/i18n/pt-br';
import { Icon } from '@/shared/icon/icon';
import { Logo } from '@/shared/logo/logo';
import { MobileMenu } from '@/layout/mobile-menu/mobile-menu';
import { ThemeToggle } from '@/layout/theme-toggle/theme-toggle';
import { NAV_LINKS } from '@/layout/nav-links';

/** Sticky header with brand, main navigation and theme toggle. */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Icon, Logo, MobileMenu, ThemeToggle],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly text = TEXT;
  protected readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);
}
