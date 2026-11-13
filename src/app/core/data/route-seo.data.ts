import type { RouteSeo } from '../interfaces/route-seo.interface';
import { websiteJsonLd } from '../lib/json-ld';

/** SEO data of the about page. */
export const ABOUT_SEO: RouteSeo = {
  description: 'O que é o Dev to Dev, como o conteúdo é produzido e como seu progresso é salvo.',
};

/** SEO data of the personal progress page, which has no public content. */
export const PROGRESS_SEO: RouteSeo = { noIndex: true };

/** SEO data of the not-found page, which stays out of search results. */
export const NOT_FOUND_SEO: RouteSeo = { noIndex: true };

/** SEO data of the home page: the default description plus the site's structured data. */
export const HOME_SEO: RouteSeo = { jsonLd: [websiteJsonLd()] };
