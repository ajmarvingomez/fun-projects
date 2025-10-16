import { debugConsoleLog } from "./debugConsoleLog";
import { getMapCoordinates } from "./getMapCoordinates";

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
