import { ConceptSchema } from "@domain/concept";
import { NoteSchema } from "@domain/note";
import { defineEntitySchema } from "@domain/utils";
import z from "zod";

export const LinkSchema = defineEntitySchema("LinkId", {
  noteId: NoteSchema.id,
  conceptId: ConceptSchema.id,
  alias: z.string().optional().describe("An optional alias for the link"),
});

export const LinkCreateData = LinkSchema;

export type LinkType = z.infer<typeof LinkSchema>;
export type LinkEncoded = z.input<typeof LinkSchema>;

export type LinkCreateData = z.infer<typeof LinkCreateData>;
