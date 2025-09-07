import type { ThoughtType } from "@domain/thought/thought.entity";
import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { getBaseColumns } from "../utils/model.utils";
import { links } from "./link.model";

export const thoughts = pgTable("thoughts", {
  ...getBaseColumns<ThoughtType["id"]>(),

  text: varchar("text", { length: 512 }).$type<ThoughtType["text"]>().notNull(),
  authorId: uuid("author_id").$type<ThoughtType["authorId"]>().notNull(),
});

export const thoughtRelations = relations(thoughts, ({ many }) => ({
  links: many(links),
}));
