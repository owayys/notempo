import type { NoteEntity } from "@domain/note/note.entity";
import { NoteNotFoundError } from "@domain/note/note.errors";
import type { NoteType } from "@domain/note/note.schema";
import type {
  Paginated,
  PaginationParams,
  RepoResult,
  RepoUnitResult,
} from "@domain/utils";

export abstract class NoteRepository {
  abstract create(note: NoteEntity): Promise<RepoResult<NoteEntity, Error>>;
  abstract findById(
    id: NoteType["id"]
  ): Promise<RepoResult<NoteEntity, NoteNotFoundError>>;
  abstract findWithFilters(
    filters: Partial<NoteType>,
    paginationParams: PaginationParams
  ): Promise<RepoResult<Paginated<NoteEntity>, NoteNotFoundError>>;
  abstract update(
    note: NoteEntity
  ): Promise<RepoResult<NoteEntity, NoteNotFoundError>>;
  abstract delete(
    id: NoteType["id"]
  ): Promise<RepoUnitResult<NoteNotFoundError>>;
}
