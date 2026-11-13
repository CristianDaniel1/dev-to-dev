import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type {
  Catalog,
  QuizBank,
  TechSummary,
} from '../../src/app/shared/interfaces/content.interface';
import type {
  ResourceIndex,
  ResourceLibrary,
} from '../../src/app/shared/interfaces/resource.interface';
import type { Glossary } from '../../src/app/shared/interfaces/glossary.interface';
import type { LearningPath } from '../../src/app/shared/interfaces/path.interface';
import type { SearchEntry } from '../../src/app/shared/interfaces/search.interface';
import { GENERATED_CSS_HEADER, GENERATED_DIR, GENERATED_TS_HEADER } from './content.constants';

const catalogModule = (catalog: Catalog): string =>
  `${GENERATED_TS_HEADER}import type { Catalog } from '../interfaces/content.interface';\n\nexport const CATALOG: Catalog = ${JSON.stringify(catalog, null, 2)};\n`;

const bankModule = (bank: QuizBank): string =>
  `${GENERATED_TS_HEADER}import type { QuizBank } from '../../interfaces/content.interface';\n\nconst bank: QuizBank = ${JSON.stringify(bank)};\n\nexport default bank;\n`;

const resourceIndexModule = (index: ResourceIndex): string =>
  `${GENERATED_TS_HEADER}import type { ResourceIndex } from '../interfaces/resource.interface';

export const RESOURCE_INDEX: ResourceIndex = ${JSON.stringify(index, null, 2)};
`;

const resourceLibraryModule = (library: ResourceLibrary): string =>
  `${GENERATED_TS_HEADER}import type { ResourceLibrary } from '../interfaces/resource.interface';

export const RESOURCE_LIBRARY: ResourceLibrary = ${JSON.stringify(library)};
`;

const glossaryModule = (glossary: Glossary): string =>
  `${GENERATED_TS_HEADER}import type { Glossary } from '../interfaces/glossary.interface';

export const GLOSSARY: Glossary = ${JSON.stringify(glossary)};
`;

const glossaryGroupsModule = (glossary: Glossary): string =>
  `${GENERATED_TS_HEADER}import type { GlossaryGroup } from '../interfaces/glossary.interface';

export const GLOSSARY_GROUPS: readonly GlossaryGroup[] = ${JSON.stringify(glossary.groups, null, 2)};
`;

const pathsModule = (paths: readonly LearningPath[]): string =>
  `${GENERATED_TS_HEADER}import type { LearningPath } from '../interfaces/path.interface';

export const LEARNING_PATHS: readonly LearningPath[] = ${JSON.stringify(paths)};
`;

const searchIndexModule = (entries: readonly SearchEntry[]): string =>
  `${GENERATED_TS_HEADER}import type { SearchEntry } from '../interfaces/search.interface';\n\nexport const SEARCH_INDEX: readonly SearchEntry[] = ${JSON.stringify(entries)};\n`;

const loadersModule = (banks: readonly QuizBank[]): string => {
  const entries = banks
    .map(
      (bank) =>
        `  '${bank.tech}': () => import('./quizzes/${bank.tech}').then((module) => module.default),`,
    )
    .join('\n');
  return `${GENERATED_TS_HEADER}import type { QuizBank } from '../interfaces/content.interface';\n\nexport const QUIZ_LOADERS: Readonly<Record<string, () => Promise<QuizBank>>> = {\n${entries}\n};\n`;
};

/** Everything the content build writes into the generated folder. */
export interface ContentOutputs {
  /** Published techs, in catalog order. */
  summaries: TechSummary[];
  /** Question bank of each published tech. */
  banks: QuizBank[];
  /** CSS collected by the code highlighter. */
  highlightCss: string;
  resourceIndex: ResourceIndex;
  resourceLibrary: ResourceLibrary;
  glossary: Glossary;
  paths: readonly LearningPath[];
  /** Entries of the command palette. */
  searchIndex: readonly SearchEntry[];
}

/**
 * Replaces the generated folder with the quiz catalog, one module per question bank, the loader
 * registry, the resource index and library, the glossary, the learning paths, the search index and the code highlight
 * stylesheet.
 *
 * @param outputs - Built content.
 */
export const writeOutputs = async (outputs: ContentOutputs): Promise<void> => {
  await rm(GENERATED_DIR, { recursive: true, force: true });
  await mkdir(join(GENERATED_DIR, 'quizzes'), { recursive: true });

  await writeFile(join(GENERATED_DIR, 'catalog.ts'), catalogModule({ techs: outputs.summaries }));
  for (const bank of outputs.banks) {
    await writeFile(join(GENERATED_DIR, 'quizzes', `${bank.tech}.ts`), bankModule(bank));
  }
  await writeFile(join(GENERATED_DIR, 'quiz-loaders.ts'), loadersModule(outputs.banks));
  await writeFile(
    join(GENERATED_DIR, 'resource-index.ts'),
    resourceIndexModule(outputs.resourceIndex),
  );
  await writeFile(
    join(GENERATED_DIR, 'resource-library.ts'),
    resourceLibraryModule(outputs.resourceLibrary),
  );
  await writeFile(join(GENERATED_DIR, 'glossary.ts'), glossaryModule(outputs.glossary));
  await writeFile(
    join(GENERATED_DIR, 'glossary-groups.ts'),
    glossaryGroupsModule(outputs.glossary),
  );
  await writeFile(join(GENERATED_DIR, 'paths.ts'), pathsModule(outputs.paths));
  await writeFile(join(GENERATED_DIR, 'search-index.ts'), searchIndexModule(outputs.searchIndex));
  await writeFile(
    join(GENERATED_DIR, 'code-highlight.css'),
    `${GENERATED_CSS_HEADER}${outputs.highlightCss}
`,
  );
};
