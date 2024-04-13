import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    // host: process.env.DB_HOST ?? "",
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME ?? "",
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "paddock",
  },
  verbose: true,
  strict: true,
});
