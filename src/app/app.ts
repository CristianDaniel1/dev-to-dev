import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TEXT } from '@/core/i18n/pt-br';
import { Header } from '@/layout/header/header';
import { Footer } from '@/layout/footer/footer';

/** Application shell: skip link, header, routed content and footer. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-h-dvh flex-col' },
})
export class App {
  protected readonly text = TEXT;
}
