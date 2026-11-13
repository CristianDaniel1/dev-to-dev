import type { ConfidenceChoice, ModeChoice, ResultBand } from '../interfaces/choice.interface';

/** Confidence buttons, from most to least sure; each one also submits the answer. */
export const CONFIDENCE_CHOICES: readonly ConfidenceChoice[] = [
  { value: 'sure', label: 'Tenho certeza' },
  { value: 'unsure', label: 'Acho que sim' },
  { value: 'guess', label: 'Chutei' },
];

/** Result headline by score, from the highest band down. */
export const RESULT_BANDS: readonly ResultBand[] = [
  { minPercentage: 100, heading: 'Gabaritou.' },
  { minPercentage: 70, heading: 'Mandou bem.' },
  { minPercentage: 40, heading: 'Está no caminho.' },
  { minPercentage: 0, heading: 'Hora de revisar.' },
];

/** Practice mode, the one selected when the setup form opens. */
export const PRACTICE_MODE_CHOICE: ModeChoice = {
  value: 'practice',
  label: 'Prática',
  description: 'Sem cronômetro, com explicação a cada resposta.',
  action: 'Começar a praticar',
};

/** Session modes of a tech, as offered in the setup form. */
export const MODE_CHOICES: readonly ModeChoice[] = [
  PRACTICE_MODE_CHOICE,
  {
    value: 'exam',
    label: 'Simulado',
    description: 'Correção só no fim, com cronômetro opcional.',
    action: 'Começar o simulado',
  },
];

/** Session sizes offered in the setup form; `null` means every matching question. */
export const SESSION_SIZES: readonly (number | null)[] = [5, 10, 20, null];

/** Keys that pick an option by position (letters; digits 1–6 work too). */
export const OPTION_KEYS: readonly string[] = ['a', 'b', 'c', 'd', 'e', 'f'];
