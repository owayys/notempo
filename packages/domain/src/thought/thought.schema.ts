import { ConceptSchema } from "@domain/concept/concept.schema";
import { LinkSchema } from "@domain/link/link.schema";
import { UserSchema } from "@domain/user/user.schema";
import {
  defineEntitySchema,
  PaginatedResultSchema,
  removeBaseFields,
  type WithUser,
  withPaginationParams,
} from "@domain/utils";
import z from "zod";

export const ThoughtSchema = defineEntitySchema("ThoughtId", {
  text: z.string().max(512).describe("The content of the thought"),
  authorId: UserSchema.id,
});

export type ThoughtType = z.infer<typeof ThoughtSchema>;
export type ThoughtEncoded = z.input<typeof ThoughtSchema>;

export const ThoughtCreateData = removeBaseFields(ThoughtSchema);
export type ThoughtCreateData = z.infer<typeof ThoughtCreateData>;

export const CreateThoughtParams = ThoughtCreateData.extend({
  concepts: ConceptSchema.id.array(),
}).omit({ authorId: true });
export type CreateThoughtParams = z.infer<typeof CreateThoughtParams>;
export type CreateThoughtData = WithUser<CreateThoughtParams>;

export const CreateThoughtResponse = z.object({
  thought: ThoughtSchema,
  links: z.lazy(() => LinkSchema.array()),
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
