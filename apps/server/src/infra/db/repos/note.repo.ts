import { NoteRepository, type NoteEntity, type NoteType } from "@domain/note";

export class DrizzleNoteRepository extends NoteRepository {
  override create(note: NoteEntity): Promise<NoteEntity> {
    throw new Error("Method not implemented.");
  }

  override findById(id: NoteType["id"]): Promise<NoteEntity | null> {
    throw new Error("Method not implemented.");
  }

  override delete(id: NoteType["id"]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  override findWithFilters(filters: Partial<NoteType>): Promise<NoteEntity[]> {
    throw new Error("Method not implemented.");
  }

  override update(note: NoteEntity): Promise<NoteEntity> {
    throw new Error("Method not implemented.");
  }
}
