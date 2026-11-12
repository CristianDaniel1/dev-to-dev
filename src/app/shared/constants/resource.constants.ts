/** Kinds of resource, in the order the type filter lists them. */
export const RESOURCE_TYPES = [
  'docs',
  'reference',
  'course',
  'practice',
  'tool',
  'library',
  'service',
  'assets',
  'blog',
  'newsletter',
  'podcast',
  'community',
] as const;

/** How a resource is paid for, from cheapest to most expensive. */
export const PRICINGS = ['free', 'freemium', 'paid'] as const;

/** Languages a resource can be available in. */
export const RESOURCE_LANGUAGES = ['pt', 'en'] as const;

/** Technologies a resource can be tagged with. Quiz tech slugs reuse the same values. */
export const RESOURCE_TECHS = [
  'html',
  'css',
  'javascript',
  'typescript',
  'react',
  'angular',
  'vue',
  'svelte',
  'nextjs',
  'node',
  'tailwind',
  'git',
  'sql',
] as const;
