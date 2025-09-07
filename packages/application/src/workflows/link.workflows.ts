import { LinkEntity, type LinkType } from "@domain/link/link.entity";
import { LinkRepository } from "@domain/link/link.repo";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class LinkWorkflows {
  constructor(private readonly linkRepository: LinkRepository) {}

  async createLink(
    conceptId: LinkType["conceptId"],
    thoughtId: LinkType["thoughtId"],
    alias?: string,
  ) {
    const link = LinkEntity.create({ alias, conceptId, thoughtId });
    const result = await this.linkRepository.create(link);
    return result;
  }

  async getLinkById(id: LinkType["id"]) {
    const link = await this.linkRepository.findById(id);
    return link;
  }
}
