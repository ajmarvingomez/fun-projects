/**
 * Get map coordinates a map array.
 * @param {string} x
 * @param {string} y
 * @param {Array} map
 * @returns
 */
export function getMapCoordinates(x, y, map) {
  if (!map || map.length === 0) return null;
  let coordinate = map.find(
    (coordinates) => coordinates.coordinates === `${x},${y}`,
  );
  return coordinate;
}
