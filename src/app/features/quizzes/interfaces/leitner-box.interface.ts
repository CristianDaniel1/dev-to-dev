/** One Leitner box as shown to the user. */
export interface LeitnerBoxView {
  box: number;
  /** Days until a question in this box comes back. */
  days: number;
  /** Questions in the box, or `null` when only explaining the system. */
  count: number | null;
}
