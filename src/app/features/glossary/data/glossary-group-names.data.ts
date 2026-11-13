import { GLOSSARY } from '@/shared/generated/glossary';

/** Display name of each glossary group, by slug. */
export const GLOSSARY_GROUP_NAMES: Readonly<Record<string, string>> = Object.fromEntries(
  GLOSSARY.groups.map((group) => [group.slug, group.name]),
);
