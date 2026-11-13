export interface DemoOption {
  id: string;
  text: string;
  explanation: string;
}

export interface DemoQuestion {
  tech: string;
  /** Slug of the tech, so its quiz tab shows in front. */
  techSlug: string;
  level: string;
  prompt: string;
  code: string;
  options: readonly DemoOption[];
  correctId: string;
  takeaway: string;
}
