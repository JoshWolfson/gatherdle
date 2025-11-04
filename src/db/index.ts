import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const setup = () => {
  // for query purposes
  const queryClient = postgres(
    "postgresql://postgres:admin@gatherdle-prod-db:5432/gatherdle",
    {
      username: "postgres",
      password: "admin",
      host: "gatherdle-prod-db",
      port: 5432,
      database: "gatherdle",
    }
  );
  const db = drizzle(queryClient, { schema });

  return db;
};

export default setup();
