import { debugConsoleLog } from "./debugConsoleLog";
import { getMapCoordinates } from "./getMapCoordinates";
import { getTerrain, getTerrainDefinition } from "./getTerrain";
import { terrainDefinitions } from "@/definitions/map";
/**
 * Add health to player
 * @param {int} number
 */
export function addPlayerHealth(number, player, setPlayer) {
  let updatedPlayer = {
    ...player,
  };
  let newHP = updatedPlayer.hp + number;
  if (newHP > updatedPlayer.maxHP) {
    newHP = updatedPlayer.maxHP;
  }

  updatedPlayer.hp = newHP;
  debugConsoleLog(`hp set to: ${newHP}`);
  setPlayer({ ...updatedPlayer });
}

/**
 * Subtract health from player
 * @param {int} number
 */
export function subtractPlayerHealth(number, player, setPlayer) {
  let updatedPlayer = { ...player };
  let newHP = updatedPlayer.hp - number;
  if (newHP < 0) {
    newHP = 0;
  }
  debugConsoleLog(`hp set to: ${newHP}`);
  updatedPlayer.hp = newHP;
  setPlayer({
    ...updatedPlayer,
  });
}

export function getPlayerCoordinates(player, map) {
  if (!player) return null;
  let coordinates = player.coordinates;
  if (!coordinates) return null;
  let splitCoordinates = coordinates.split(",");
  let x = splitCoordinates[0];
  let y = splitCoordinates[1];
  debugConsoleLog(
    `${player.name} at ${JSON.stringify(getMapCoordinates(x, y, map))}`,
  );
  return getMapCoordinates(x, y, map);
}

export function getTerrainAtPlayer(player, map) {
  if (!player) return null;
  let coordinates = player.coordinates;
  if (!coordinates) return null;
  let splitCoordinates = coordinates.split(",");
  let x = splitCoordinates[0];
  let y = splitCoordinates[1];
  return getTerrain(x, y, map);
}

export function handlePlayerMovement(direction, player, setPlayer, map) {
  let oldCoordinates = player.coordinates;
  let splitCoordinates = oldCoordinates.split(",");
  let x = parseInt(splitCoordinates[0]);
  let y = parseInt(splitCoordinates[1]);
  if (direction === "up") y = y - 1;
  if (direction === "down") y = y + 1;
  if (direction === "left") x = x - 1;
  if (direction === "right") x = x + 1;
  if (!player) return null;
  debugConsoleLog(
    `Moving ${player.name} ${direction} from ${oldCoordinates} to ${x},${y}`,
  );
  if (!getMapCoordinates(x, y, map)) {
    debugConsoleLog(`Can't move ${direction}, out of bounds`);
    return;
  }
  if (
    getTerrainDefinition(getTerrain(x, y, map), terrainDefinitions).walkable ===
    false
  ) {
    debugConsoleLog(`Can't move ${direction}, terrain not walkable`);
    return;
  }
  setPlayer({ ...player, coordinates: `${x},${y}` });
}
