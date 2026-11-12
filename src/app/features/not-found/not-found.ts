import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** 404 page. Prerendered at /404 and copied to 404.html by the postbuild script. */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-page py-20 sm:py-28">
      <p class="font-mono text-sm text-ink-muted">Erro 404</p>
      <h1 class="mt-3 text-3xl font-extrabold [font-stretch:78%] sm:text-[3.25rem] sm:leading-none">
        Esta página não existe
      </h1>
      <p class="prose-width mt-4 text-lg text-ink-muted">
        O endereço pode ter mudado ou estar digitado errado. Volte para o início ou escolha um quiz.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a routerLink="/" class="btn btn-primary">Voltar ao início</a>
        <a routerLink="/quizzes" class="btn btn-secondary">Ver quizzes</a>
      </div>
    </div>
  `,
})
export class NotFound {}
