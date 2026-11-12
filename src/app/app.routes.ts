import type { Routes } from '@angular/router';
import { ABOUT_SEO, NOT_FOUND_SEO } from '@/core/data/route-seo.data';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('@/features/home').then((module) => module.Home),
  },
  {
    path: 'quizzes',
    loadChildren: () => import('@/features/quizzes').then((module) => module.QUIZ_ROUTES),
  },
  {
    path: 'recursos',
    loadChildren: () => import('@/features/resources').then((module) => module.RESOURCE_ROUTES),
  },
  {
    path: 'sobre',
    title: 'Sobre',
    data: { seo: ABOUT_SEO },
    loadComponent: () => import('@/features/about').then((module) => module.About),
  },
  {
    path: '404',
    title: 'Página não encontrada',
    data: { seo: NOT_FOUND_SEO },
    loadComponent: () => import('@/features/not-found').then((module) => module.NotFound),
  },
  {
    path: '**',
    title: 'Página não encontrada',
    data: { seo: NOT_FOUND_SEO },
    loadComponent: () => import('@/features/not-found').then((module) => module.NotFound),
  },
];
