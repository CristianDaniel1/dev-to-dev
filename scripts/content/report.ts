import type { ResourceIndex } from '../../src/app/shared/interfaces/resource.interface';
import type { Glossary } from '../../src/app/shared/interfaces/glossary.interface';
import { LEVELS } from '../../src/app/shared/constants/content.constants';
import type { TechSummary } from '../../src/app/shared/interfaces/content.interface';

const reportRow = (tech: TechSummary): string => {
  const levels = LEVELS.map((level) => `${level.charAt(0)}:${tech.levelCounts[level]}`).join(' ');
  const count = String(tech.questionCount).padStart(3);
  return `  ${tech.slug.padEnd(12)} ${count} questions  ${levels}  (${tech.topics.length} topics)`;
};

/**
 * Prints how many questions each published tech has, by level and topic count.
 *
 * @param summaries - Published techs.
 * @param drafts - Slugs of the techs skipped as drafts.
 */
export const printReport = (summaries: readonly TechSummary[], drafts: readonly string[]): void => {
  const total = summaries.reduce((sum, tech) => sum + tech.questionCount, 0);
  console.log(`content: ${total} questions in ${summaries.length} techs`);
  console.log(summaries.map(reportRow).join('\n'));
  if (drafts.length) console.log(`  drafts skipped: ${drafts.join(', ')}`);
};

/**
 * Prints how many resources each category has and how many collections exist.
 *
 * @param index - Built resource index.
 */
export const printResourceReport = (index: ResourceIndex): void => {
  const total = index.categories.reduce((sum, category) => sum + category.resourceCount, 0);
  console.log(
    `resources: ${total} in ${index.categories.length} categories, ${index.collections.length} collections`,
  );
  const rows = index.categories.map(
    (category) => `  ${category.slug.padEnd(22)} ${String(category.resourceCount).padStart(3)}`,
  );
  console.log(rows.join('\n'));
};

/**
 * Prints how many glossary terms each group has.
 *
 * @param glossary - Built glossary.
 */
export const printGlossaryReport = (glossary: Glossary): void => {
  const groups = glossary.groups.map((group) => `${group.slug} ${group.termCount}`).join(', ');
  console.log(`glossary: ${glossary.terms.length} terms (${groups})`);
};
