import { readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import type { TechSummary } from '../../src/app/shared/interfaces/content.interface';
import type {
  Glossary,
  GlossaryGroup,
  GlossaryTerm,
  PracticeTopic,
} from '../../src/app/shared/interfaces/glossary.interface';
import type { Resource } from '../../src/app/shared/interfaces/resource.interface';
import type { CodeHighlighter } from './code-highlighter';
import { ContentError } from './content-error';
import {
  CODE_LANGS,
  GLOSSARY_CONTENT_DIR,
  GLOSSARY_GENERAL_GROUP,
  GLOSSARY_GENERAL_GROUP_NAME,
} from './content.constants';
import { glossaryFileSchema, type AuthoredTerm } from './glossary-schema';
import { inlineMarkdownToHtml } from './inline-markdown';
import { readYaml } from './read-yaml';

/** Published content a glossary term may point to. */
export interface GlossarySources {
  techs: readonly TechSummary[];
  resources: readonly Resource[];
}

interface AuthoredEntry {
  file: string;
  group: string;
  authored: AuthoredTerm;
}

const byTerm = (left: { term: string }, right: { term: string }): number =>
  left.term.localeCompare(right.term, 'pt-BR', { sensitivity: 'base' });

const readEntries = async (groupNames: ReadonlyMap<string, string>): Promise<AuthoredEntry[]> => {
  const files = (await readdir(GLOSSARY_CONTENT_DIR)).filter((file) => file.endsWith('.yaml'));
  const entries: AuthoredEntry[] = [];
  for (const fileName of files) {
    const file = join(GLOSSARY_CONTENT_DIR, fileName);
    const group = basename(fileName, '.yaml');
    if (!groupNames.has(group)) {
      throw new ContentError(
        `${file}: the file name must be a published tech or "${GLOSSARY_GENERAL_GROUP}"`,
      );
    }
    const { terms } = await readYaml(file, glossaryFileSchema);
    entries.push(...terms.map((authored) => ({ file, group, authored })));
  }
  return entries;
};

const findPractice = (entry: AuthoredEntry, techs: readonly TechSummary[]): PracticeTopic[] =>
  entry.authored.topics.map((reference) => {
    const [techSlug, topicSlug] = reference.split('/');
    const tech = techs.find((candidate) => candidate.slug === techSlug);
    const topic = tech?.topics.find((candidate) => candidate.slug === topicSlug);
    if (!tech || !topic) {
      throw new ContentError(
        `${entry.file}: unknown topic "${reference}" in ${entry.authored.slug}`,
      );
    }
    return {
      techSlug: tech.slug,
      techName: tech.name,
      topicSlug: topic.slug,
      topicName: topic.name,
    };
  });

const assertEntry = (
  entry: AuthoredEntry,
  slugs: ReadonlySet<string>,
  resourceIds: ReadonlySet<string>,
): void => {
  const { file, authored } = entry;
  for (const related of authored.related) {
    if (related === authored.slug || !slugs.has(related)) {
      throw new ContentError(`${file}: ${authored.slug} has an invalid related term "${related}"`);
    }
  }
  for (const resource of authored.resources) {
    if (!resourceIds.has(resource)) {
      throw new ContentError(`${file}: ${authored.slug} points to unknown resource "${resource}"`);
    }
  }
  if (authored.code && !CODE_LANGS.includes(authored.code.lang)) {
    throw new ContentError(
      `${file}: unsupported code lang "${authored.code.lang}" in ${authored.slug}`,
    );
  }
};

const assertUniqueSlugs = (entries: readonly AuthoredEntry[]): Set<string> => {
  const slugs = new Set<string>();
  for (const { file, authored } of entries) {
    if (slugs.has(authored.slug))
      throw new ContentError(`${file}: duplicate term "${authored.slug}"`);
    slugs.add(authored.slug);
  }
  return slugs;
};

const toTerm = (
  entry: AuthoredEntry,
  sources: GlossarySources,
  termNames: ReadonlyMap<string, string>,
  highlighter: CodeHighlighter,
): GlossaryTerm => {
  const { authored } = entry;
  const term: GlossaryTerm = {
    slug: authored.slug,
    term: authored.term,
    aka: authored.aka,
    group: entry.group,
    shortHtml: inlineMarkdownToHtml(authored.short),
    shortText: authored.short.replaceAll('`', ''),
    bodyHtml: authored.body
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map(inlineMarkdownToHtml),
    related: authored.related.map((slug) => ({ slug, term: termNames.get(slug) ?? slug })),
    practice: findPractice(entry, sources.techs),
    resources: authored.resources.flatMap((id) => {
      const resource = sources.resources.find((candidate) => candidate.id === id);
      return resource ? [{ label: resource.name, url: resource.url }] : [];
    }),
  };
  if (authored.code) {
    term.code = {
      lang: authored.code.lang,
      html: highlighter.highlight(authored.code.source, authored.code.lang),
    };
  }
  return term;
};

/**
 * Reads, validates and converts the glossary: every related term, quiz topic and resource a term
 * points to must exist.
 *
 * @param sources - Published techs and resources.
 * @param highlighter - Highlighter for the optional code examples.
 * @returns The groups and the terms in alphabetical order.
 */
export const buildGlossary = async (
  sources: GlossarySources,
  highlighter: CodeHighlighter,
): Promise<Glossary> => {
  const groupNames = new Map<string, string>([
    ...sources.techs.map((tech): [string, string] => [tech.slug, tech.name]),
    [GLOSSARY_GENERAL_GROUP, GLOSSARY_GENERAL_GROUP_NAME],
  ]);
  const entries = await readEntries(groupNames);
  const slugs = assertUniqueSlugs(entries);
  const resourceIds = new Set(sources.resources.map((resource) => resource.id));
  entries.forEach((entry) => assertEntry(entry, slugs, resourceIds));

  const termNames = new Map(entries.map(({ authored }) => [authored.slug, authored.term]));
  const terms = entries.map((entry) => toTerm(entry, sources, termNames, highlighter)).sort(byTerm);
  const groups: GlossaryGroup[] = [...groupNames]
    .map(([slug, name]) => ({
      slug,
      name,
      termCount: terms.filter((term) => term.group === slug).length,
    }))
    .filter((group) => group.termCount > 0);
  return { groups, terms };
};
