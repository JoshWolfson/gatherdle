import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const setup = () => {
  // for query purposes
  const queryClient = postgres(
    "postgresql://postgres:admin@postgres:5432/gatherdle",
    {
      username: "postgres",
      password: "admin",
      host: "localhost",
      port: 5433,
      database: "gatherdle",
    }
  );
  const db = drizzle(queryClient, { schema });

  return db;
};

export default setup();
