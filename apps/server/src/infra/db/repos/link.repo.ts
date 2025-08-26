import { LinkEntity } from "@domain/link/link.entity";
import { LinkNotFoundError } from "@domain/link/link.errors";
import { LinkRepository } from "@domain/link/link.repo";
import type { LinkType } from "@domain/link/link.schema";
import {
  PaginationUtils,
  type Paginated,
  type PaginationParams,
  type RepoResult,
  type RepoUnitResult,
} from "@domain/utils";
import { injectable } from "tsyringe";
import { injectDb, type AppDatabase } from "@infra/db/client";
import { links } from "@infra/db/models";
import { enhanceEntityMapper } from "@infra/db/utils/repo.utils";
import { Result as R } from "@carbonteq/fp";
import { and, asc, desc, eq } from "drizzle-orm";

const mapper = enhanceEntityMapper((row: typeof links.$inferSelect) =>
  LinkEntity.fromEncoded({
    id: row.id,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    thoughtId: row.thoughtId,
    conceptId: row.conceptId,
    alias: row.alias ?? undefined,
  }),
);

@injectable()
export class DrizzleLinkRepository extends LinkRepository {
  constructor(@injectDb() private readonly db: AppDatabase) {
    super();
  }
  override async create(
    link: LinkEntity,
  ): Promise<RepoResult<LinkEntity, Error>> {
    const encoded = link.serialize();

    return await encoded
      .flatMap(async (linkData) => {
        const [inserted] = await this.db
          .insert(links)
          .values(linkData)
          .returning();

        if (!inserted) {
          return R.Err(new Error("Failed to insert link"));
        }

        return mapper.mapOne(inserted);
      })
      .toPromise();
  }

  override async findById(
    id: LinkType["id"],
  ): Promise<RepoResult<LinkEntity, LinkNotFoundError>> {
    try {
      const row = await this.db.query.links.findFirst({
        where: eq(links.id, id),
      });

      if (!row) {
        return R.Err(new LinkNotFoundError(id));
      }

      return mapper.mapOne(row);
    } catch {
      return R.Err(new LinkNotFoundError(id));
    }
  }

  override async findWithFilters(
    filters: Partial<LinkType>,
    paginationParams: PaginationParams,
  ): Promise<RepoResult<Paginated<LinkEntity>, LinkNotFoundError>> {
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
      pagination.sortOrder === "asc"
        ? asc(links.updatedAt)
        : desc(links.updatedAt);

    const conditions = [];

    if (filters.conceptId) {
      conditions.push(eq(links.conceptId, filters.conceptId));
    }

    if (filters.thoughtId) {
      conditions.push(eq(links.thoughtId, filters.thoughtId));
    }

    const where = and(...conditions);

    const totalCount = await this.db.$count(links, where);

    const rows = await this.db
      .select()
      .from(links)
      .where(where)
      .orderBy(orderBy)
      .limit(pagination.limit)
      .offset(offset);

    const linksResult = mapper.mapMany(rows);

    return linksResult.map((links) =>
      PaginationUtils.createPaginatedResult(
        links,
        totalCount,
        pagination.page,
        pagination.limit,
      ),
    );
  }

  override async update(
    link: LinkEntity,
  ): Promise<RepoResult<LinkEntity, LinkNotFoundError>> {
    const encoded = link.serialize();

    return await encoded
      .flatMap(async (linkData) => {
        const updateData = {
          ...linkData,
          updatedAt: new Date(),
        };

        const [updated] = await this.db
          .update(links)
          .set(updateData)
          .where(eq(links.id, linkData.id))
          .returning();

        if (!updated) {
          return R.Err(new LinkNotFoundError(link.id));
        }

        return mapper.mapOne(updated);
      })
      .toPromise();
  }

  override async delete(
    id: LinkType["id"],
  ): Promise<RepoUnitResult<LinkNotFoundError>> {
    try {
      const [deleted] = await this.db
        .delete(links)
        .where(eq(links.id, id))
        .returning();

      if (!deleted) {
        return R.Err(new LinkNotFoundError(id));
      }

      return R.UNIT_RESULT;
    } catch {
      return R.Err(new LinkNotFoundError(id));
    }
  }
}
