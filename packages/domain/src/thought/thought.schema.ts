import { defineEntitySchema } from "@domain/utils";
import z from "zod";

export const ThoughtSchema = defineEntitySchema("ThoughtId", {
  text: z.string().describe("The content of the thought"),
});
export const ThoughtCreateData = ThoughtSchema.pick({ text: true });

export type ThoughtType = z.infer<typeof ThoughtSchema>;
export type ThoughtEncoded = z.input<typeof ThoughtSchema>;

export type ThoughtCreateData = z.infer<typeof ThoughtCreateData>;
