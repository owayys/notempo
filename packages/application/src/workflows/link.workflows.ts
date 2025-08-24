import { LinkEntity } from "@domain/link/link.entity";
import { LinkRepository } from "@domain/link/link.repo";
import { type LinkType } from "@domain/link/link.schema";
import { autoInjectable } from "tsyringe";

@autoInjectable()
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
