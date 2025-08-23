import { pgTable, text } from "drizzle-orm/pg-core";
import { getBaseColumns } from "../utils/model.utils";
import type { NoteType } from "@domain/note/note.entity";
import { relations } from "drizzle-orm";
import { links } from "./link.model";

export const notes = pgTable("notes", {
  ...getBaseColumns<NoteType["id"]>(),

  text: text("text").$type<NoteType["text"]>().notNull(),
});

export const noteRelations = relations(notes, ({ many }) => ({
  links: many(links),
}));
