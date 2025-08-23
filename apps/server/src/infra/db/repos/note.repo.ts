import { NoteEntity, NoteRepository, type NoteType } from "@domain/note";
import { enhanceEntityMapper } from "../utils/repo.utils";
import type { notes } from "@infra/db/models";

const mapper = enhanceEntityMapper((row: typeof notes.$inferSelect) =>
  NoteEntity.fromEncoded({
    id: row.id,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    text: row.text,
  })
);

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
