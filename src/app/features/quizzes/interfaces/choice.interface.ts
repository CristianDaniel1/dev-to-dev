import type { Confidence } from '@/core/interfaces/progress.interface';

export interface ConfidenceChoice {
  value: Confidence;
  label: string;
}

export interface ResultBand {
  minPercentage: number;
  heading: string;
}
