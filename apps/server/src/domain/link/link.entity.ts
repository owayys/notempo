import type {
  ConceptEntity,
  ConceptType,
} from "@domain/concept/concept.entity";
import type { NoteEntity, NoteType } from "@domain/note/note.entity";
import { BaseEntity } from "@domain/utils/base.entity";
import type { EntityCreateData, EntityType } from "@domain/utils/refined.type";

export type LinkType = EntityType<
  "Link",
  {
    conceptId: ConceptType["id"];
    noteId: NoteType["id"];
  }
>;

export type LinkCreateData = EntityCreateData<LinkType>;

export class LinkEntity extends BaseEntity<"Link"> implements LinkType {
  conceptId: ConceptType["id"];
  noteId: NoteType["id"];

  private constructor(data: LinkType) {
    super(data);
    (this.conceptId = data.conceptId), (this.noteId = data.noteId);
  }

  static create(data: LinkCreateData, concept: ConceptType, note: NoteType) {
    const linkData = {
      ...LinkEntity.init(),
      ...data,
      conceptId: concept.id,
      noteId: note.id,
    } as LinkType;

    return new LinkEntity(linkData);
  }
}
