const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");

const runMigration = async () => {
  const sql = postgres("postgresql://postgres:admin@localhost:5433/gatherdle", { max: 1, username: "postgres", password: "admin" });
  const db = drizzle(sql);
  await migrate(db, { migrationsFolder: "drizzle" });
  await sql.end();
};

runMigration()
  .then(() => {
    console.log("Successfully ran migration.");

    process.exit(0);
  })
  .catch((e) => {
    console.error("Failed to run migration.");
    console.error(e);

    process.exit(1);
  });