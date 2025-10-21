import { species } from "@/definitions/species";
/**
 * Find species of entity
 * @param {Object} entity
 * @returns characterClass
 */

export function getSpecies(entity) {
  return species.find((item) => item.slug === entity.species);
}
