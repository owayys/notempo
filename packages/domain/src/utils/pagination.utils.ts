import { z } from "zod";

export const PaginationParamsSchema = z.object({
  page: z.number().positive().optional(),
  limit: z.number().positive().max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type PaginationParams = z.infer<typeof PaginationParamsSchema>;

export const withPaginationParams = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T> | T,
) => {
  const s = schema instanceof z.ZodObject ? schema.shape : schema;
  const schemaObj = schema instanceof z.ZodObject ? schema : z.object(s);

  return PaginationParamsSchema.extend(s).transform((data) => {
    const filters = {} as z.infer<typeof schemaObj>;
    const pagination = {} as PaginationParams;

    for (const [key, value] of Object.entries(data)) {
      if (key in PaginationParamsSchema.shape) {
        pagination[key as keyof typeof pagination] = value;
      } else {
        filters[key as keyof typeof filters] = value;
      }
    }

    return {
      filters,
      pagination,
    };
  });
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const DEFAULT_SORT_ORDER = "asc" as const;

export const PaginatedResultSchema = <T>(itemSchema: z.ZodSchema<T>) =>
  z.object({
    items: z.array(itemSchema),
    totalCount: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrevious: z.boolean(),
  });

export type Paginated<T> = {
  items: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

const getDefaultPagination = (params?: Partial<PaginationParams>) => {
  return {
    page: params?.page ?? DEFAULT_PAGE,
    limit: params?.limit ?? DEFAULT_LIMIT,
    sortOrder: params?.sortOrder ?? DEFAULT_SORT_ORDER,
  };
};

const calculateOffset = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

const createPaginatedResult = <T>(
  items: T[],
  totalCount: number,
  page: number,
  limit: number,
): Paginated<T> => {
  const totalPages = Math.ceil(totalCount / limit);

  return {
    items,
    totalCount,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
};

export const PaginationUtils = {
  calculateOffset,
  getDefaultPagination,
  createPaginatedResult,
} as const;
