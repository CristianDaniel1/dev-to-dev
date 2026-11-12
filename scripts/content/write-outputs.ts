import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type {
  Catalog,
  QuizBank,
  TechSummary,
} from '../../src/app/shared/interfaces/content.interface';
import { GENERATED_CSS_HEADER, GENERATED_DIR, GENERATED_TS_HEADER } from './content.constants';

const catalogModule = (catalog: Catalog): string =>
  `${GENERATED_TS_HEADER}import type { Catalog } from '../interfaces/content.interface';\n\nexport const CATALOG: Catalog = ${JSON.stringify(catalog, null, 2)};\n`;

const bankModule = (bank: QuizBank): string =>
  `${GENERATED_TS_HEADER}import type { QuizBank } from '../../interfaces/content.interface';\n\nconst bank: QuizBank = ${JSON.stringify(bank)};\n\nexport default bank;\n`;

const loadersModule = (banks: readonly QuizBank[]): string => {
  const entries = banks
    .map(
      (bank) =>
        `  '${bank.tech}': () => import('./quizzes/${bank.tech}').then((module) => module.default),`,
    )
    .join('\n');
  return `${GENERATED_TS_HEADER}import type { QuizBank } from '../interfaces/content.interface';\n\nexport const QUIZ_LOADERS: Readonly<Record<string, () => Promise<QuizBank>>> = {\n${entries}\n};\n`;
};

/**
 * Replaces the generated folder with the catalog, one module per question bank, the loader
 * registry and the code highlight stylesheet.
 *
 * @param summaries - Published techs, in catalog order.
 * @param banks - Question bank of each published tech.
 * @param highlightCss - CSS collected by the code highlighter.
 */
export const writeOutputs = async (
  summaries: TechSummary[],
  banks: QuizBank[],
  highlightCss: string,
): Promise<void> => {
  await rm(GENERATED_DIR, { recursive: true, force: true });
  await mkdir(join(GENERATED_DIR, 'quizzes'), { recursive: true });

  await writeFile(join(GENERATED_DIR, 'catalog.ts'), catalogModule({ techs: summaries }));
  for (const bank of banks) {
    await writeFile(join(GENERATED_DIR, 'quizzes', `${bank.tech}.ts`), bankModule(bank));
  }
  await writeFile(join(GENERATED_DIR, 'quiz-loaders.ts'), loadersModule(banks));
  await writeFile(
    join(GENERATED_DIR, 'code-highlight.css'),
    `${GENERATED_CSS_HEADER}${highlightCss}\n`,
  );
};
