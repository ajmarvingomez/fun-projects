export function getMapCoordinates(x, y, map) {
  if (!map || map.length === 0) return null;
  let coordinate = map.find(
    (coordinates) => coordinates.coordinates === `${x},${y}`,
  );
  return coordinate;
}
