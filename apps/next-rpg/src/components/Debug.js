import { generateMap } from "@/utils/generateMap";
import { debugConsoleLog } from "@/utils/debugConsoleLog";
import {
  addPlayerHealth,
  subtractPlayerHealth,
  getPlayerCoordinates,
} from "@/utils/player";
import { getMapCoordinates } from "@/utils/getMapCoordinates";
export function Debug({ setMap, map, player, setPlayer }) {
  return (
    <div>
      <h2>Debug</h2>
      <div>
        <h3>Player Commands</h3>
        <button onClick={() => subtractPlayerHealth(1, player, setPlayer)}>
          Subtract Player Health
        </button>
        <button onClick={() => addPlayerHealth(1, player, setPlayer)}>
          Add Player Health
        </button>
      </div>
      <div>
        <h3>Map Commands</h3>
        <button onClick={() => setMap(generateMap())}>Generate Map</button>
        <button onClick={() => getMapCoordinates(1, 0, map)}>
          {" "}
          Get Coordinates
        </button>
        <button onClick={() => getPlayerCoordinates(player, map)}>
          Get Player Coordinates
        </button>
      </div>
    </div>
  );
}
