import { LEVEL_PARAMS } from '@/shared/data/content-labels.data';
import { ALL_QUESTIONS_PARAM } from '../constants/session.constants';
import type { RandomQueryParams, RandomSetup } from '../interfaces/random-setup.interface';

/**
 * Turns the random setup choices into query params; choosing every tech leaves `techs` out.
 *
 * @param setup - Choices made in the setup.
 * @returns Query params; `null` values are left out of the URL.
 */
export const toRandomQuery = (setup: RandomSetup): RandomQueryParams => ({
  techs:
    setup.techs.length && setup.techs.length < setup.allTechs.length ? setup.techs.join(',') : null,
  nivel: setup.level ? LEVEL_PARAMS[setup.level] : null,
  qtd: setup.size ?? ALL_QUESTIONS_PARAM,
  novas: setup.onlyUnanswered ? '1' : null,
});
