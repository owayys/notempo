import { ThoughtEntity } from "@domain/thought/thought.entity";
import {
  ThoughtNotFoundError,
  ThoughtValidationError,
} from "@domain/thought/thought.errors";
import {
  ThoughtRepository,
  type ThoughtFindFilters,
} from "@domain/thought/thought.repo";
import type { ThoughtType } from "@domain/thought/thought.schema";
import { enhanceEntityMapper } from "../utils/repo.utils";
import { thoughts } from "@infra/db/models";
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

const mapper = enhanceEntityMapper((row: typeof thoughts.$inferSelect) =>
  ThoughtEntity.fromEncoded({
    id: row.id,
    authorId: row.authorId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    text: row.text,
  }),
);

@injectable()
export class DrizzleThoughtRepository extends ThoughtRepository {
  constructor(@injectDb() private readonly db: AppDatabase) {
    super();
  }

  override async create(
    thought: ThoughtEntity,
  ): Promise<RepoResult<ThoughtEntity>> {
    const encoded = thought.serialize();

    return await encoded
      .flatMap(async (thoughtData) => {
        const [inserted] = await this.db
          .insert(thoughts)
          .values(thoughtData)
          .returning();

        if (!inserted) {
          return R.Err(new ThoughtValidationError("Failed to insert thought"));
        }

        return mapper.mapOne(inserted);
      })
      .toPromise();
  }

  override async findById(
    id: ThoughtType["id"],
  ): Promise<RepoResult<ThoughtEntity, ThoughtNotFoundError>> {
    try {
      const row = await this.db.query.thoughts.findFirst({
        where: eq(thoughts.id, id),
      });

      if (!row) {
        return R.Err(new ThoughtNotFoundError(id));
      }

      return mapper.mapOne(row);
    } catch {
      return R.Err(new ThoughtNotFoundError(id));
    }
  }

  override async findWithFilters(
    filters: ThoughtFindFilters,
    paginationParams: PaginationParams,
  ): Promise<RepoResult<Paginated<ThoughtEntity>, ThoughtNotFoundError>> {
    const pagination = PaginationUtils.getDefaultPagination({
      page: paginationParams.page,
      limit: paginationParams.limit,
      sortOrder: paginationParams.sortOrder,
    });

    const offset = PaginationUtils.calculateOffset(
      pagination.page,
      pagination.limit,
    );

    const orderBy =
      paginationParams.sortBy === "text"
        ? pagination.sortOrder === "asc"
          ? asc(thoughts.text)
          : desc(thoughts.text)
        : pagination.sortOrder === "asc"
        ? asc(thoughts.updatedAt)
        : desc(thoughts.updatedAt);

    const conditions = [eq(thoughts.authorId, filters.authorId)];

    if (filters.text) {
      conditions.push(ilike(thoughts.text, `%${filters.text ?? ""}%`));
    }

    const where = and(...conditions);

    const totalCount = await this.db.$count(thoughts, where);

    const rows = await this.db
      .select()
      .from(thoughts)
      .where(where)
      .orderBy(orderBy)
      .limit(pagination.limit)
      .offset(offset);

    const thoughtsResult = mapper.mapMany(rows);

    return thoughtsResult.map((thoughts) =>
      PaginationUtils.createPaginatedResult(
        thoughts,
        totalCount,
        pagination.page,
        pagination.limit,
      ),
    );
  }

  override async update(
    thought: ThoughtEntity,
  ): Promise<RepoResult<ThoughtEntity, ThoughtNotFoundError>> {
    const encoded = thought.serialize();

    return await encoded
      .flatMap(async (thoughtData) => {
        const updateData = {
          ...thoughtData,
          updatedAt: new Date(),
        };

        const [updated] = await this.db
          .update(thoughts)
          .set(updateData)
          .where(eq(thoughts.id, thoughtData.id))
          .returning();

        if (!updated) {
          return R.Err(new ThoughtNotFoundError(thought.id));
        }

        return mapper.mapOne(updated);
      })
      .toPromise();
  }

  override async delete(
    id: ThoughtType["id"],
  ): Promise<RepoUnitResult<ThoughtNotFoundError>> {
    try {
      const [deleted] = await this.db
        .delete(thoughts)
        .where(eq(thoughts.id, id))
        .returning();

      if (!deleted) {
        return R.Err(new ThoughtNotFoundError(id));
      }

      return R.UNIT_RESULT;
    } catch {
      return R.Err(new ThoughtNotFoundError(id));
    }
  }
}
