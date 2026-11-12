const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escapeHtml = (text: string): string =>
  text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);

const isCodeSpan = (segment: string): boolean =>
  segment.length > 1 && segment.startsWith('`') && segment.endsWith('`');

const segmentToHtml = (segment: string): string =>
  isCodeSpan(segment)
    ? `<code>${escapeHtml(segment.slice(1, -1))}</code>`
    : escapeHtml(segment).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

/**
 * Converts the markdown subset used in content (`code` and **bold**) to HTML. Everything else is
 * escaped, so the output is safe for Angular's `[innerHTML]`.
 *
 * @param markdown - Authored text.
 * @returns Escaped HTML with `<code>` and `<strong>` only.
 */
export const inlineMarkdownToHtml = (markdown: string): string =>
  markdown
    .trim()
    .split(/(`[^`]+`)/g)
    .map(segmentToHtml)
    .join('');
