import type { LinkEntity, LinkType } from "@domain/link";

export abstract class LinkRepository {
  abstract create(link: LinkEntity): Promise<LinkEntity>;
  abstract findById(id: LinkType["id"]): Promise<LinkEntity | null>;
  abstract findWithFilters(filters: Partial<LinkType>): Promise<LinkEntity[]>;
  abstract update(link: LinkEntity): Promise<LinkEntity>;
  abstract delete(id: LinkType["id"]): Promise<void>;
}
