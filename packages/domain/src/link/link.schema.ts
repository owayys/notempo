import { ConceptSchema } from "@domain/concept/concept.schema";
import { ThoughtSchema } from "@domain/thought/thought.schema";
import { defineEntitySchema, removeBaseFields } from "@domain/utils";
import z from "zod";

export const LinkSchema = defineEntitySchema("LinkId", {
  thoughtId: ThoughtSchema.id,
  conceptId: ConceptSchema.id,
  alias: z.string().optional().describe("An optional alias for the link"),
});

export type LinkType = z.infer<typeof LinkSchema>;
export type LinkEncoded = z.input<typeof LinkSchema>;

export const LinkCreateData = removeBaseFields(LinkSchema);
export type LinkCreateData = z.infer<typeof LinkCreateData>;
