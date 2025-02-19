"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { debugConsoleLog } from "@/utils/debugConsoleLog";
const debug = process.env.NODE_ENV === "development" ? true : false

const species = [
  {
    slug: "human",
    name: "Human",
  },
  {
    slug: "elf",
    name: "Elf",
  },
];

const classes = [
  {
    slug: "fighter",
    name: "Fighter",
  },
];

const mapHeight = 10;
const mapWidth = 10;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Find class of entity
 * @param {object} entity
 * @returns characterClass
 */

function getClass(entity) {
  return classes.find((item) => item.slug === entity.characterClass);
}

/**
 * Find species of entity
 * @param {object} entity
 * @returns characterClass
 */

function getSpecies(entity) {
  return species.find((item) => item.slug === entity.species);
}

function Input({ id, title }) {
  return (
    <div>
      <label htmlFor={id}>{title}</label>
      <input id={id} name={id} />
    </div>
  );
}

function Select({ id, title, list }) {
  return (
    <div>
      <label htmlFor={id}>{title}</label>
      <select id={id} name={id}>
        {list.map((option, index) => {
          return (
            <option key={index} value={option.slug}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default function Home() {
  const [player, setPlayer] = useState(null);

  useEffect( () => {
    if(player === null) return
    window.localStorage.setItem('player', JSON.stringify(player))
    debugConsoleLog(`player set to ${window.localStorage.getItem('player')}`)
  }, [player] )

  function loadGame() {
    if(!window) return
    let player = window.localStorage.getItem('player')
    debugConsoleLog(`Player found: ${player}`)
    if(player === null) return
    setPlayer(JSON.parse(player))
  }

  const [openForm, setOpenForm] = useState(false);

  const [map, setMap] = useState(() => generateMap(mapWidth, mapHeight));

  /**
   * Generate a new Map
   * @param {int} height
   * @param {int} width
   * @param {array} map
   */
  function generateMap(height, width) {
    let newMap = [];
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        newMap.push({
          coordinates: `${x},${y}`,
        });
      }
    }
    return newMap;
  }

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
    debugConsoleLog(`${player.name} at ${JSON.stringify(getMapCoordinates(x, y, map))}`)
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
    debugConsoleLog(`hp set to: ${newHP}`)
    setPlayer({...updatedPlayer});
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
    debugConsoleLog(`hp set to: ${newHP}`)
    updatedPlayer.hp = newHP;
    setPlayer({
      ...updatedPlayer
    });
  }

  function createCharacter(formData) {
    const name = formData.get("name");
    const species = formData.get("species");
    const _class = formData.get("class");
    debugConsoleLog(`Character Created: ${JSON.stringify(formData)}`)

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
                    style={{ filter: "invert(1)" }}
                    width={10}
                    height={10}
                    src="/icons/health-normal.svg"
                    alt=""
                  />
                }{" "}
                HP: <span>{player.hp}</span> <span>/</span>
                <span>{player.maxHP}</span>
              </div>
              <div>
                Position: <span>{player.coordinates}</span>
              </div>
            </div>
            {debug === true && (
              <div>
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
                  <button onClick={() => generateMap(mapWidth, mapHeight)}>
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
            )}
          </div>
        )}
        {player === null && openForm == false && (
          <>
            <button onClick={() => {setOpenForm(!openForm)}}>
              Start Game
            </button>
            <button onClick={() => {
              loadGame()
            }}>Load Game</button>
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
