import type {
  EntityCreateData,
  EntityType,
  UUID,
} from "@domain/utils/refined.type";
import type { UserType } from "@domain/user/user.entity";
import { BaseEntity } from "@domain/utils/base.entity";

export type NoteType = EntityType<
  "Note",
  {
    authorId: UserType["id"];
    text: string;
  }
>;

export type NoteCreateData = EntityCreateData<NoteType>;

export class NoteEntity extends BaseEntity<"Note"> implements NoteType {
  authorId: UUID<"User">;
  text: string;

  private constructor(data: NoteType) {
    super(data);
    this.authorId = data.authorId;
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
