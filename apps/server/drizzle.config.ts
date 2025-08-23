import { config } from "@infra/config";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/infra/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: config.db.DATABASE_URL,
  },
});
