import type { ThoughtEntity } from "@domain/thought/thought.entity";
import { ThoughtNotFoundError } from "@domain/thought/thought.errors";
import type { ThoughtType } from "@domain/thought/thought.schema";
import type {
  Paginated,
  PaginationParams,
  RepoResult,
  RepoUnitResult,
} from "@domain/utils";

export abstract class ThoughtRepository {
  abstract create(
    thought: ThoughtEntity,
  ): Promise<RepoResult<ThoughtEntity, Error>>;
  abstract findById(
    id: ThoughtType["id"],
  ): Promise<RepoResult<ThoughtEntity, ThoughtNotFoundError>>;
  abstract findWithFilters(
    filters: Partial<ThoughtType>,
    paginationParams: PaginationParams,
  ): Promise<RepoResult<Paginated<ThoughtEntity>, ThoughtNotFoundError>>;
  abstract update(
    thought: ThoughtEntity,
  ): Promise<RepoResult<ThoughtEntity, ThoughtNotFoundError>>;
  abstract delete(
    id: ThoughtType["id"],
  ): Promise<RepoUnitResult<ThoughtNotFoundError>>;
}
