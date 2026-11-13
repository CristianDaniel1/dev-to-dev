import type { TechSummary } from '@/shared/interfaces/content.interface';
import { HERO_SHEET_CLASS, HERO_SHEET_PASSING_GRADE } from '../data/home-content.data';
import type { DemoQuestion } from '../interfaces/demo-question.interface';
import type { SheetField } from '../interfaces/sheet-field.interface';

/**
 * Fills the header fields of the hero answer sheet.
 *
 * @param question - Sample question printed on the sheet.
 * @param techs - Published techs, to count the questions.
 * @returns The fields in reading order.
 */
export const sheetFields = (
  question: DemoQuestion,
  techs: readonly TechSummary[],
): SheetField[] => {
  const questionCount = techs.reduce((total, tech) => total + tech.questionCount, 0);
  return [
    { label: 'Prova', value: `${question.tech} · ${question.level}` },
    { label: 'Turma', value: HERO_SHEET_CLASS },
    { label: 'Questões', value: `${questionCount}, em ${techs.length} tecnologias` },
    { label: 'Nota mínima', value: HERO_SHEET_PASSING_GRADE },
  ];
};
