import type { LinkEntity } from "@domain/link/link.entity";
import { LinkNotFoundError } from "@domain/link/link.errors";
import type { LinkType } from "@domain/link/link.schema";
import type {
  Paginated,
  PaginationParams,
  RepoResult,
  RepoUnitResult,
} from "@domain/utils";

export abstract class LinkRepository {
  abstract create(link: LinkEntity): Promise<RepoResult<LinkEntity, Error>>;
  abstract findById(
    id: LinkType["id"]
  ): Promise<RepoResult<LinkEntity, LinkNotFoundError>>;
  abstract findWithFilters(
    filters: Partial<LinkType>,
    paginationParams: PaginationParams
  ): Promise<RepoResult<Paginated<LinkEntity>, LinkNotFoundError>>;
  abstract update(
    link: LinkEntity
  ): Promise<RepoResult<LinkEntity, LinkNotFoundError>>;
  abstract delete(
    id: LinkType["id"]
  ): Promise<RepoUnitResult<LinkNotFoundError>>;
}
