import { generateMap } from "@/utils/generateMap";
export function Debug({setMap, ...props}) {
    return <div>
                    <h2>Debug</h2>
                    <div>
                      <h3>Player Commands</h3>
                      <button onClick={() => subtractPlayerHealth(1, player)}>
                        Subtract Player Health
                      </button>
                      <button onClick={() => addPlayerHealth(1, player)}>
                        Add Player Health
                      </button>
                    </div>
                    <div>
                      <h3>Map Commands</h3>
                      <button onClick={() => setMap(generateMap())}>
                        Generate Map
                      </button>
                      <button onClick={() => getMapCoordinates(1, 0, map)}>
                        {" "}
                        Get Coordinates
                      </button>
                      <button
                        onClick={() => getPlayerCoordinates(player.coordinates)}
                      >
                        Get Player Coordinates
                      </button>
                    </div>
                  </div>
}