import { readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import type { TechSummary } from '../../src/app/shared/interfaces/content.interface';
import type { Glossary } from '../../src/app/shared/interfaces/glossary.interface';
import type {
  LearningPath,
  PathStep,
  StepPractice,
} from '../../src/app/shared/interfaces/path.interface';
import type { Resource } from '../../src/app/shared/interfaces/resource.interface';
import { ContentError } from './content-error';
import { PATH_CONTENT_DIR } from './content.constants';
import { pathFileSchema, type AuthoredPath } from './path-schema';
import { readYaml } from './read-yaml';

/** Published content a learning path may point to. */
export interface PathSources {
  techs: readonly TechSummary[];
  glossary: Glossary;
  resources: readonly Resource[];
}

type AuthoredStep = AuthoredPath['steps'][number];

const findPractice = (
  file: string,
  step: AuthoredStep,
  techs: readonly TechSummary[],
): StepPractice => {
  const [techSlug, topicSlug] = step.topic.split('/');
  const tech = techs.find((candidate) => candidate.slug === techSlug);
  const topic = tech?.topics.find((candidate) => candidate.slug === topicSlug);
  if (!tech || !topic)
    throw new ContentError(`${file}: unknown topic "${step.topic}" in step ${step.id}`);
  return {
    techSlug: tech.slug,
    techName: tech.name,
    topicSlug: topic.slug,
    topicName: topic.name,
    questionCount: topic.questionCount,
  };
};

const toStep = (file: string, step: AuthoredStep, sources: PathSources): PathStep => ({
  id: step.id,
  title: step.title,
  description: step.description,
  practice: findPractice(file, step, sources.techs),
  terms: step.terms.map((slug) => {
    const term = sources.glossary.terms.find((candidate) => candidate.slug === slug);
    if (!term)
      throw new ContentError(`${file}: unknown glossary term "${slug}" in step ${step.id}`);
    return { slug, term: term.term };
  }),
  resources: step.resources.map((id) => {
    const resource = sources.resources.find((candidate) => candidate.id === id);
    if (!resource) throw new ContentError(`${file}: unknown resource "${id}" in step ${step.id}`);
    return { label: resource.name, url: resource.url };
  }),
});

const assertUniqueStepIds = (file: string, path: AuthoredPath): void => {
  const ids = path.steps.map((step) => step.id);
  const duplicate = ids.find((id, index) => ids.indexOf(id) !== index);
  if (duplicate) throw new ContentError(`${file}: duplicate step id "${duplicate}"`);
};

/**
 * Reads, validates and converts the learning paths: every quiz topic, glossary term and resource
 * a step points to must exist.
 *
 * @param sources - Published techs, glossary and resources.
 * @returns The paths in display order.
 */
export const buildPaths = async (sources: PathSources): Promise<LearningPath[]> => {
  const files = (await readdir(PATH_CONTENT_DIR)).filter((file) => file.endsWith('.yaml'));
  const authored: { path: AuthoredPath; file: string }[] = [];
  for (const fileName of files) {
    const file = join(PATH_CONTENT_DIR, fileName);
    const path = await readYaml(file, pathFileSchema);
    if (path.slug !== basename(fileName, '.yaml')) {
      throw new ContentError(`${file}: the slug must match the file name`);
    }
    assertUniqueStepIds(file, path);
    authored.push({ path, file });
  }
  return authored
    .sort((left, right) => left.path.order - right.path.order)
    .map(({ path, file }) => ({
      slug: path.slug,
      name: path.name,
      description: path.description,
      level: path.level,
      steps: path.steps.map((step) => toStep(file, step, sources)),
    }));
};
