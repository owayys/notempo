import { ConceptSchema } from "@domain/concept/concept.schema";
import { ThoughtSchema } from "@domain/thought/thought.schema";
import { defineEntitySchema } from "@domain/utils";
import z from "zod";

export const LinkSchema = defineEntitySchema("LinkId", {
  thoughtId: ThoughtSchema.id,
  conceptId: ConceptSchema.id,
  alias: z.string().optional().describe("An optional alias for the link"),
});

export const LinkCreateData = LinkSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type LinkType = z.infer<typeof LinkSchema>;
export type LinkEncoded = z.input<typeof LinkSchema>;

export type LinkCreateData = z.infer<typeof LinkCreateData>;
