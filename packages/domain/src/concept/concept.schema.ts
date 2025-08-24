import {
  defineEntitySchema,
  PaginatedResultSchema,
  PaginationParamsSchema,
} from "@domain/utils";
import z from "zod";

export const ConceptSchema = defineEntitySchema("ConceptId", {
  label: z.string().describe("The label of the concept"),
});
export type ConceptType = z.infer<typeof ConceptSchema>;
export type ConceptEncoded = z.input<typeof ConceptSchema>;

export const ConceptCreateData = ConceptSchema.pick({ label: true });
export type ConceptCreateData = z.infer<typeof ConceptCreateData>;

export const CreateConceptParams = ConceptCreateData;
export type CreateConceptParams = z.infer<typeof CreateConceptParams>;

export const CreateConceptResponse = ConceptSchema;
export type CreateConceptResponse = z.infer<typeof CreateConceptResponse>;

export const GetConceptParams = PaginationParamsSchema.extend({
  label: z.string().optional().describe("Filter by label"),
});
export type GetConceptParams = z.infer<typeof GetConceptParams>;

export const GetConceptResponse = PaginatedResultSchema(ConceptSchema);
export type GetConceptResponse = z.infer<typeof GetConceptResponse>;

export const GetConceptDetailsParams = z.object({
  id: ConceptSchema.id,
});
export type GetConceptDetailsParams = z.infer<typeof GetConceptDetailsParams>;

export const GetConceptDetailsResponse = ConceptSchema;
export type GetConceptDetailsResponse = z.infer<
  typeof GetConceptDetailsResponse
>;
