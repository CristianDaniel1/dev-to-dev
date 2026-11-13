import type { Routes } from '@angular/router';
import { GLOSSARY_SEO } from './data/glossary-seo.data';
import { termSeoResolver } from './resolvers/term-seo.resolver';
import { termTitleResolver } from './resolvers/term-title.resolver';

export const GLOSSARY_ROUTES: Routes = [
  {
    path: '',
    title: 'Glossário',
    data: { seo: GLOSSARY_SEO },
    loadComponent: () =>
      import('./components/glossary-page/glossary-page').then((module) => module.GlossaryPage),
  },
  {
    path: ':termo',
    title: termTitleResolver,
    resolve: { seo: termSeoResolver },
    loadComponent: () =>
      import('./components/term-page/term-page').then((module) => module.TermPage),
  },
];
