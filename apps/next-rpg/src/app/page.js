"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { debugConsoleLog } from "@/utils/debugConsoleLog";
const debug = process.env.NODE_ENV === "development" ? true : false;
import { generateMap } from "@/utils/generateMap";
import { species } from "@/definitions/species";
import { classes } from "@/definitions/classes";
import { getRandomInt } from "@/utils/getRandomInt";
import { getClass } from "@/utils/getClass";
import { getSpecies } from "@/utils/getSpecies";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Debug } from "@/components/Debug";
import { mapHeight, mapWidth } from "@/definitions/map";

export default function Home() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (player === null) return;
    window.localStorage.setItem("player", JSON.stringify(player));
    debugConsoleLog(`player set to ${window.localStorage.getItem("player")}`);
  }, [player]);

  function loadGame() {
    if (!window) return;
    let player = window.localStorage.getItem("player");
    debugConsoleLog(`Player found: ${player}`);
    if (player === null) return;
    setPlayer(JSON.parse(player));
  }

  const [openForm, setOpenForm] = useState(false);

  const [map, setMap] = useState(() => generateMap(mapWidth, mapHeight));



  function getMapCoordinates(x, y, map) {
    let coordinate = map.find(
      (coordinates) => coordinates.coordinates === `${x},${y}`,
    );
    return coordinate;
  }

  function getPlayerCoordinates(coordinates) {
    let splitCoordinates = coordinates.split(",");
    let x = splitCoordinates[0];
    let y = splitCoordinates[1];
    debugConsoleLog(
      `${player.name} at ${JSON.stringify(getMapCoordinates(x, y, map))}`,
    );
    return getMapCoordinates(x, y, map);
  }

  /**
   * Add health to player
   * @param {int} number
   */
  function addPlayerHealth(number) {
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
  function subtractPlayerHealth(number) {
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

  function createCharacter(formData) {
    const name = formData.get("name");
    const species = formData.get("species");
    const _class = formData.get("class");
    debugConsoleLog(`Character Created: ${JSON.stringify(formData)}`);

    setPlayer({
      ...player,
      name: name,
      species: species,
      characterClass: _class,
      hp: 10,
      maxHP: 10,
      coordinates: `${getRandomInt(mapWidth)},${getRandomInt(mapHeight)}`,
    });
  }

  function hpColor(entity) {
    const { hp, maxHP } = entity;
    if (0.3 > hp / maxHP) return "red";
    if (hp < maxHP) return "orange";
    if (hp === maxHP) return "green";
  }
  return (
    <div className={styles.page}>
      <header></header>
      <main className={styles.main}>
        <h1>Next RPG</h1>
        {player != null && (
          <div>
            <div>
              <h2>Character</h2>
              <div>
                Name: <span>{player.name}</span>
              </div>
              <div>
                Species: <span>{getSpecies(player).name}</span>
              </div>
              <div>
                Class: <span>{getClass(player).name}</span>
              </div>
            </div>
            <div>
              <div>
                {
                  <Image
                    style={{
                      backgroundColor: hpColor(player),
                    }}
                    width={16}
                    height={16}
                    src="/icons/health-normal.svg"
                    alt={`${player.hp} / ${player.maxHP}`}
                  />
                }{" "}
                HP: <span>{player.hp}</span> <span>/</span>
                <span>{player.maxHP}</span>
              </div>
              <div>
                Position: <span>{player.coordinates}</span>
              </div>
            </div>
            {debug === true && <Debug setMap={setMap} />}
          </div>
        )}
        {player === null && openForm == false && (
          <>
            <button
              onClick={() => {
                setOpenForm(!openForm);
              }}
            >
              Start Game
            </button>
            <button
              onClick={() => {
                loadGame();
              }}
            >
              Load Game
            </button>
          </>
        )}
        {openForm == true && player == null && (
          <form action={createCharacter}>
            <Input id="name" title="Name" />
            <Select id="species" title="Species" list={species} />
            <Select id="class" title="Class" list={classes} />
            <button type="submit">Create Character</button>
          </form>
        )}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
