// I keep this code on the server.
import "server-only";

// I import the package that connects to SQLite.
import Database from "better-sqlite3";
import path from "node:path";

// I find my database file from the project folder.
const databasePath = path.join(process.cwd(), "data", "romeo.sqlite");

// I open my existing database and share the connection.
// If the file is missing, I get an error.
export const db = new Database(databasePath, {
  fileMustExist: true,
});