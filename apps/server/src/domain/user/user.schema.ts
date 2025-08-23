import { defineEntitySchema } from "@domain/utils";
import z from "zod";

export const UserSchema = defineEntitySchema("UserId", {
  name: z.string().describe("The name of the user"),
});

export const UserCreateData = UserSchema.pick({ name: true });

export type UserType = z.infer<typeof UserSchema>;
export type UserEncoded = z.input<typeof UserSchema>;

export type UserCreateData = z.infer<typeof UserCreateData>;
