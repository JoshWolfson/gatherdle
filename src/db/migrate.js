/* eslint-disable @typescript-eslint/no-require-imports */

// scripts/reset-and-migrate.js
const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");
const runMigration = async () => {
  const sql = postgres(
    "postgresql://postgres:admin@gatherdle-prod-db:5432/gatherdle",
    { max: 1, username: "postgres", password: "admin" }
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