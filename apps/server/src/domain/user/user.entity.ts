import { BaseEntity } from "@domain/utils/base.entity";
import { UserSchema, type UserCreateData, type UserType } from "@domain/user";
import { Result as R } from "@carbonteq/fp";

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

  static from(data: UserType) {
    return new UserEntity(data);
  }
}
