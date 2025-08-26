import type { ConceptType } from "@domain/concept/concept.schema";
import {
  type LinkCreateData,
  LinkSchema,
  type LinkType,
} from "@domain/link/link.schema";
import type { ThoughtType } from "@domain/thought/thought.schema";
import { BaseEntity, createValidator } from "@domain/utils";

const validate = createValidator(LinkSchema);

export class LinkEntity extends BaseEntity implements LinkType {
  override id: LinkType["id"];
  conceptId: ConceptType["id"];
  thoughtId: ThoughtType["id"];
  alias: string | undefined;

  private constructor(data: LinkType) {
    super(data);
    this.id = data.id;
    this.conceptId = data.conceptId;
    this.thoughtId = data.thoughtId;
  }

  static create(data: LinkCreateData) {
    const linkData = {
      ...LinkSchema.baseInit(),
      ...data,
    } as LinkType;

    return new LinkEntity(linkData);
  }

  static fromEncoded(data: LinkType) {
    return validate(data).map((d) => new LinkEntity(d));
  }

  serialize() {
    return validate(this);
  }
}
