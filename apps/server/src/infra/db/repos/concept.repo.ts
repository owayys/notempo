import { Result as R } from "@carbonteq/fp";
import { ConceptEntity } from "@domain/concept/concept.entity";
import {
  ConceptNotFoundError,
  ConceptValidationError,
} from "@domain/concept/concept.errors";
import {
  type ConceptFindFilters,
  ConceptRepository,
} from "@domain/concept/concept.repo";
import type { ConceptType } from "@domain/concept/concept.schema";
import {
  type Paginated,
  type PaginationParams,
  PaginationUtils,
  type RepoResult,
  type RepoUnitResult,
} from "@domain/utils";
import { type AppDatabase, injectDb } from "@infra/db/client";
import { concepts } from "@infra/db/models";
import { enhanceEntityMapper } from "@infra/db/utils/repo.utils";
import { and, asc, desc, eq, ilike } from "drizzle-orm";
import { injectable } from "tsyringe";

const mapper = enhanceEntityMapper((row: typeof concepts.$inferSelect) =>
  ConceptEntity.fromEncoded({
    id: row.id,
    authorId: row.authorId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    label: row.label,
  }),
);

@injectable()
export class DrizzleConceptRepository extends ConceptRepository {
  constructor(@injectDb() private readonly db: AppDatabase) {
    super();
  }
  override async create(
    concept: ConceptEntity,
  ): Promise<RepoResult<ConceptEntity>> {
    const encoded = concept.serialize();

    return await encoded
      .flatMap(async (conceptData) => {
        const [inserted] = await this.db
          .insert(concepts)
          .values(conceptData)
          .returning();

        if (!inserted) {
          return R.Err(new ConceptValidationError("Failed to insert concept"));
        }

        return mapper.mapOne(inserted);
      })
      .toPromise();
  }

  override async findById(
    id: ConceptType["id"],
  ): Promise<RepoResult<ConceptEntity, ConceptNotFoundError>> {
    try {
      const row = await this.db.query.concepts.findFirst({
        where: eq(concepts.id, id),
      });

      if (!row) {
        return R.Err(new ConceptNotFoundError(id));
      }

      return mapper.mapOne(row);
    } catch {
      return R.Err(new ConceptNotFoundError(id));
    }
  }

  override async findWithFilters(
    filters: ConceptFindFilters,
    paginationParams: PaginationParams,
  ): Promise<RepoResult<Paginated<ConceptEntity>, ConceptNotFoundError>> {
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
          ? asc(concepts.label)
          : desc(concepts.label)
        : pagination.sortOrder === "asc"
          ? asc(concepts.updatedAt)
          : desc(concepts.updatedAt);

    const conditions = [ilike(concepts.label, `%${filters.label ?? ""}%`)];

    const where = and(...conditions);

    const totalCount = await this.db.$count(concepts, where);

    const rows = await this.db
      .select()
      .from(concepts)
      .where(where)
      .orderBy(orderBy)
      .limit(pagination.limit)
      .offset(offset);

    const conceptsResult = mapper.mapMany(rows);

    return conceptsResult.map((concepts) =>
      PaginationUtils.createPaginatedResult(
        concepts,
        totalCount,
        pagination.page,
        pagination.limit,
      ),
    );
  }

  override async update(
    concept: ConceptEntity,
  ): Promise<RepoResult<ConceptEntity, ConceptNotFoundError>> {
    const encoded = concept.serialize();

    return await encoded
      .flatMap(async (conceptData) => {
        const updateData = {
          ...conceptData,
          updatedAt: new Date(),
        };

        const [updated] = await this.db
          .update(concepts)
          .set(updateData)
          .where(eq(concepts.id, conceptData.id))
          .returning();

        if (!updated) {
          return R.Err(new ConceptNotFoundError(concept.id));
        }

        return mapper.mapOne(updated);
      })
      .toPromise();
  }

  override async delete(
    id: ConceptType["id"],
  ): Promise<RepoUnitResult<ConceptNotFoundError>> {
    try {
      const [deleted] = await this.db
        .delete(concepts)
        .where(eq(concepts.id, id))
        .returning();

      if (!deleted) {
        return R.Err(new ConceptNotFoundError(id));
      }

      return R.UNIT_RESULT;
    } catch {
      return R.Err(new ConceptNotFoundError(id));
    }
  }
}
