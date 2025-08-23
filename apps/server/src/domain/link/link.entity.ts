import { BaseEntity } from "@domain/utils";
import { LinkSchema, type LinkCreateData, type LinkType } from "@domain/link";
import type { ConceptType } from "@domain/concept";
import type { NoteType } from "@domain/note";
import { Result as R } from "@carbonteq/fp";

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

    return R.Ok(new LinkEntity(linkData));
  }
}
