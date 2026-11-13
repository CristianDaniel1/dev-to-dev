import { z } from 'zod';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be kebab-case');
const nonEmpty = z.string().trim().min(1);

/** Authoring format of one term inside `content/glossary/<group>.yaml`. */
export const termSchema = z.strictObject({
  slug,
  term: nonEmpty.max(40),
  aka: z.array(nonEmpty).default([]),
  short: nonEmpty.max(220),
  body: nonEmpty,
  code: z.strictObject({ lang: nonEmpty, source: nonEmpty }).optional(),
  related: z.array(slug).default([]),
  topics: z.array(z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+$/, 'must be "tech/topic"')).default([]),
  resources: z.array(slug).default([]),
});

/** Authoring format of `content/glossary/<group>.yaml`. */
export const glossaryFileSchema = z.strictObject({
  terms: z.array(termSchema).min(1),
});

export type AuthoredTerm = z.infer<typeof termSchema>;
