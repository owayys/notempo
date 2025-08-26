import type { RepoResult, RepoUnitResult } from "@domain/utils";
import type { UserEntity } from "./user.entity";
import type { UserType, UserUpdateData } from "./user.schema";
import type { UserNotFoundError } from "./user.errors";

export abstract class UserRepository {
  abstract create(user: UserEntity): Promise<RepoResult<UserEntity>>;
  abstract findById(
    id: UserType["id"],
  ): Promise<RepoResult<UserEntity, UserNotFoundError>>;
  abstract findByEmail(
    email: UserType["email"],
  ): Promise<RepoResult<UserEntity, UserNotFoundError>>;
  abstract update(
    id: UserType["id"],
    updates: UserUpdateData,
  ): Promise<RepoResult<UserEntity, UserNotFoundError>>;
  abstract delete(
    id: UserType["id"],
  ): Promise<RepoUnitResult<UserNotFoundError>>;
  abstract exists(id: UserType["id"]): Promise<boolean>;
  abstract existsByEmail(email: UserType["email"]): Promise<boolean>;
}
