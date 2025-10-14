import { mapHeight, mapWidth } from "@/definitions/map";
/**
 * Generate a new Map
 * @param {int} height
 * @param {int} width
 * @param {array} map
 */
export function generateMap(height = mapHeight, width = mapWidth) {
  let newMap = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      newMap.push({
        coordinates: `${x},${y}`,
      });
    }
  }
  console.log("New Map Generated");
  console.log(newMap);
  return newMap;
}
