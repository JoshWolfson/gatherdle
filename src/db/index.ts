import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = parseInt(process.env.DB_PORT || "5432", 10);
const database = process.env.DB_NAME;

const setup = () => {
  // for query purposes
  const queryClient = postgres(
    `postgresql://${username}:${password}@${host}:${port}/${database}`,
    {
      username,
      password,
      host,
      port,
      database,
    }
  );
  const db = drizzle(queryClient, { schema });

  return db;
};

export default setup();
