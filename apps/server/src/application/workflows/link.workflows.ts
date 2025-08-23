import { LinkEntity, type LinkRepository, type LinkType } from "@domain/link";

export class LinkWorkflows {
  constructor(private readonly linkRepository: LinkRepository) {}

  async createLink(
    conceptId: LinkType["conceptId"],
    noteId: LinkType["noteId"],
    alias?: string
  ) {
    const link = LinkEntity.create({ alias, conceptId, noteId });
    const result = await this.linkRepository.create(link);
    return result;
  }

  async getLinkById(id: LinkType["id"]) {
    const link = await this.linkRepository.findById(id);
    return link;
  }
}
