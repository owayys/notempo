import type { ThoughtEntity } from "@domain/thought/thought.entity";
import { ThoughtNotFoundError } from "@domain/thought/thought.errors";
import type { ThoughtType } from "@domain/thought/thought.schema";
import type {
  Paginated,
  PaginationParams,
  RepoResult,
  RepoUnitResult,
} from "@domain/utils";

export interface ThoughtFindFilters {
  authorId: ThoughtType["authorId"];
  text?: ThoughtType["text"];
}

export abstract class ThoughtRepository {
  abstract create(thought: ThoughtEntity): Promise<RepoResult<ThoughtEntity>>;
  abstract findById(
    id: ThoughtType["id"],
    authorId: ThoughtType["authorId"],
  ): Promise<RepoResult<ThoughtEntity, ThoughtNotFoundError>>;
  abstract findWithFilters(
    filters: ThoughtFindFilters,
    paginationParams: PaginationParams,
  ): Promise<RepoResult<Paginated<ThoughtEntity>, ThoughtNotFoundError>>;
  abstract update(
    thought: ThoughtEntity,
    authorId: ThoughtType["authorId"],
  ): Promise<RepoResult<ThoughtEntity, ThoughtNotFoundError>>;
  abstract delete(
    id: ThoughtType["id"],
    authorId: ThoughtType["authorId"],
  ): Promise<RepoUnitResult<ThoughtNotFoundError>>;
}
