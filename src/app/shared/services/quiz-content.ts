import { Injectable } from '@angular/core';
import { CATALOG } from '../generated/catalog';
import { QUIZ_LOADERS } from '../generated/quiz-loaders';
import type { Catalog, Question, QuizBank } from '../interfaces/content.interface';

/** Access to the generated quiz content. The catalog is bundled; each question bank is a lazy chunk. */
@Injectable({ providedIn: 'root' })
export class QuizContent {
  readonly catalog: Catalog = CATALOG;

  /**
   * Loads the question bank of a tech.
   *
   * @param slug - Tech slug.
   * @returns The bank, or `null` when the tech has no bank.
   */
  async loadBank(slug: string): Promise<QuizBank | null> {
    const loader = QUIZ_LOADERS[slug];
    return loader ? loader() : null;
  }

  /**
   * Loads and merges the questions of several techs.
   *
   * @param slugs - Tech slugs; unknown ones are skipped.
   * @returns Every question of those techs, in the order of the slugs.
   */
  async loadQuestions(slugs: readonly string[]): Promise<Question[]> {
    const banks = await Promise.all(slugs.map((slug) => this.loadBank(slug)));
    return banks.flatMap((bank) => bank?.questions ?? []);
  }
}
