import type { QuizBank, TechSummary } from '../../src/app/shared/interfaces/content.interface';
import type {
  ResourceIndex,
  ResourceLibrary,
} from '../../src/app/shared/interfaces/resource.interface';
import type { Glossary } from '../../src/app/shared/interfaces/glossary.interface';
import type { LearningPath } from '../../src/app/shared/interfaces/path.interface';
import type { SearchEntry, SearchKind } from '../../src/app/shared/interfaces/search.interface';
import { normalizeText } from '../../src/app/shared/lib/normalize-text';

const ENTITIES: Readonly<Record<string, string>> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

const toPlainText = (html: string): string =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&(amp|lt|gt|quot|#39);/g, (entity) => ENTITIES[entity] ?? entity);

const entry = (
  kind: SearchKind,
  fields: Omit<SearchEntry, 'kind' | 'titleTerms' | 'terms'>,
  keywords = '',
): SearchEntry => ({
  kind,
  ...fields,
  titleTerms: normalizeText(fields.title),
  terms: normalizeText(`${fields.title} ${fields.subtitle} ${keywords}`),
});

/** Content the search index is built from. */
export interface SearchSources {
  techs: readonly TechSummary[];
  banks: readonly QuizBank[];
  resourceIndex: ResourceIndex;
  resourceLibrary: ResourceLibrary;
  glossary: Glossary;
  paths: readonly LearningPath[];
}

/**
 * Builds the entries of the command palette: techs, learning paths, topics, glossary terms, questions, resource
 * categories, collections and resources. Static pages are added by the app.
 *
 * @param sources - Published content.
 * @returns Every search entry.
 */
export const buildSearchIndex = (sources: SearchSources): SearchEntry[] => {
  const techName = new Map(sources.techs.map((tech) => [tech.slug, tech.name]));
  const categoryName = new Map(
    sources.resourceIndex.categories.map((category) => [category.slug, category.name]),
  );
  return [
    ...sources.techs.map((tech) =>
      entry('tech', {
        title: `Quiz de ${tech.name}`,
        subtitle: tech.description,
        link: `/quizzes/${tech.slug}`,
      }),
    ),
    ...sources.techs.flatMap((tech) =>
      tech.topics.map((topic) =>
        entry(
          'topic',
          {
            title: topic.name,
            subtitle: `Tópico de ${tech.name}`,
            link: `/quizzes/${tech.slug}/praticar`,
            queryParams: { topico: topic.slug },
          },
          topic.description,
        ),
      ),
    ),
    ...sources.paths.map((path) =>
      entry(
        'path',
        { title: path.name, subtitle: path.description, link: `/trilhas/${path.slug}` },
        path.steps.map((step) => step.title).join(' '),
      ),
    ),
    ...sources.glossary.terms.map((term) =>
      entry(
        'term',
        { title: term.term, subtitle: term.shortText, link: `/glossario/${term.slug}` },
        term.aka.join(' '),
      ),
    ),
    ...sources.resourceIndex.categories.map((category) =>
      entry('category', {
        title: category.name,
        subtitle: category.description,
        link: `/recursos/${category.slug}`,
      }),
    ),
    ...sources.resourceIndex.collections.map((collection) =>
      entry('collection', {
        title: collection.name,
        subtitle: collection.description,
        link: `/recursos/colecoes/${collection.slug}`,
      }),
    ),
    ...sources.resourceLibrary.resources.map((resource) =>
      entry(
        'resource',
        {
          title: resource.name,
          subtitle: resource.domain,
          link: resource.url,
          external: true,
        },
        `${categoryName.get(resource.category) ?? ''} ${resource.description} ${resource.techs.join(' ')}`,
      ),
    ),
    ...sources.banks.flatMap((bank) =>
      bank.questions.map((question) =>
        entry('question', {
          title: toPlainText(question.promptHtml),
          subtitle: `Pergunta de ${techName.get(bank.tech) ?? bank.tech}`,
          link: `/quizzes/${bank.tech}/praticar`,
          queryParams: { ids: question.id },
        }),
      ),
    ),
  ];
};
