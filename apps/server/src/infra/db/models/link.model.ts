import type { LinkEncoded, LinkType } from "@domain/link/link.entity";
import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { getBaseColumns } from "../utils/model.utils";
import { concepts } from "./concept.model";
import { thoughts } from "./thought.model";

export const links = pgTable("links", {
  ...getBaseColumns<LinkType["id"]>(),

  conceptId: uuid("concept_id").$type<LinkEncoded["conceptId"]>().notNull(),
  thoughtId: uuid("thought_id").$type<LinkEncoded["thoughtId"]>().notNull(),
  alias: uuid("alias").$type<LinkEncoded["alias"]>(),
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
