import { UserSchema } from "@domain/user/user.schema";
import { defineEntitySchema, removeBaseFields } from "@domain/utils";
import z from "zod";

export const ThoughtSchema = defineEntitySchema("ThoughtId", {
  text: z.string().describe("The content of the thought"),
  authorId: UserSchema.id,
});
export type ThoughtType = z.infer<typeof ThoughtSchema>;
export type ThoughtEncoded = z.input<typeof ThoughtSchema>;

export const ThoughtCreateData = removeBaseFields(ThoughtSchema);
export type ThoughtCreateData = z.infer<typeof ThoughtCreateData>;
