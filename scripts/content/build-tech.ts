import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import type {
  Question,
  QuizBank,
  TechSummary,
  TopicSummary,
} from '../../src/app/shared/interfaces/content.interface';
import { buildQuestion } from './build-question';
import type { CodeHighlighter } from './code-highlighter';
import { QUIZ_CONTENT_DIR } from './content.constants';
import { countLevels } from './level-counts';
import { readYaml } from './read-yaml';
import { techMetaSchema, topicFileSchema, type TechMeta } from './schema';
import { assertBadgeContrast, assertQuestion, assertTopicFiles } from './validate';

/** A tech after validation: its metadata, catalog summary and question bank. */
export interface BuiltTech {
  meta: TechMeta;
  summary: TechSummary;
  bank: QuizBank;
}

const toSummary = (
  slug: string,
  meta: TechMeta,
  questions: Question[],
  topics: TopicSummary[],
): TechSummary => ({
  slug,
  name: meta.name,
  description: meta.description,
  area: meta.area,
  badge: meta.badge,
  color: meta.color,
  onColor: meta.onColor,
  questionCount: questions.length,
  levelCounts: countLevels(questions),
  topics,
});

/**
 * Reads, validates and converts every file of one tech.
 *
 * @param slug - Folder name of the tech.
 * @param highlighter - Highlighter for code snippets.
 * @param seenIds - Question ids already used, shared across techs.
 * @returns The built tech.
 */
export const buildTech = async (
  slug: string,
  highlighter: CodeHighlighter,
  seenIds: Set<string>,
): Promise<BuiltTech> => {
  const techDir = join(QUIZ_CONTENT_DIR, slug);
  const metaFile = join(techDir, 'meta.yaml');
  const meta = await readYaml(metaFile, techMetaSchema);
  assertBadgeContrast(metaFile, meta);

  const files = await readdir(techDir);
  const topicFiles = files.filter((file) => file.endsWith('.yaml') && file !== 'meta.yaml');
  assertTopicFiles(techDir, meta, topicFiles);

  const questions: Question[] = [];
  const topics: TopicSummary[] = [];
  for (const topic of meta.topics) {
    const topicFile = join(techDir, `${topic.slug}.yaml`);
    const content = await readYaml(topicFile, topicFileSchema);
    const topicQuestions = content.questions.map((authored) => {
      assertQuestion(topicFile, slug, authored, seenIds);
      return buildQuestion(authored, { tech: slug, topic: topic.slug }, highlighter);
    });
    questions.push(...topicQuestions);
    topics.push({
      ...topic,
      questionCount: topicQuestions.length,
      levelCounts: countLevels(topicQuestions),
    });
  }

  return {
    meta,
    summary: toSummary(slug, meta, questions, topics),
    bank: { tech: slug, questions },
  };
};
