import type { Question } from '../../src/app/shared/interfaces/content.interface';
import type { CodeHighlighter } from './code-highlighter';
import { OPTION_IDS } from './content.constants';
import { inlineMarkdownToHtml } from './inline-markdown';
import type { AuthoredQuestion } from './schema';

/** Where an authored question belongs. */
export interface QuestionContext {
  tech: string;
  topic: string;
}

/**
 * Converts an authored question into the shape the app consumes.
 *
 * @param authored - Validated question from YAML.
 * @param context - Tech and topic of the question.
 * @param highlighter - Highlighter for the optional code snippet.
 * @returns The question with HTML fields and option ids.
 */
export const buildQuestion = (
  authored: AuthoredQuestion,
  context: QuestionContext,
  highlighter: CodeHighlighter,
): Question => {
  const options = authored.options.map((option, index) => ({
    id: OPTION_IDS.charAt(index),
    html: inlineMarkdownToHtml(option.text),
    explanationHtml: inlineMarkdownToHtml(option.explanation),
  }));
  const correct = options
    .filter((_, index) => authored.options[index]?.correct)
    .map((option) => option.id);

  const question: Question = {
    id: authored.id,
    tech: context.tech,
    topic: context.topic,
    level: authored.level,
    kind: correct.length > 1 ? 'multiple' : 'single',
    promptHtml: inlineMarkdownToHtml(authored.prompt),
    options,
    correct,
    explanationHtml: inlineMarkdownToHtml(authored.explanation),
    tags: authored.tags,
  };
  if (authored.code) {
    question.code = {
      lang: authored.code.lang,
      html: highlighter.highlight(authored.code.source, authored.code.lang),
    };
  }
  return question;
};
