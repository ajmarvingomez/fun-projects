import { classes } from "@/definitions/classes";
/**
 * Find class of entity
 * @param {Object} entity
 * @returns characterClass
 */

export function getClass(entity) {
  return classes.find((item) => item.slug === entity.characterClass);
}
