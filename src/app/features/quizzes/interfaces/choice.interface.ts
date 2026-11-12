import type { Confidence } from '@/core/interfaces/progress.interface';

export interface ConfidenceChoice {
  value: Confidence;
  label: string;
}

export interface ResultBand {
  minPercentage: number;
  heading: string;
}

export interface ModeChoice {
  value: 'practice' | 'exam';
  label: string;
  description: string;
  /** Label of the start button. */
  action: string;
}
