import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '@/shared/components/logo/logo';
import { NAV_LINKS } from '../../data/nav-links.data';
import { UI_TEXT } from '../../data/ui-text.data';

/** Footer with secondary navigation. */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly text = UI_TEXT;
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();
}
