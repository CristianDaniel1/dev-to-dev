import type { Routes } from '@angular/router';
import { QUIZ_CATALOG_SEO, QUIZ_SESSION_SEO } from './data/quiz-routes-seo.data';
import { sessionTitleResolver } from './resolvers/session-title.resolver';
import { techSeoResolver } from './resolvers/tech-seo.resolver';
import { techTitleResolver } from './resolvers/tech-title.resolver';

export const QUIZ_ROUTES: Routes = [
  {
    path: '',
    title: 'Quizzes',
    data: { seo: QUIZ_CATALOG_SEO },
    loadComponent: () =>
      import('./components/quiz-catalog/quiz-catalog').then((module) => module.QuizCatalog),
  },
  {
    path: ':tech',
    title: techTitleResolver,
    resolve: { seo: techSeoResolver },
    loadComponent: () =>
      import('./components/tech-overview/tech-overview').then((module) => module.TechOverview),
  },
  {
    path: ':tech/praticar',
    title: sessionTitleResolver,
    data: { seo: QUIZ_SESSION_SEO },
    loadComponent: () =>
      import('./components/quiz-session/quiz-session').then((module) => module.QuizSession),
  },
];
