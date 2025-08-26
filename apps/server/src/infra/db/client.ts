import { config } from "@infra/config";
import * as schema from "@infra/db/schema";
import { SQL } from "bun";
import { type BunSQLDatabase, drizzle } from "drizzle-orm/bun-sql";
import {
  container,
  type DependencyContainer,
  type FactoryProvider,
  inject,
  instanceCachingFactory,
} from "tsyringe";

export const createDbInstance = () => {
  const client = new SQL(config.db.DATABASE_URL, {
    max: 25,
    idleTimeout: 60,
  });

  const db = drizzle({
    client,
    schema,
    logger: true,
  });

  return db;
};

const DbSym = Symbol.for("Database");
export type AppDatabase = BunSQLDatabase<typeof schema>;

export const DbProvider: FactoryProvider<AppDatabase> = {
  useFactory: instanceCachingFactory(createDbInstance),
};

container.register(DbSym, DbProvider);

export const injectDb = () => inject(DbSym);
export const resolveDb = () => container.resolve(DbSym) as AppDatabase;
export const resolveDbFromContainer = (depcontainer: DependencyContainer) =>
  depcontainer.resolve(DbSym) as AppDatabase;
