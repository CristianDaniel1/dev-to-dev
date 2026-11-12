import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '@/core/components/footer/footer';
import { Header } from '@/core/components/header/header';
import { UI_TEXT } from '@/core/data/ui-text.data';

/** Application shell: skip link, header, routed content and footer. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-h-dvh flex-col' },
})
export class App {
  protected readonly text = UI_TEXT;
}
