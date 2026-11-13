import type { SearchEntry } from '@/shared/interfaces/search.interface';
import { normalizeText } from '@/shared/lib/normalize-text';

const page = (title: string, subtitle: string, link: string, keywords: string): SearchEntry => ({
  kind: 'page',
  title,
  subtitle,
  link,
  titleTerms: normalizeText(title),
  terms: normalizeText(`${title} ${subtitle} ${keywords}`),
});

/** App pages offered by the command palette; also its suggestions when nothing is typed. */
export const SEARCH_PAGES: readonly SearchEntry[] = [
  page('Quizzes', 'Escolher uma tecnologia para praticar', '/quizzes', 'praticar perguntas'),
  page('Revisão', 'Perguntas que voltam no dia certo', '/revisao', 'revisar erros leitner'),
  page('Aleatório', 'Várias tecnologias misturadas', '/aleatorio', 'misturar random'),
  page('Recursos', 'Ferramentas, cursos e referências', '/recursos', 'links curadoria'),
  page(
    'Glossário',
    'Termos explicados em poucas linhas',
    '/glossario',
    'definicao conceito dicionario',
  ),
  page(
    'Seu progresso',
    'Números, histórico e backup',
    '/progresso',
    'estatisticas backup exportar',
  ),
  page('Sobre', 'O que é o Dev to Dev', '/sobre', 'projeto'),
];
