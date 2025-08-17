import type { EntityCreateData, EntityType } from "@domain/utils/refined.type";
import { BaseEntity } from "@domain/utils/base.entity";

export type NoteType = EntityType<
  "Note",
  {
    text: string;
  }
>;

export type NoteCreateData = EntityCreateData<NoteType>;

export class NoteEntity extends BaseEntity<"Note"> implements NoteType {
  text: string;

  private constructor(data: NoteType) {
    super(data);
    this.text = data.text;
  }

  static create(data: NoteCreateData) {
    const noteData = {
      ...NoteEntity.init(),
      ...data,
    } as NoteType;

    return new NoteEntity(noteData);
  }

  static from(data: NoteType) {
    return new NoteEntity(data);
  }
}
