import type { ConceptEntity } from "@domain/concept/concept.entity";
import { ConceptNotFoundError } from "@domain/concept/concept.errors";
import type { ConceptType } from "@domain/concept/concept.schema";
import type {
  Paginated,
  PaginationParams,
  RepoResult,
  RepoUnitResult,
} from "@domain/utils";

export interface ConceptFindFilters {
  authorId: ConceptType["authorId"];
  label?: ConceptType["label"];
}

export abstract class ConceptRepository {
  abstract create(concept: ConceptEntity): Promise<RepoResult<ConceptEntity>>;
  abstract findById(
    id: ConceptType["id"],
    authorId: ConceptType["authorId"],
  ): Promise<RepoResult<ConceptEntity, ConceptNotFoundError>>;
  abstract findWithFilters(
    filters: ConceptFindFilters,
    paginationParams: PaginationParams,
  ): Promise<RepoResult<Paginated<ConceptEntity>, ConceptNotFoundError>>;
  abstract update(
    concept: ConceptEntity,
  ): Promise<RepoResult<ConceptEntity, ConceptNotFoundError>>;
  abstract delete(
    id: ConceptType["id"],
    authorId: ConceptType["authorId"],
  ): Promise<RepoUnitResult<ConceptNotFoundError>>;
}
