import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, TitleStrategy, provideRouter } from '@angular/router';
import { SeoTitleStrategy } from './seo-title-strategy';
import { SITE_URL } from './site';

@Component({ template: '' })
class Blank {}

function metaContent(selector: string): string | null {
  return document.head.querySelector(selector)?.getAttribute('content') ?? null;
}

describe('SeoTitleStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: Blank },
          {
            path: 'quizzes',
            title: 'Quizzes',
            component: Blank,
            data: { seo: { description: 'Quiz list' } },
          },
          { path: 'hidden', title: 'Hidden', component: Blank, data: { seo: { noIndex: true } } },
        ]),
        { provide: TitleStrategy, useExisting: SeoTitleStrategy },
      ],
    });
  });

  it('applies the route title, description, canonical and Open Graph tags', async () => {
    await TestBed.inject(Router).navigateByUrl('/quizzes?nivel=iniciante');

    expect(document.title).toBe('Quizzes | Dev to Dev');
    expect(metaContent('meta[name="description"]')).toBe('Quiz list');
    expect(metaContent('meta[property="og:url"]')).toBe(`${SITE_URL}/quizzes`);
    expect(metaContent('meta[property="og:image"]')).toMatch(/^https:\/\//);
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `${SITE_URL}/quizzes`,
    );
  });

  it('uses the default title and description on the home page', async () => {
    await TestBed.inject(Router).navigateByUrl('/');

    expect(document.title).toBe('Dev to Dev | Quizzes e recursos para devs');
    expect(metaContent('meta[name="description"]')).toContain('Quizzes comentados');
    expect(metaContent('meta[name="robots"]')).toBe('index, follow');
  });

  it('sets noindex when the route asks for it', async () => {
    await TestBed.inject(Router).navigateByUrl('/hidden');

    expect(metaContent('meta[name="robots"]')).toBe('noindex');
  });
});
