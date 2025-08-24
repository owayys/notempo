import { BaseEntity, createValidator } from "@domain/utils";
import {
  LinkSchema,
  type LinkCreateData,
  type LinkType,
} from "@domain/link/link.schema";
import type { ConceptType } from "@domain/concept/concept.schema";
import type { NoteType } from "@domain/note/note.schema";

const validate = createValidator(LinkSchema);

export class LinkEntity extends BaseEntity implements LinkType {
  override id: LinkType["id"];
  conceptId: ConceptType["id"];
  noteId: NoteType["id"];
  alias: string | undefined;

  private constructor(data: LinkType) {
    super(data);
    this.id = data.id;
    this.conceptId = data.conceptId;
    this.noteId = data.noteId;
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
