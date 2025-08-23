import { pgTable, uuid } from "drizzle-orm/pg-core";
import { getBaseColumns } from "../utils/model.utils";
import type { LinkType } from "@domain/link/link.entity";
import { relations } from "drizzle-orm";
import { concepts } from "./concept.model";
import { notes } from "./note.model";

export const links = pgTable("links", {
  ...getBaseColumns<LinkType["id"]>(),

  conceptId: uuid("concept_id").$type<LinkType["conceptId"]>().notNull(),
  noteId: uuid("note_id").$type<LinkType["noteId"]>().notNull(),
  alias: uuid("alias").$type<LinkType["alias"]>(),
});

export const linkRelations = relations(links, ({ one }) => ({
  concept: one(concepts, {
    fields: [links.conceptId],
    references: [concepts.id],
  }),
  note: one(notes, {
    fields: [links.noteId],
    references: [notes.id],
  }),
}));
