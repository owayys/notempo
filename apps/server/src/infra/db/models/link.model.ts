import { pgTable, uuid } from "drizzle-orm/pg-core";
import { getBaseColumns } from "../utils/model.utils";
import type { LinkType } from "@domain/link/link.schema";
import { relations } from "drizzle-orm";
import { concepts } from "./concept.model";
import { thoughts } from "./thought.model";

export const links = pgTable("links", {
  ...getBaseColumns<LinkType["id"]>(),

  conceptId: uuid("concept_id").$type<LinkType["conceptId"]>().notNull(),
  thoughtId: uuid("thought_id").$type<LinkType["thoughtId"]>().notNull(),
  alias: uuid("alias").$type<LinkType["alias"]>(),
});

export const linkRelations = relations(links, ({ one }) => ({
  concept: one(concepts, {
    fields: [links.conceptId],
    references: [concepts.id],
  }),
  thought: one(thoughts, {
    fields: [links.thoughtId],
    references: [thoughts.id],
  }),
}));
