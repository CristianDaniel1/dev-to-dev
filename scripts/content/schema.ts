import { z } from 'zod';
import { AREAS, LEVELS } from '../../src/app/shared/constants/content.constants';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be kebab-case');
const nonEmpty = z.string().trim().min(1);

/** Authoring format of `content/quizzes/<tech>/meta.yaml`. */
export const techMetaSchema = z.strictObject({
  name: nonEmpty,
  description: nonEmpty,
  area: z.enum(AREAS),
  badge: z.string().min(1).max(4),
  color: z.string().regex(/^#[0-9a-f]{6}$/i),
  onColor: z.string().regex(/^#[0-9a-f]{6}$/i),
  order: z.number().int(),
  draft: z.boolean().default(false),
  topics: z.array(z.strictObject({ slug, name: nonEmpty, description: nonEmpty })).min(1),
});

const optionSchema = z.strictObject({
  text: nonEmpty,
  correct: z.boolean().default(false),
  explanation: nonEmpty,
});

/** Authoring format of one question inside `content/quizzes/<tech>/<topic>.yaml`. */
export const questionSchema = z
  .strictObject({
    id: slug,
    level: z.enum(LEVELS),
    prompt: nonEmpty,
    code: z.strictObject({ lang: nonEmpty, source: nonEmpty }).optional(),
    options: z.array(optionSchema).min(2).max(6),
    explanation: nonEmpty,
    tags: z.array(slug).default([]),
  })
  .refine((question) => question.options.some((option) => option.correct), {
    message: 'at least one option must be correct',
    path: ['options'],
  })
  .refine(
    (question) =>
      new Set(question.options.map((option) => option.text)).size === question.options.length,
    { message: 'option texts must be unique', path: ['options'] },
  );

/** Authoring format of `content/quizzes/<tech>/<topic>.yaml`. */
export const topicFileSchema = z.strictObject({
  questions: z.array(questionSchema).min(1),
});

export type TechMeta = z.infer<typeof techMetaSchema>;
export type AuthoredQuestion = z.infer<typeof questionSchema>;
