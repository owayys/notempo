import { defineEntitySchema, removeBaseFields } from "@domain/utils";
import z from "zod";

export const UserSchema = defineEntitySchema("UserId", {
  name: z.string().describe("The name of the user"),
  email: z.email().describe("The email of the user"),
  emailVerified: z
    .boolean()
    .describe("The email verification status of the user"),
  image: z.url().optional().describe("The profile image of the user"),
});
export type UserType = z.infer<typeof UserSchema>;
export type UserEncoded = z.input<typeof UserSchema>;

export const UserCreateData = removeBaseFields(UserSchema).omit({
  emailVerified: true,
});
export type UserCreateData = z.infer<typeof UserCreateData>;

export const UserUpdateData = UserCreateData.partial();
export type UserUpdateData = z.infer<typeof UserUpdateData>;
