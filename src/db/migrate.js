/* eslint-disable @typescript-eslint/no-require-imports */

require("dotenv").config();
const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");
const runMigration = async () => {
  const sql = postgres(
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    { max: 1, username: process.env.DB_USER, password: process.env.DB_PASSWORD }
  );

  const db = drizzle(sql);

  try {
    console.log("Running migrations...");
    await migrate(db, { migrationsFolder: "drizzle" });

    console.log("✅ Successfully reset and ran migrations.");
  } catch (err) {
    console.error("❌ Failed to run migrations:", err);
    process.exit(1);
  } finally {
    await sql.end();
  }

  process.exit(0);
};

runMigration();