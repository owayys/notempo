import type { ConceptType } from "@domain/concept/concept.schema";
import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { getBaseColumns } from "../utils/model.utils";
import { links } from "./link.model";

export const concepts = pgTable("concepts", {
  ...getBaseColumns<ConceptType["id"]>(),

  label: text("label").$type<ConceptType["label"]>().notNull(),
  authorId: uuid("author_id").$type<ConceptType["authorId"]>().notNull(),
});

export const conceptRelations = relations(concepts, ({ many }) => ({
  links: many(links),
}));
