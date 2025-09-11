import { ConceptSchema } from "@domain/concept/concept.entity";
import { ThoughtSchema } from "@domain/thought/thought.entity";
import {
  BaseEntity,
  C,
  createCodec,
  defineEntitySchema,
  removeBaseFields,
} from "@domain/utils";
import z from "zod";

export const LinkSchema = defineEntitySchema("LinkId", {
  thoughtId: ThoughtSchema.id,
  conceptId: ConceptSchema.id,
  alias: C.opt(z.string()).describe("An optional alias for the link"),
});

export type LinkType = z.infer<typeof LinkSchema>;
export type LinkEncoded = z.input<typeof LinkSchema>;

export const LinkCreateData = removeBaseFields(LinkSchema);
export type LinkCreateData = z.infer<typeof LinkCreateData>;

const codec = createCodec(LinkSchema);

export class LinkEntity extends BaseEntity implements LinkType {
  override id: LinkType["id"];
  conceptId: LinkType["conceptId"];
  thoughtId: LinkType["thoughtId"];
  alias: LinkType["alias"];

  private constructor(data: LinkType) {
    super(data);
    this.id = data.id;
    this.conceptId = data.conceptId;
    this.thoughtId = data.thoughtId;
    this.alias = data.alias;
  }

  static create(data: LinkCreateData) {
    const linkData = {
      ...LinkSchema.baseInit(),
      ...data,
    } as LinkType;

    return new LinkEntity(linkData);
  }

  static fromEncoded(encoded: LinkEncoded) {
    return codec.deserialize(encoded).map((d) => new LinkEntity(d));
  }

  serialize() {
    return codec.serialize(this);
  }
}
