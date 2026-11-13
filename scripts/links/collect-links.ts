import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { buildResources } from '../content/build-resources';
import { QUIZ_CONTENT_DIR } from '../content/content.constants';
import { readYaml } from '../content/read-yaml';
import { techMetaSchema, topicFileSchema } from '../content/schema';

/** A URL found in the content, with where it came from. */
export interface ContentLink {
  url: string;
  source: string;
}

const collectQuizLinks = async (): Promise<ContentLink[]> => {
  const links: ContentLink[] = [];
  const entries = await readdir(QUIZ_CONTENT_DIR, { withFileTypes: true });
  for (const entry of entries.filter((candidate) => candidate.isDirectory())) {
    const techDir = join(QUIZ_CONTENT_DIR, entry.name);
    const meta = await readYaml(join(techDir, 'meta.yaml'), techMetaSchema);
    for (const topic of meta.topics) {
      links.push(
        ...topic.links.map((link) => ({ url: link.url, source: `${entry.name}/${topic.slug}` })),
      );
      const { questions } = await readYaml(join(techDir, `${topic.slug}.yaml`), topicFileSchema);
      for (const question of questions) {
        links.push(
          ...(question.links ?? []).map((link) => ({ url: link.url, source: question.id })),
        );
      }
    }
  }
  return links;
};

/**
 * Gathers every external URL of the content: resources and reading links.
 *
 * @returns The links, one entry per URL (the first source found).
 */
export const collectLinks = async (): Promise<ContentLink[]> => {
  const { library } = await buildResources();
  const resourceLinks = library.resources.map((resource) => ({
    url: resource.url,
    source: `resource ${resource.id}`,
  }));
  const all = [...resourceLinks, ...(await collectQuizLinks())];
  return [...new Map(all.map((link) => [link.url, link])).values()];
};
