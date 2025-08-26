import { ConceptSchema } from "@domain/concept/concept.schema";
import { LinkSchema } from "@domain/link/link.schema";
import { UserSchema } from "@domain/user/user.schema";
import {
  defineEntitySchema,
  PaginatedResultSchema,
  removeBaseFields,
  withPaginationParams,
} from "@domain/utils";
import z from "zod";

export const ThoughtSchema = defineEntitySchema("ThoughtId", {
  text: z.string().describe("The content of the thought"),
  authorId: UserSchema.id,
});

export type ThoughtType = z.infer<typeof ThoughtSchema>;
export type ThoughtEncoded = z.input<typeof ThoughtSchema>;

export const ThoughtCreateData = removeBaseFields(ThoughtSchema);
export type ThoughtCreateData = z.infer<typeof ThoughtCreateData>;

export const CreateThoughtParams = ThoughtCreateData.extend({
  concepts: ConceptSchema.id.array(),
});
export type CreateThoughtParams = z.infer<typeof CreateThoughtParams>;

export const CreateThoughtResponse = z.object({
  thought: ThoughtSchema,
  links: z.lazy(() => LinkSchema.array()),
});
export type CreateThoughtResponse = z.infer<typeof CreateThoughtResponse>;

export const GetThoughtParams = withPaginationParams({
  authorId: ThoughtSchema.shape.authorId,
  text: ThoughtSchema.shape.text.optional(),
});
export type GetThoughtParams = z.infer<typeof GetThoughtParams>;

export const GetThoughtResponse = PaginatedResultSchema(ThoughtSchema);
export type GetThoughtResponse = z.infer<typeof GetThoughtResponse>;

export const GetThoughtDetailsParams = z.object({
  id: ThoughtSchema.id,
});
export type GetThoughtDetailsParams = z.infer<typeof GetThoughtDetailsParams>;

export const GetThoughtDetailsResponse = ThoughtSchema;
export type GetThoughtDetailsResponse = z.infer<
  typeof GetThoughtDetailsResponse
>;
