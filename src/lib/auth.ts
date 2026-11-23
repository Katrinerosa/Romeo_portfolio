import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import Database from "better-sqlite3";
import path from "node:path";

// I connect Better Auth to my existing SQLite database.
const database = new Database(
  path.join(process.cwd(), "data", "romeo.sqlite"),
  { fileMustExist: true }
);

export const auth = betterAuth({
  database,

  // I enable login with email and password.
  // Visitors cannot create their own accounts.
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },

  // I enable tools for managing the owner's account.
  plugins: [admin()],
});