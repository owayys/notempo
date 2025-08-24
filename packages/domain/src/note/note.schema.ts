import { defineEntitySchema } from "@domain/utils";
import z from "zod";

export const NoteSchema = defineEntitySchema("NoteId", {
  text: z.string().describe("The content of the note"),
});
export const NoteCreateData = NoteSchema.pick({ text: true });

export type NoteType = z.infer<typeof NoteSchema>;
export type NoteEncoded = z.input<typeof NoteSchema>;

export type NoteCreateData = z.infer<typeof NoteCreateData>;
