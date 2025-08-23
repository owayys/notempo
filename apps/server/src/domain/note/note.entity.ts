import { BaseEntity, createValidator } from "@domain/utils";
import { NoteSchema, type NoteCreateData, type NoteType } from "@domain/note";

const validate = createValidator(NoteSchema);

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

    return new NoteEntity(noteData);
  }

  static fromEncoded(data: NoteType) {
    return validate(data).map((d) => new NoteEntity(d));
  }

  serialize() {
    return validate(this);
  }
}
