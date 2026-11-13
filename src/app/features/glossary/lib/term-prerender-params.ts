import { GLOSSARY } from '@/shared/generated/glossary';

/**
 * Lists the `termo` route param of every glossary term, for prerendering.
 *
 * @returns One params object per term.
 */
export const termPrerenderParams = async (): Promise<Record<string, string>[]> =>
  GLOSSARY.terms.map((term) => ({ termo: term.slug }));
