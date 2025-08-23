import { Result } from "@carbonteq/fp";
import type z from "zod";
import { zodErrorToValidationError, type ValidationError } from "@domain/utils";

export const createValidator = <T>(schema: z.ZodSchema<T>) => {
  return (data: unknown): Result<T, ValidationError> => {
    const result = schema.safeParse(data);
    if (result.success) {
      return Result.Ok(result.data);
    } else {
      return Result.Err(zodErrorToValidationError(result.error));
    }
  };
};

export type ExtendedSchema<T, Methods extends Record<string, unknown>> = T &
  Methods;

export const addMethodsToSchema = <T, Methods extends Record<string, unknown>>(
  schema: T,
  methods: Methods
): ExtendedSchema<T, Methods> => {
  const extended = schema as ExtendedSchema<T, Methods>;
  for (const [key, value] of Object.entries(methods)) {
    (extended as any)[key] = value;
  }
  return extended;
};
