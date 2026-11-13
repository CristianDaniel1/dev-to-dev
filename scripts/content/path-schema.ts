import { z } from 'zod';
import { LEVELS } from '../../src/app/shared/constants/content.constants';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be kebab-case');
const sentence = z.string().trim().min(1).max(220);

const stepSchema = z.strictObject({
  id: slug,
  title: z.string().trim().min(1).max(60),
  description: sentence,
  topic: z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+$/, 'must be "tech/topic"'),
  terms: z.array(slug).default([]),
  resources: z.array(slug).default([]),
});

/** Authoring format of `content/paths/<slug>.yaml`. */
export const pathFileSchema = z.strictObject({
  slug,
  name: z.string().trim().min(1).max(60),
  description: sentence,
  level: z.enum(LEVELS),
  order: z.number().int(),
  steps: z.array(stepSchema).min(2),
});

export type AuthoredPath = z.infer<typeof pathFileSchema>;
