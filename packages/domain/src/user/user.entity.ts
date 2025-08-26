import { Result as R } from "@carbonteq/fp";
import {
  type UserCreateData,
  type UserEncoded,
  UserSchema,
  type UserType,
} from "@domain/user/user.schema";
import { createValidator } from "@domain/utils";
import { BaseEntity } from "@domain/utils/base.entity";

const validate = createValidator(UserSchema);

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

  static fromEncoded(data: UserEncoded) {
    return validate(data).map((d) => new UserEntity(d));
  }

  serialize() {
    return validate(this);
  }
}
