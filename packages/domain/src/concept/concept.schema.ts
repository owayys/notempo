import { ThoughtSchema } from "@domain/thought/thought.entity";
import {
  PaginatedResultSchema,
  type WithUser,
  withPaginationParams,
} from "@domain/utils";
import z from "zod";
import { ConceptCreateSchema, ConceptSchema } from "./concept.entity";

export const CreateConceptParams = ConceptCreateSchema.omit({ authorId: true });
export type CreateConceptParams = z.infer<typeof CreateConceptParams>;
export type CreateConceptData = WithUser<CreateConceptParams>;

export const CreateConceptResponse = ConceptSchema;
export type CreateConceptResponse = z.infer<typeof CreateConceptResponse>;

export const GetConceptParams = withPaginationParams({
  label: z.string().optional().describe("Filter by label"),
});
export type GetConceptParams = z.infer<typeof GetConceptParams>;
export type GetConceptData = WithUser<GetConceptParams>;

export const GetConceptResponse = PaginatedResultSchema(ConceptSchema);
export type GetConceptResponse = z.infer<typeof GetConceptResponse>;

export const GetConceptDetailsParams = z.object({
  id: ConceptSchema.id,
});
export type GetConceptDetailsParams = z.infer<typeof GetConceptDetailsParams>;
export type GetConceptDetailsData = WithUser<GetConceptDetailsParams>;

export const GetConceptDetailsResponse = z.object({
  concept: ConceptSchema,
  thoughts: ThoughtSchema.array(),
});
export type GetConceptDetailsResponse = z.infer<
  typeof GetConceptDetailsResponse
>;
