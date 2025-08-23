import { LinkRepository, type LinkEntity, type LinkType } from "@domain/link";

export class DrizzleLinkRepository extends LinkRepository {
  override create(link: LinkEntity): Promise<LinkEntity> {
    throw new Error("Method not implemented.");
  }

  override findById(id: LinkType["id"]): Promise<LinkEntity | null> {
    throw new Error("Method not implemented.");
  }

  override delete(id: LinkType["id"]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  override findWithFilters(filters: Partial<LinkType>): Promise<LinkEntity[]> {
    throw new Error("Method not implemented.");
  }

  override update(link: LinkEntity): Promise<LinkEntity> {
    throw new Error("Method not implemented.");
  }
}
