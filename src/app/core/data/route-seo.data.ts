import type { RouteSeo } from '../interfaces/route-seo.interface';

/** SEO data of the about page. */
export const ABOUT_SEO: RouteSeo = {
  description: 'O que é o Dev to Dev, como o conteúdo é produzido e como seu progresso é salvo.',
};

/** SEO data of the not-found page, which stays out of search results. */
export const NOT_FOUND_SEO: RouteSeo = { noIndex: true };
