import { basename, join } from 'node:path';
import { ContentError } from './content-error';
import { CODE_LANGS, MIN_CONTRAST_RATIO } from './content.constants';
import { contrastRatio } from './contrast';
import type { AuthoredQuestion, TechMeta } from './schema';

/**
 * Fails when the badge text color does not have enough contrast on the brand color.
 *
 * @param metaFile - Path of the meta file, for the message.
 * @param meta - Validated tech metadata.
 */
export const assertBadgeContrast = (metaFile: string, meta: TechMeta): void => {
  const ratio = contrastRatio(meta.color, meta.onColor);
  if (ratio >= MIN_CONTRAST_RATIO) return;
  throw new ContentError(
    `${metaFile}: onColor on color has contrast ${ratio.toFixed(2)}:1, needs ${MIN_CONTRAST_RATIO}:1`,
  );
};

/**
 * Fails when topic files and the topics declared in meta.yaml do not match one to one.
 *
 * @param techDir - Folder of the tech.
 * @param meta - Validated tech metadata.
 * @param topicFiles - YAML file names in the folder, without meta.yaml.
 */
export const assertTopicFiles = (techDir: string, meta: TechMeta, topicFiles: string[]): void => {
  const declared = new Set(meta.topics.map((topic) => topic.slug));
  const present = new Set(topicFiles.map((file) => basename(file, '.yaml')));
  for (const slug of present) {
    if (!declared.has(slug)) {
      throw new ContentError(
        `${join(techDir, `${slug}.yaml`)}: topic is not declared in meta.yaml`,
      );
    }
  }
  for (const slug of declared) {
    if (!present.has(slug)) {
      throw new ContentError(`${join(techDir, `${slug}.yaml`)}: declared in meta.yaml but missing`);
    }
  }
};

/**
 * Fails on a malformed or duplicate question id, or an unsupported code language, and records
 * the id as seen.
 *
 * @param file - Topic file, for the message.
 * @param tech - Tech slug the id must start with.
 * @param question - Validated question.
 * @param seenIds - Ids already used in any tech.
 */
export const assertQuestion = (
  file: string,
  tech: string,
  question: AuthoredQuestion,
  seenIds: Set<string>,
): void => {
  if (!question.id.startsWith(`${tech}-`)) {
    throw new ContentError(`${file}: id "${question.id}" must start with "${tech}-"`);
  }
  if (seenIds.has(question.id)) {
    throw new ContentError(`${file}: duplicate id "${question.id}"`);
  }
  if (question.code && !CODE_LANGS.includes(question.code.lang)) {
    throw new ContentError(
      `${file}: unsupported code lang "${question.code.lang}" in ${question.id}`,
    );
  }
  seenIds.add(question.id);
};
