import type { NoteEntity, NoteType } from "@domain/note";

export abstract class NoteRepository {
  abstract create(note: NoteEntity): Promise<NoteEntity>;
  abstract findById(id: NoteType["id"]): Promise<NoteEntity | null>;
  abstract findWithFilters(filters: Partial<NoteType>): Promise<NoteEntity[]>;
  abstract update(note: NoteEntity): Promise<NoteEntity>;
  abstract delete(id: NoteType["id"]): Promise<void>;
}
