import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  type ActivatedRouteSnapshot,
  type RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE, SITE_URL } from '@/core/seo/site';

/** SEO data accepted in each route’s `data.seo`. */
export interface RouteSeo {
  description?: string;
  noIndex?: boolean;
}

function deepestChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  let current = route;
  while (current.firstChild) current = current.firstChild;
  return current;
}

function toAbsoluteUrl(path: string): string {
  const cleanPath = path.split(/[?#]/)[0] ?? '/';
  return cleanPath === '/' ? SITE_URL : `${SITE_URL}${cleanPath}`;
}

/**
 * Besides `<title>`, applies description, canonical, Open Graph and Twitter Card
 * tags on every navigation. It also runs during prerendering, so static HTML ships complete.
 */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);
    const fullTitle = pageTitle
      ? `${pageTitle} | ${SITE_NAME}`
      : `${SITE_NAME} | Quizzes e recursos para devs`;
    const seo: RouteSeo = deepestChild(snapshot.root).data['seo'] ?? {};
    const description = seo.description ?? SITE_DESCRIPTION;
    const url = toAbsoluteUrl(snapshot.url);
    const image = `${SITE_URL}${SITE_OG_IMAGE}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: seo.noIndex ? 'noindex' : 'index, follow' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }
}
