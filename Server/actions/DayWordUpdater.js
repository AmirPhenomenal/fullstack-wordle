import { setTodayWord, getTodayWord } from "./todayWord.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import chalk from "chalk";
// Update Rate For Word In Seconds
// 86400 For Daily Update
const WordupdateRate = 240;
const updaterInterval = 60;

const updateWord = async () => {
  const todayWord = getTodayWord();
  if (todayWord.modifiedDate + WordupdateRate >= Date.now() / 1000) return;
  const db = await open({
    filename: "./database/dbt.db",
    driver: sqlite3.Database,
  });
  const result = await db.get("SELECT * FROM words ORDER BY RANDOM() LIMIT 1");
  setTodayWord(result.word);
};

export const dayWordUpdater = async () => {
  updateWord();
  setInterval(updateWord, updaterInterval * 1000);
};
