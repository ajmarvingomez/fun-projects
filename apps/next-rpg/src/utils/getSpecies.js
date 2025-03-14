/**
 * Find species of entity
 * @param {object} entity
 * @returns characterClass
 */

export function getSpecies(entity) {
    return species.find((item) => item.slug === entity.species);
  }