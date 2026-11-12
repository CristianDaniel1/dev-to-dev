import type { Routes } from '@angular/router';
import {
  QUIZ_CATALOG_SEO,
  QUIZ_SESSION_SEO,
  RANDOM_SEO,
  REVIEW_SEO,
} from './data/quiz-routes-seo.data';
import { examTitleResolver } from './resolvers/exam-title.resolver';
import { sessionTitleResolver } from './resolvers/session-title.resolver';
import { techSeoResolver } from './resolvers/tech-seo.resolver';
import { techTitleResolver } from './resolvers/tech-title.resolver';

const loadQuizSession = () =>
  import('./components/quiz-session/quiz-session').then((module) => module.QuizSession);

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
    data: { seo: QUIZ_SESSION_SEO, kind: 'practice' },
    loadComponent: loadQuizSession,
  },
  {
    path: ':tech/simulado',
    title: examTitleResolver,
    data: { seo: QUIZ_SESSION_SEO, kind: 'exam' },
    loadComponent: loadQuizSession,
  },
];

/** Spaced review, mounted at `/revisao`. */
export const REVIEW_ROUTES: Routes = [
  {
    path: '',
    title: 'Revisão',
    data: { seo: REVIEW_SEO },
    loadComponent: () =>
      import('./components/review-overview/review-overview').then(
        (module) => module.ReviewOverview,
      ),
  },
  {
    path: 'praticar',
    title: 'Revisar',
    data: { seo: QUIZ_SESSION_SEO },
    loadComponent: () =>
      import('./components/review-session/review-session').then((module) => module.ReviewSession),
  },
];

/** Random mixed practice, mounted at `/aleatorio`. */
export const RANDOM_ROUTES: Routes = [
  {
    path: '',
    title: 'Aleatório',
    data: { seo: RANDOM_SEO },
    loadComponent: () =>
      import('./components/random-setup/random-setup').then((module) => module.RandomSetup),
  },
  {
    path: 'praticar',
    title: 'Rodada aleatória',
    data: { seo: QUIZ_SESSION_SEO },
    loadComponent: () =>
      import('./components/random-session/random-session').then((module) => module.RandomSession),
  },
];
