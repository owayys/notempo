import { BaseEntity } from "@domain/utils";
import { Result as R } from "@carbonteq/fp";
import { NoteSchema, type NoteCreateData, type NoteType } from "@domain/note";

export class NoteEntity extends BaseEntity implements NoteType {
  override id: NoteType["id"];
  text: string;

  private constructor(data: NoteType) {
    super(data);
    this.id = data.id;
    this.text = data.text;
  }

  static create(data: NoteCreateData) {
    const noteData = {
      ...NoteSchema.baseInit(),
      ...data,
    } as NoteType;

    return R.Ok(new NoteEntity(noteData));
  }

  static from(data: NoteType) {
    return new NoteEntity(data);
  }
}
