import type { TechSummary } from '@/shared/interfaces/content.interface';
import { DEMO_QUESTION } from '../data/demo-question.data';
import { sheetFields } from './sheet-fields';

const TECHS = [{ questionCount: 30 }, { questionCount: 31 }] as TechSummary[];

describe('sheetFields', () => {
  it('names the sample exam and counts every published question', () => {
    const fields = sheetFields(DEMO_QUESTION, TECHS);

    expect(fields[0]).toEqual({ label: 'Prova', value: 'JavaScript · Intermediário' });
    expect(fields.find((field) => field.label === 'Questões')?.value).toBe('61, em 2 tecnologias');
  });
});
