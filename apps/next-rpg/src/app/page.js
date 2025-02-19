"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
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

function getClass(entity) {
  return classes.find((item) => item.slug === entity.characterClass);
}

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
  const [openForm, setOpenForm] = useState(false);

  function addPlayerHealth(number) {
    let updatedPlayer = {
      ...player,
    };
    let newHP = updatedPlayer.hp + number;
    if (newHP > updatedPlayer.maxHP) {
      newHP = updatedPlayer.maxHP;
    }

    updatedPlayer.hp = newHP;
    setPlayer(updatedPlayer);
  }

  function subtractPlayerHealth(number) {
    let updatedPlayer = { ...player };
    let newHP = updatedPlayer.hp - number;
    if (newHP < 0) {
      newHP = 0;
    }

    updatedPlayer.hp = newHP;
    setPlayer({
      ...updatedPlayer,
      hp: newHP,
    });
  }



  function createCharacter(formData) {
    const name = formData.get("name");
    const species = formData.get("species");
    const _class = formData.get("class");
    // console.log(formData);
    setPlayer({
      ...player,
      name: name,
      species: species,
      characterClass: _class,
      hp: 10,
      maxHP: 10,
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
            </div>
            <div>
              <h2>Debug</h2>
              <button onClick={() => subtractPlayerHealth(1, player)}>
                Subtract Player Health
              </button>
              <button onClick={() => addPlayerHealth(1, player)}>
                Add Player Health
              </button>
            </div>
          </div>
        )}
        {player === null && openForm == false && (
          <button onClick={() => setOpenForm(!openForm)}>
            Create Character
          </button>
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
