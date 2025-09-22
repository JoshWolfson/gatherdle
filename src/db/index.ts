import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"; // adjust path if needed

const setup = () => {
  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL ?? "", {
    username: process.env.USERNAME ?? "",
    password: process.env.PASSWORD ?? "",
    host: "localhost",
    port: 5432,
    database: process.env.DB ?? "",
  });
  const db = drizzle(queryClient, { schema });
  return db;
};

export default setup();
