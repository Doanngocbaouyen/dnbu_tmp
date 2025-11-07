import * as SQLite from "expo-sqlite";

// ✅ API mới: đồng bộ
const db = SQLite.openDatabaseSync("tasks.db");

// ✅ Tạo bảng (async)
export const InitDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);
};

// ✅ Thêm dữ liệu (async)
export const AddTask = async (
  title: string,
  amount: number,
  type: string,
  createdAt: string
) => {
  await db.runAsync(
    `INSERT INTO tasks (title, amount, type, createdAt) VALUES (?, ?, ?, ?);`,
    [title, amount, type, createdAt]
  );
  console.log("✅ Task added successfully");
};

// ✅ Cập nhật task theo id
export const UpdateTask = async (
  id: number,
  title: string,
  amount: number
) => {
  await db.runAsync(
    `UPDATE tasks SET title = ?, amount = ? WHERE id = ?`,
    [title, amount, id]
  );
};


export default db;
