import { BaseEntity } from "@domain/utils/base.entity";
import { UserSchema, type UserCreateData, type UserType } from "@domain/user";
import { Result as R } from "@carbonteq/fp";
import { createValidator } from "@domain/utils";

const validate = createValidator(UserSchema);

export class UserEntity extends BaseEntity implements UserType {
  override id: UserType["id"];
  name: string;

  private constructor(data: UserType) {
    super(data);
    this.id = data.id;
    this.name = data.name;
  }

  static create(data: UserCreateData) {
    const userData = {
      ...UserSchema.baseInit(),
      ...data,
    } as UserType;

    return R.Ok(new UserEntity(userData));
  }

  static fromEncoded(data: UserType) {
    return validate(data).map((d) => new UserEntity(d));
  }

  serialize() {
    return validate(this);
  }
}
