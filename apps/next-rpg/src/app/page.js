"use client";
import { useState } from "react";
import styles from "./page.module.css";

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
  function createCharacter(formData) {
    const name = formData.get("name");
    const species = formData.get("species");
    const _class = formData.get("class");
    console.log(formData);
    setPlayer({
      ...player,
      name: name,
      species: species,
      class: _class,
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
              <div>
                Name: <span>{player.name}</span>
              </div>
              <div>
                Species: <span>{player.species}</span>
              </div>
              <div>
                Class: <span>{player.class}</span>
              </div>
            </div>
            <div>
              <div>
                HP: <span>{player.hp}</span> <span>/</span>
                <span>{player.maxHP}</span>
              </div>
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
