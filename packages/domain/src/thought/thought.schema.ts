import { ConceptSchema } from "@domain/concept/concept.entity";
import { LinkSchema } from "@domain/link/link.entity";
import {
  PaginatedResultSchema,
  type WithUser,
  withPaginationParams,
} from "@domain/utils";
import z from "zod";
import { ThoughtCreateData, ThoughtSchema } from "./thought.entity";

export const CreateThoughtParams = ThoughtCreateData.extend({
  concepts: ConceptSchema.id.array(),
}).omit({ authorId: true });
export type CreateThoughtParams = z.infer<typeof CreateThoughtParams>;
export type CreateThoughtData = WithUser<CreateThoughtParams>;

export const CreateThoughtResponse = z.object({
  thought: ThoughtSchema,
  links: LinkSchema.array(),
});
export type CreateThoughtResponse = z.infer<typeof CreateThoughtResponse>;

export const GetThoughtParams = withPaginationParams({
  text: ThoughtSchema.shape.text.optional(),
});
export type GetThoughtParams = z.infer<typeof GetThoughtParams>;
export type GetThoughtData = WithUser<GetThoughtParams>;

export const GetThoughtResponse = PaginatedResultSchema(ThoughtSchema);
export type GetThoughtResponse = z.infer<typeof GetThoughtResponse>;

export const GetThoughtDetailsParams = z.object({
  id: ThoughtSchema.id,
});
export type GetThoughtDetailsParams = z.infer<typeof GetThoughtDetailsParams>;
export type GetThoughtDetailsData = WithUser<GetThoughtDetailsParams>;

export const GetThoughtDetailsResponse = ThoughtSchema;
export type GetThoughtDetailsResponse = z.infer<
  typeof GetThoughtDetailsResponse
>;
