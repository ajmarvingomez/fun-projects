import { getMapCoordinates } from "./getMapCoordinates";
import { debugConsoleLog } from "./debugConsoleLog";
export function getTerrain(x, y, map) {
  let coordinates = getMapCoordinates(x, y, map);
  if (!coordinates) return null;
  debugConsoleLog(`Terrain at ${x},${y} is ${coordinates.terrain}`);
  return coordinates.terrain;
}
export function getTerrainDefinition(terrain, terrainDefinitions) {
  debugConsoleLog(`Getting definition for terrain: ${terrain}`);
  if (!terrainDefinitions) return null;
  let definition = terrainDefinitions.find((def) => def.slug === terrain);
  if (!definition) return null;
  debugConsoleLog(`Definition found: ${JSON.stringify(definition)}`);
  debugConsoleLog(`Description: ${definition.description}`);
  return definition;
}
