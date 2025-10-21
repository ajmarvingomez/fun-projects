import { mapHeight, mapWidth, terrainDefinitions } from "@/definitions/map";
import { getRandomInt } from "./getRandomInt";
/**
 * Generate a new Map
 * @param {int} height
 * @param {int} width
 * @param {array} map
 */
export function generateMap(
  height = mapHeight,
  width = mapWidth,
  terrainDefinitions,
) {
  let newMap = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      newMap.push({
        coordinates: `${x},${y}`,
        terrain: generateTerrain(terrainDefinitions),
      });
    }
  }
  console.log("New Map Generated");
  console.log(newMap);
  return newMap;
}

/**
 * Returns a random terrain slug from terrain definitions. Used to generate terrain for map.
 * @param {array} terrainDefinitions
 * @returns
 */
export function generateTerrain(terrainDefinitions) {
  let number = getRandomInt(terrainDefinitions.length);
  return terrainDefinitions[number].slug;
}
