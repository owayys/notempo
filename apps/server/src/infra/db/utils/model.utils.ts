import type { DateTimeType, UUIDType } from "@domain/utils/refined.type";
import { timestamp, uuid } from "drizzle-orm/pg-core";

export const getPrimaryKeyCol = <T extends UUIDType = UUIDType>() =>
  uuid("id").$type<T>().primaryKey().defaultRandom();

export const getBaseColumns = <T extends UUIDType = UUIDType>() => ({
  id: getPrimaryKeyCol<T>(),
  createdAt: timestamp("created_at")
    .$type<DateTimeType>()
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at")
    .$type<DateTimeType>()
    .notNull()
    .defaultNow(),
});
