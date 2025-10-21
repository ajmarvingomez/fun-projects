import { getMapCoordinates } from "./getMapCoordinates";
import { debugConsoleLog } from "./debugConsoleLog";
/**
 * Get terrain at coordinates
 * @param {Number} x
 * @param {Number} y
 * @param {Array} map
 * @returns
 */
export function getTerrain(x, y, map) {
  let coordinates = getMapCoordinates(x, y, map);
  if (!coordinates) return null;
  debugConsoleLog(`Terrain at ${x},${y} is ${coordinates.terrain}`);
  return coordinates.terrain;
}
/**
 * Get terrain definition from terrain slug
 * @param {String} terrain
 * @param {Array} terrainDefinitions
 * @returns
 */

export function getTerrainDefinition(terrain, terrainDefinitions) {
  debugConsoleLog(`Getting definition for terrain: ${terrain}`);
  if (!terrainDefinitions) return null;
  let definition = terrainDefinitions.find((def) => def.slug === terrain);
  if (!definition) return null;
  debugConsoleLog(`Definition found: ${JSON.stringify(definition)}`);
  debugConsoleLog(`Description: ${definition.description}`);
  return definition;
}
