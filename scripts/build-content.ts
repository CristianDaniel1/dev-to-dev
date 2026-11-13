import { readdir } from 'node:fs/promises';
import { buildGlossary } from './content/build-glossary';
import { buildPaths } from './content/build-paths';
import { buildResources } from './content/build-resources';
import { buildSearchIndex } from './content/build-search-index';
import { buildTech, type BuiltTech } from './content/build-tech';
import { CodeHighlighter } from './content/code-highlighter';
import { ContentError } from './content/content-error';
import { QUIZ_CONTENT_DIR } from './content/content.constants';
import {
  printGlossaryReport,
  printPathReport,
  printReport,
  printResourceReport,
} from './content/report';
import { writeOutputs } from './content/write-outputs';

const listTechSlugs = async (): Promise<string[]> => {
  const entries = await readdir(QUIZ_CONTENT_DIR, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
};

const buildAll = async (highlighter: CodeHighlighter): Promise<BuiltTech[]> => {
  const seenIds = new Set<string>();
  const slugs = await listTechSlugs();
  const built: BuiltTech[] = [];
  for (const slug of slugs) {
    const tech = await buildTech(slug, highlighter, seenIds);
    built.push(tech);
  }
  return built;
};

const main = async (): Promise<void> => {
  const highlighter = await CodeHighlighter.create();
  try {
    const built = await buildAll(highlighter);
    const published = built
      .filter((tech) => !tech.meta.draft)
      .sort((left, right) => left.meta.order - right.meta.order);
    const drafts = built.filter((tech) => tech.meta.draft).map((tech) => tech.summary.slug);
    const summaries = published.map((tech) => tech.summary);

    const resources = await buildResources();
    const glossary = await buildGlossary(
      { techs: summaries, resources: resources.library.resources },
      highlighter,
    );
    const paths = await buildPaths({
      techs: summaries,
      glossary,
      resources: resources.library.resources,
    });

    const banks = published.map((tech) => tech.bank);
    await writeOutputs({
      summaries,
      banks,
      highlightCss: highlighter.css(),
      resourceIndex: resources.index,
      resourceLibrary: resources.library,
      glossary,
      paths,
      searchIndex: buildSearchIndex({
        techs: summaries,
        banks,
        resourceIndex: resources.index,
        resourceLibrary: resources.library,
        glossary,
        paths,
      }),
    });
    printReport(summaries, drafts);
    printResourceReport(resources.index);
    printGlossaryReport(glossary);
    printPathReport(paths);
  } finally {
    highlighter.dispose();
  }
};

main().catch((error: unknown) => {
  console.error(error instanceof ContentError ? `content error: ${error.message}` : error);
  process.exit(1);
});
