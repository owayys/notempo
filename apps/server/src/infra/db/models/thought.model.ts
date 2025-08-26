import type { ThoughtType } from "@domain/thought/thought.schema";
import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { getBaseColumns } from "../utils/model.utils";
import { links } from "./link.model";

export const thoughts = pgTable("thoughts", {
  ...getBaseColumns<ThoughtType["id"]>(),

  text: text("text").$type<ThoughtType["text"]>().notNull(),
  authorId: uuid("author_id").$type<ThoughtType["authorId"]>().notNull(),
});

export const thoughtRelations = relations(thoughts, ({ many }) => ({
  links: many(links),
}));
