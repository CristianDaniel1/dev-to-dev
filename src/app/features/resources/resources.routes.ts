import type { Routes } from '@angular/router';
import { RESOURCE_HUB_SEO } from './data/resource-routes-seo.data';
import { categorySeoResolver } from './resolvers/category-seo.resolver';
import { categoryTitleResolver } from './resolvers/category-title.resolver';
import { collectionSeoResolver } from './resolvers/collection-seo.resolver';
import { collectionTitleResolver } from './resolvers/collection-title.resolver';

export const RESOURCE_ROUTES: Routes = [
  {
    path: '',
    title: 'Recursos',
    data: { seo: RESOURCE_HUB_SEO },
    loadComponent: () =>
      import('./components/resource-hub/resource-hub').then((module) => module.ResourceHub),
  },
  {
    path: 'colecoes/:colecao',
    title: collectionTitleResolver,
    resolve: { seo: collectionSeoResolver },
    loadComponent: () =>
      import('./components/collection-page/collection-page').then(
        (module) => module.CollectionPage,
      ),
  },
  {
    path: ':categoria',
    title: categoryTitleResolver,
    resolve: { seo: categorySeoResolver },
    loadComponent: () =>
      import('./components/category-page/category-page').then((module) => module.CategoryPage),
  },
];
