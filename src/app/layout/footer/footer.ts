import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TEXT } from '@/core/i18n/pt-br';
import { Logo } from '@/shared/logo/logo';
import { NAV_LINKS } from '@/layout/nav-links';

/** Footer with secondary navigation. */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="mt-24 border-t border-line">
      <div
        class="container-page flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between"
      >
        <div class="max-w-sm">
          <app-logo />
          <p class="mt-3 text-sm text-ink-muted">{{ text.footer.tagline }}</p>
        </div>
        <nav [attr.aria-label]="'Rodapé'">
          <ul class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            @for (link of links; track link.path) {
              <li>
                <a [routerLink]="link.path" class="text-ink-muted hover:text-ink">{{
                  link.label
                }}</a>
              </li>
            }
          </ul>
        </nav>
      </div>
      <div class="container-page border-t border-line py-5 text-xs text-ink-muted">
        © {{ year }} Dev to Dev
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly text = TEXT;
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();
}
