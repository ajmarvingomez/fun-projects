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
      <input id={id} />
    </div>
  );
}

function Select({ id, title, list }) {
  return (
    <div>
      <label htmlFor={id}>{title}</label>
      <select id={id}>
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
  return (
    <div className={styles.page}>
      <header></header>
      <main className={styles.main}>
        <h1>Next RPG</h1>
        {player === null && openForm == false && (
          <button onClick={() => setOpenForm(!openForm)}>
            Create Character
          </button>
        )}
        {openForm && (
          <form>
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
