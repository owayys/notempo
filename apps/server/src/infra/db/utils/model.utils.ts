import type { UUID } from "@domain/utils/refined.type";
import { timestamp, uuid } from "drizzle-orm/pg-core";

export const getPrimaryKeyCol = <
  I extends string = "id",
  T extends UUID<I> = UUID<I>
>() => uuid("id").$type<T>().primaryKey().defaultRandom();

export const getBaseColumns = <
  I extends string = "id",
  T extends UUID<I> = UUID<I>
>() => ({
  id: getPrimaryKeyCol<T>(),
  createdAt: timestamp("created_at").$type<Date>().notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$type<Date>().notNull().defaultNow(),
});
