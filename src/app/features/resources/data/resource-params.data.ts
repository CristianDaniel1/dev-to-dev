import type {
  Pricing,
  ResourceLanguage,
  ResourceType,
} from '@/shared/interfaces/resource.interface';
import type { ResourceSort } from '../interfaces/resource-filters.interface';

/** URL query value of each resource type (user-facing, so in pt-BR). */
export const RESOURCE_TYPE_PARAMS: Record<ResourceType, string> = {
  docs: 'documentacao',
  reference: 'referencia',
  course: 'curso',
  practice: 'pratica',
  tool: 'ferramenta',
  library: 'biblioteca',
  service: 'servico',
  assets: 'material-visual',
  blog: 'blog',
  newsletter: 'newsletter',
  podcast: 'podcast',
  community: 'comunidade',
};

/** URL query value of each pricing model. */
export const PRICING_PARAMS: Record<Pricing, string> = {
  free: 'gratuito',
  freemium: 'freemium',
  paid: 'pago',
};

/** URL query value of each language. */
export const LANGUAGE_PARAMS: Record<ResourceLanguage, string> = {
  pt: 'pt',
  en: 'en',
};

/** URL query value of each order; the default order is left out of the URL. */
export const SORT_PARAMS: Record<ResourceSort, string> = {
  curated: 'curadoria',
  name: 'nome',
};
