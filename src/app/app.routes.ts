import type { Routes } from '@angular/router';
import { ABOUT_SEO, HOME_SEO, NOT_FOUND_SEO, PROGRESS_SEO } from '@/core/data/route-seo.data';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { seo: HOME_SEO },
    loadComponent: () => import('@/features/home').then((module) => module.Home),
  },
  {
    path: 'quizzes',
    loadChildren: () => import('@/features/quizzes').then((module) => module.QUIZ_ROUTES),
  },
  {
    path: 'revisao',
    loadChildren: () => import('@/features/quizzes').then((module) => module.REVIEW_ROUTES),
  },
  {
    path: 'aleatorio',
    loadChildren: () => import('@/features/quizzes').then((module) => module.RANDOM_ROUTES),
  },
  {
    path: 'progresso',
    title: 'Seu progresso',
    data: { seo: PROGRESS_SEO },
    loadComponent: () => import('@/features/progress').then((module) => module.ProgressPage),
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
