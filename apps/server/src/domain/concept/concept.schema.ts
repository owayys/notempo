import { defineEntitySchema } from "@domain/utils";
import z from "zod";

export const ConceptSchema = defineEntitySchema("ConceptId", {
  label: z.string().describe("The label of the concept"),
});

export const ConceptCreateData = ConceptSchema.pick({ label: true });

export type ConceptType = z.infer<typeof ConceptSchema>;
export type ConceptEncoded = z.input<typeof ConceptSchema>;

export type ConceptCreateData = z.infer<typeof ConceptCreateData>;
