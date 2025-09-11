import { Result } from "@carbonteq/fp";
import type { UserType } from "@domain/user/user.entity";
import { type ValidationError } from "@domain/utils/base.errors";
import { zodErrorToValidationError } from "@domain/utils/validation.utils";
import z from "zod";

export type WithUser<T, K extends string = "authorId"> = T & {
  [P in K]: UserType["id"];
};

const encodeDecodeOpts: z.core.ParseContext<z.core.$ZodIssue> = {
  reportInput: true,
} as const;

export const parseResToResult = <T>(
  parseRes: z.ZodSafeParseResult<T>,
): Result<T, ValidationError> =>
  parseRes.success
    ? Result.Ok(parseRes.data)
    : Result.Err(zodErrorToValidationError(parseRes.error));

export const createCodec = <TOut, TIn>(
  schema: z.ZodSchema<TOut, TIn>,
) => ({
  serialize: (value: TOut): Result<TIn, ValidationError> =>
    parseResToResult(schema.safeEncode(value, encodeDecodeOpts)),
  deserialize: (value: TIn): Result<TOut, ValidationError> =>
    parseResToResult(schema.safeDecode(value, encodeDecodeOpts)),
});

export type ExtendedSchema<T, Methods extends Record<string, unknown>> = T &
  Methods;

export const addMethodsToSchema = <T, Methods extends Record<string, unknown>>(
  schema: T,
  methods: Methods,
): ExtendedSchema<T, Methods> => {
  const extended = schema as ExtendedSchema<T, Methods>;
  for (const [key, value] of Object.entries(methods)) {
    // biome-ignore lint/suspicious/noExplicitAny: Have to work around the type system here
    (extended as any)[key] = value;
  }
  return extended;
};

export const removeBaseFields = <T extends z.ZodObject>({ shape }: T) => {
  const { id: _, createdAt: __, updatedAt: ___, ...fieldsWithoutBase } = shape;

  return z.object(fieldsWithoutBase) as z.ZodObject<
    Omit<T["shape"], "id" | "createdAt" | "updatedAt">
  >;
};
