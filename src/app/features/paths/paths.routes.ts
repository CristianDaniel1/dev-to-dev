import type { Routes } from '@angular/router';
import { PATHS_SEO } from './data/paths-seo.data';
import { pathSeoResolver } from './resolvers/path-seo.resolver';
import { pathTitleResolver } from './resolvers/path-title.resolver';

export const PATH_ROUTES: Routes = [
  {
    path: '',
    title: 'Trilhas de estudo',
    data: { seo: PATHS_SEO },
    loadComponent: () =>
      import('./components/paths-page/paths-page').then((module) => module.PathsPage),
  },
  {
    path: ':trilha',
    title: pathTitleResolver,
    resolve: { seo: pathSeoResolver },
    loadComponent: () =>
      import('./components/path-page/path-page').then((module) => module.PathPage),
  },
];
