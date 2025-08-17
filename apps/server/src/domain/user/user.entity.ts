import type { EntityCreateData, EntityType } from "@domain/utils/refined.type";
import { BaseEntity } from "@domain/utils/base.entity";

export type UserType = EntityType<
  "User",
  {
    name: string;
  }
>;

export type UserCreateData = EntityCreateData<UserType>;

export class UserEntity extends BaseEntity<"User"> implements UserType {
  name: string;

  private constructor(data: UserType) {
    super(data);
    this.name = data.name;
  }

  static create(data: UserCreateData) {
    const userData = {
      ...UserEntity.init(),
      ...data,
    } as UserType;

    return new UserEntity(userData);
  }

  static from(data: UserType) {
    return new UserEntity(data);
  }
}
