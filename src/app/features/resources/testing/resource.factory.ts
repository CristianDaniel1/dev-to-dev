import type { Resource } from '@/shared/interfaces/resource.interface';

/**
 * Builds a resource for tests.
 *
 * @param overrides - Fields to change from the defaults.
 * @returns A valid resource.
 */
export const makeResource = (overrides: Partial<Resource> = {}): Resource => ({
  id: 'mdn',
  name: 'MDN Web Docs',
  url: 'https://developer.mozilla.org/',
  domain: 'developer.mozilla.org',
  category: 'documentacao',
  description: 'Documentação da web.',
  why: 'É a referência mais completa.',
  type: 'docs',
  pricing: 'free',
  languages: ['pt', 'en'],
  techs: ['html', 'css', 'javascript'],
  featured: false,
  ...overrides,
});
