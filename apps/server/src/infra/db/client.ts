import { config } from "@infra/config";
import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(config.db.DATABASE_URL);

export { db };
