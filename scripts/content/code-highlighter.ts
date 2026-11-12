import { createHighlighter, type Highlighter } from 'shiki';
import { transformerStyleToClass, type ShikiTransformerStyleToClass } from '@shikijs/transformers';
import { CODE_LANGS, HIGHLIGHT_CLASS_PREFIX, HIGHLIGHT_THEMES } from './content.constants';

/** Highlights code into class-only HTML and collects the matching CSS. */
export class CodeHighlighter {
  private constructor(
    private readonly highlighter: Highlighter,
    private readonly styleToClass: ShikiTransformerStyleToClass,
  ) {}

  /**
   * Loads the themes and languages.
   *
   * @returns A ready highlighter.
   */
  static async create(): Promise<CodeHighlighter> {
    const highlighter = await createHighlighter({
      themes: Object.values(HIGHLIGHT_THEMES),
      langs: CODE_LANGS,
    });
    return new CodeHighlighter(
      highlighter,
      transformerStyleToClass({ classPrefix: HIGHLIGHT_CLASS_PREFIX }),
    );
  }

  /**
   * Highlights a code snippet with light and dark colors as CSS variables.
   *
   * @param source - Code to highlight.
   * @param lang - Language of the code.
   * @returns HTML without inline styles.
   */
  highlight(source: string, lang: string): string {
    return this.highlighter.codeToHtml(source.trimEnd(), {
      lang,
      themes: HIGHLIGHT_THEMES,
      defaultColor: false,
      transformers: [this.styleToClass],
    });
  }

  /**
   * Returns the CSS for every class created so far.
   *
   * @returns The stylesheet text.
   */
  css(): string {
    return this.styleToClass.getCSS();
  }

  /** Releases the highlighter resources. */
  dispose(): void {
    this.highlighter.dispose();
  }
}
