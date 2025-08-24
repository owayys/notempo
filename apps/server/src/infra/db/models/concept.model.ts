import { pgTable, text } from "drizzle-orm/pg-core";
import { getBaseColumns } from "../utils/model.utils";
import type { ConceptType } from "@domain/concept/concept.schema";
import { relations } from "drizzle-orm";
import { links } from "./link.model";

export const concepts = pgTable("concepts", {
  ...getBaseColumns<ConceptType["id"]>(),

  label: text("label").$type<ConceptType["label"]>().notNull(),
});

export const conceptRelations = relations(concepts, ({ many }) => ({
  links: many(links),
}));
