import { handlePlayerMovement } from "@/utils/player";
export function Movement({ player, setPlayer, map, setMap }) {
  return (
    <div>
      <h2>Move</h2>
      <div>
        {["up", "down", "left", "right"].map((direction, index) => (
          <button
            key={index}
            onClick={() =>
              handlePlayerMovement(direction, player, setPlayer, map)
            }
          >
            {direction}
          </button>
        ))}
      </div>
    </div>
  );
}
