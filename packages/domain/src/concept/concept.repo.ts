import type { ConceptEntity } from "@domain/concept/concept.entity";
import { ConceptNotFoundError } from "@domain/concept/concept.errors";
import type { ConceptType } from "@domain/concept/concept.schema";
import type {
  Paginated,
  PaginationParams,
  RepoResult,
  RepoUnitResult,
} from "@domain/utils";

export abstract class ConceptRepository {
  abstract create(
    concept: ConceptEntity
  ): Promise<RepoResult<ConceptEntity, Error>>;
  abstract findById(
    id: ConceptType["id"]
  ): Promise<RepoResult<ConceptEntity, ConceptNotFoundError>>;
  abstract findWithFilters(
    filters: Partial<ConceptType>,
    paginationParams: PaginationParams
  ): Promise<RepoResult<Paginated<ConceptEntity>, ConceptNotFoundError>>;
  abstract update(
    concept: ConceptEntity
  ): Promise<RepoResult<ConceptEntity, ConceptNotFoundError>>;
  abstract delete(
    id: ConceptType["id"]
  ): Promise<RepoUnitResult<ConceptNotFoundError>>;
}
