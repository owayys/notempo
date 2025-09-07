import type { ConceptType } from "@domain/concept/concept.entity";
import { ConceptSchema } from "@domain/concept/concept.entity";
import type { ThoughtType } from "@domain/thought/thought.entity";
import { ThoughtSchema } from "@domain/thought/thought.entity";
import {
  BaseEntity,
  createValidator,
  defineEntitySchema,
  removeBaseFields,
} from "@domain/utils";
import z from "zod";

export const LinkSchema = defineEntitySchema("LinkId", {
  thoughtId: ThoughtSchema.id,
  conceptId: ConceptSchema.id,
  alias: z.string().optional().describe("An optional alias for the link"),
});

export type LinkType = z.infer<typeof LinkSchema>;
export type LinkEncoded = z.input<typeof LinkSchema>;

export const LinkCreateData = removeBaseFields(LinkSchema);
export type LinkCreateData = z.infer<typeof LinkCreateData>;

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
