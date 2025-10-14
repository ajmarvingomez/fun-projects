/**
 * Add health to player
 * @param {int} number
 */
export function addPlayerHealth(number) {
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
export function subtractPlayerHealth(number) {
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
