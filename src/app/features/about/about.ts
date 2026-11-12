import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeader } from '@/shared/page-header/page-header';

/** About page: what the project is and how its content is made. */
@Component({
  selector: 'app-about',
  imports: [RouterLink, PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-page">
      <app-page-header
        heading="Sobre o Dev to Dev"
        intro="Um lugar para praticar o que você estuda e encontrar bons materiais sem garimpar a internet."
      />
      <div class="prose-width flex flex-col gap-5">
        <p>
          O Dev to Dev nasceu do Front-End Quiz, um projeto pequeno com cinco quizzes de frontend. A
          ideia agora é maior: cobrir várias áreas do desenvolvimento e fazer cada pergunta ensinar
          alguma coisa, não só dar uma nota.
        </p>
        <p>
          Toda pergunta traz a explicação de cada alternativa e aponta para a documentação ou o
          material onde o assunto é tratado a fundo. O que você erra volta para revisão, para que o
          conteúdo fique de verdade.
        </p>
        <p>
          A central de recursos segue a mesma lógica: poucos itens, bem escolhidos, cada um com o
          motivo de estar ali.
        </p>
        <p>
          Seu progresso fica salvo só neste navegador. Não há conta nem coleta de dados pessoais.
        </p>
        <p><a routerLink="/quizzes" class="link font-medium">Ir para os quizzes</a></p>
      </div>
    </div>
  `,
})
export class About {}
