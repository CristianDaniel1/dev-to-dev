import { z } from 'zod';
import {
  PRICINGS,
  RESOURCE_LANGUAGES,
  RESOURCE_TECHS,
  RESOURCE_TYPES,
} from '../../src/app/shared/constants/resource.constants';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be kebab-case');
// Resource texts are shown as plain text, so markdown such as `code` would appear literally.
const sentence = z
  .string()
  .trim()
  .min(1)
  .max(220)
  .refine((text) => !text.includes('`'), 'resource texts are plain text; remove the backticks');

/** Authoring format of `content/resources/categories.yaml`. */
export const categoriesFileSchema = z.strictObject({
  categories: z.array(z.strictObject({ slug, name: sentence, description: sentence })).min(1),
});

/** Authoring format of one resource inside `content/resources/<category>.yaml`. */
export const resourceSchema = z.strictObject({
  id: slug,
  name: z.string().trim().min(1).max(60),
  url: z.url({ protocol: /^https$/ }),
  description: sentence,
  why: sentence,
  type: z.enum(RESOURCE_TYPES),
  pricing: z.enum(PRICINGS),
  languages: z.array(z.enum(RESOURCE_LANGUAGES)).min(1),
  techs: z.array(z.enum(RESOURCE_TECHS)).default([]),
  featured: z.boolean().default(false),
});

/** Authoring format of `content/resources/<category>.yaml`. */
export const resourceFileSchema = z.strictObject({
  resources: z.array(resourceSchema).min(1),
});

/** Authoring format of `content/resources/collections.yaml`. */
export const collectionsFileSchema = z.strictObject({
  collections: z.array(
    z.strictObject({
      slug,
      name: sentence,
      description: sentence,
      items: z.array(z.strictObject({ resource: slug, note: sentence })).min(2),
    }),
  ),
});

export type AuthoredCategories = z.infer<typeof categoriesFileSchema>;
export type AuthoredResource = z.infer<typeof resourceSchema>;
export type AuthoredCollections = z.infer<typeof collectionsFileSchema>;
