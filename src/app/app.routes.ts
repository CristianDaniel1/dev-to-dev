import { type Routes } from '@angular/router';
import type { RouteSeo } from '@/core/seo/seo-title-strategy';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('@/features/home/home').then((module) => module.Home),
  },
  {
    path: 'quizzes',
    title: 'Quizzes',
    data: {
      seo: {
        description:
          'Quizzes comentados de HTML, CSS, JavaScript, TypeScript, React, Angular, Git e SQL, com explicação para cada alternativa.',
      } satisfies RouteSeo,
    },
    loadComponent: () =>
      import('@/features/quizzes/catalog/quiz-catalog').then((module) => module.QuizCatalog),
  },
  {
    path: 'recursos',
    title: 'Recursos',
    data: {
      seo: {
        description:
          'Curadoria de documentações, ferramentas, cursos e referências para desenvolvedores, cada uma com o motivo da recomendação.',
      } satisfies RouteSeo,
    },
    loadComponent: () =>
      import('@/features/resources/catalog/resource-catalog').then(
        (module) => module.ResourceCatalog,
      ),
  },
  {
    path: 'sobre',
    title: 'Sobre',
    data: {
      seo: {
        description:
          'O que é o Dev to Dev, como o conteúdo é produzido e como seu progresso é salvo.',
      } satisfies RouteSeo,
    },
    loadComponent: () => import('@/features/about/about').then((module) => module.About),
  },
  {
    path: '404',
    title: 'Página não encontrada',
    data: { seo: { noIndex: true } satisfies RouteSeo },
    loadComponent: () => import('@/features/not-found/not-found').then((module) => module.NotFound),
  },
  {
    path: '**',
    title: 'Página não encontrada',
    data: { seo: { noIndex: true } satisfies RouteSeo },
    loadComponent: () => import('@/features/not-found/not-found').then((module) => module.NotFound),
  },
];
