import { NoteEntity } from "@domain/note/note.entity";
import { NoteNotFoundError } from "@domain/note/note.errors";
import { NoteRepository } from "@domain/note/note.repo";
import type { NoteType } from "@domain/note/note.schema";
import { enhanceEntityMapper } from "../utils/repo.utils";
import { notes } from "@infra/db/models";
import { injectable } from "tsyringe";
import { injectDb, type AppDatabase } from "@infra/db/client";
import { Result as R } from "@carbonteq/fp";
import {
  PaginationUtils,
  type Paginated,
  type PaginationParams,
  type RepoResult,
  type RepoUnitResult,
} from "@domain/utils";
import { and, asc, desc, eq, ilike } from "drizzle-orm";

const mapper = enhanceEntityMapper((row: typeof notes.$inferSelect) =>
  NoteEntity.fromEncoded({
    id: row.id,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    text: row.text,
  })
);

@injectable()
export class DrizzleNoteRepository extends NoteRepository {
  constructor(@injectDb() private readonly db: AppDatabase) {
    super();
  }

  override async create(
    note: NoteEntity
  ): Promise<RepoResult<NoteEntity, Error>> {
    const encoded = note.serialize();

    return await encoded
      .flatMap(async (noteData) => {
        const [inserted] = await this.db
          .insert(notes)
          .values(noteData)
          .returning();

        if (!inserted) {
          return R.Err(new Error("Failed to insert note"));
        }

        return mapper.mapOne(inserted);
      })
      .toPromise();
  }

  override async findById(
    id: NoteType["id"]
  ): Promise<RepoResult<NoteEntity, NoteNotFoundError>> {
    try {
      const row = await this.db.query.notes.findFirst({
        where: eq(notes.id, id),
      });

      if (!row) {
        return R.Err(new NoteNotFoundError(id));
      }

      return mapper.mapOne(row);
    } catch {
      return R.Err(new NoteNotFoundError(id));
    }
  }

  override async findWithFilters(
    filters: Partial<NoteType>,
    paginationParams: PaginationParams
  ): Promise<RepoResult<Paginated<NoteEntity>, NoteNotFoundError>> {
    const pagination = PaginationUtils.getDefaultPagination({
      page: paginationParams.page,
      limit: paginationParams.limit,
      sortOrder: paginationParams.sortOrder,
    });

    const offset = PaginationUtils.calculateOffset(
      pagination.page,
      pagination.limit
    );

    const orderBy =
      paginationParams.sortBy === "text"
        ? pagination.sortOrder === "asc"
          ? asc(notes.text)
          : desc(notes.text)
        : pagination.sortOrder === "asc"
        ? asc(notes.updatedAt)
        : desc(notes.updatedAt);

    const conditions = [ilike(notes.text, `%${filters.text ?? ""}%`)];

    const where = and(...conditions);

    const totalCount = await this.db.$count(notes, where);

    const rows = await this.db
      .select()
      .from(notes)
      .where(where)
      .orderBy(orderBy)
      .limit(pagination.limit)
      .offset(offset);

    const notesResult = mapper.mapMany(rows);

    return notesResult.map((notes) =>
      PaginationUtils.createPaginatedResult(
        notes,
        totalCount,
        pagination.page,
        pagination.limit
      )
    );
  }

  override async update(
    note: NoteEntity
  ): Promise<RepoResult<NoteEntity, NoteNotFoundError>> {
    const encoded = note.serialize();

    return await encoded
      .flatMap(async (noteData) => {
        const updateData = {
          ...noteData,
          updatedAt: new Date(),
        };

        const [updated] = await this.db
          .update(notes)
          .set(updateData)
          .where(eq(notes.id, noteData.id))
          .returning();

        if (!updated) {
          return R.Err(new NoteNotFoundError(note.id));
        }

        return mapper.mapOne(updated);
      })
      .toPromise();
  }

  override async delete(
    id: NoteType["id"]
  ): Promise<RepoUnitResult<NoteNotFoundError>> {
    try {
      const [deleted] = await this.db
        .delete(notes)
        .where(eq(notes.id, id))
        .returning();

      if (!deleted) {
        return R.Err(new NoteNotFoundError(id));
      }

      return R.UNIT_RESULT;
    } catch {
      return R.Err(new NoteNotFoundError(id));
    }
  }
}
