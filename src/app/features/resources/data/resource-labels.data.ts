import type {
  Pricing,
  ResourceLanguage,
  ResourceTech,
  ResourceType,
} from '@/shared/interfaces/resource.interface';
import type { ResourceSort } from '../interfaces/resource-filters.interface';

/** pt-BR label of each resource type. */
export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  docs: 'Documentação',
  reference: 'Referência',
  course: 'Curso',
  practice: 'Prática',
  tool: 'Ferramenta',
  library: 'Biblioteca',
  service: 'Serviço',
  assets: 'Material visual',
  blog: 'Blog',
  newsletter: 'Newsletter',
  podcast: 'Podcast',
  community: 'Comunidade',
};

/** pt-BR label of each pricing model. */
export const PRICING_LABELS: Record<Pricing, string> = {
  free: 'Gratuito',
  freemium: 'Freemium',
  paid: 'Pago',
};

/** pt-BR name of each language, used in the filter. */
export const LANGUAGE_LABELS: Record<ResourceLanguage, string> = {
  pt: 'Português',
  en: 'Inglês',
};

/** Short language tag shown on each card. */
export const LANGUAGE_TAGS: Record<ResourceLanguage, string> = {
  pt: 'PT',
  en: 'EN',
};

/** Display name of each technology tag. */
export const TECH_LABELS: Record<ResourceTech, string> = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  react: 'React',
  angular: 'Angular',
  vue: 'Vue',
  svelte: 'Svelte',
  nextjs: 'Next.js',
  node: 'Node.js',
  tailwind: 'Tailwind',
  git: 'Git',
  sql: 'SQL',
};

/** pt-BR label of each list order. */
export const SORT_LABELS: Record<ResourceSort, string> = {
  curated: 'Curadoria',
  name: 'Nome (A–Z)',
};
