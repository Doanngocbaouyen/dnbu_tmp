import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("tasks.db");

// Tạo table nếu chưa có
export const InitDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL
    )
  `);
};

export const AddTask = async (title: string) => {
  await db.runAsync(`INSERT INTO tasks (title) VALUES (?)`, [title]);
};

export default db;
