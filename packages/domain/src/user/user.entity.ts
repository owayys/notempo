import { Result as R } from "@carbonteq/fp";
import {
  C,
  createCodec,
  defineEntitySchema,
  removeBaseFields,
} from "@domain/utils";
import { BaseEntity } from "@domain/utils/base.entity";
import z from "zod";

export const UserSchema = defineEntitySchema("UserId", {
  name: z.string().describe("The name of the user"),
  email: z.email().describe("The email of the user"),
  emailVerified: z
    .boolean()
    .describe("The email verification status of the user"),
  image: C.opt(C.stringToURL).describe("The profile image of the user"),
});
export type UserType = z.infer<typeof UserSchema>;
export type UserEncoded = z.input<typeof UserSchema>;

export const UserCreateSchema = removeBaseFields(UserSchema).omit({
  emailVerified: true,
});
export type UserCreateData = z.infer<typeof UserCreateSchema>;

export const UserUpdateSchema = UserCreateSchema.partial();
export type UserUpdateData = z.infer<typeof UserUpdateSchema>;

const codec = createCodec(UserSchema);

export class UserEntity extends BaseEntity implements UserType {
  override id: UserType["id"];
  name: UserType["name"];
  email: UserType["email"];
  emailVerified: UserType["emailVerified"];
  image: UserType["image"];

  private constructor(data: UserType) {
    super(data);
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.emailVerified = data.emailVerified;
    this.image = data.image;
  }

  static create(data: UserCreateData) {
    const userData = {
      ...UserSchema.baseInit(),
      ...data,
      emailVerified: false,
    } as UserType;

    return R.Ok(new UserEntity(userData));
  }

  static fromEncoded(encoded: UserEncoded) {
    return codec.deserialize(encoded).map((d) => new UserEntity(d));
  }

  serialize() {
    return codec.serialize(this);
  }
}
