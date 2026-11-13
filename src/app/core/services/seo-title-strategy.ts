import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { type RouterStateSnapshot, TitleStrategy } from '@angular/router';
import {
  JSON_LD_SCRIPT_ID,
  SITE_DESCRIPTION,
  SITE_HOME_TITLE,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_URL,
} from '../constants/site.constants';
import type { JsonLdNode } from '../interfaces/json-ld.interface';
import type { RouteSeo } from '../interfaces/route-seo.interface';
import { serializeJsonLd } from '../lib/json-ld';
import { deepestChild, toAbsoluteUrl } from '../lib/seo-url';

/**
 * Besides `<title>`, applies description, canonical, Open Graph, Twitter Card and JSON-LD on every
 * navigation. It also runs during prerendering, so the static HTML ships complete.
 */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  /**
   * Applies the title and SEO tags of the activated route.
   *
   * @param snapshot - Router state after navigation.
   */
  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);
    const fullTitle = pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_HOME_TITLE;
    const seo: RouteSeo = deepestChild(snapshot.root).data['seo'] ?? {};
    const description = seo.description ?? SITE_DESCRIPTION;
    const url = toAbsoluteUrl(snapshot.url);

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: seo.noIndex ? 'noindex' : 'index, follow' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: `${SITE_URL}${SITE_OG_IMAGE}` });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.setCanonical(url);
    this.setJsonLd(seo.jsonLd ?? []);
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

  private setJsonLd(nodes: readonly JsonLdNode[]): void {
    const existing = this.document.getElementById(JSON_LD_SCRIPT_ID);
    if (!nodes.length) {
      existing?.remove();
      return;
    }
    const script = existing ?? this.createJsonLdScript();
    script.textContent = serializeJsonLd(nodes);
  }

  private createJsonLdScript(): HTMLScriptElement {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = JSON_LD_SCRIPT_ID;
    this.document.head.appendChild(script);
    return script;
  }
}
