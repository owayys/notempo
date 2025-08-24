import type { Result } from "@carbonteq/fp";
import { createValidator } from "@domain/utils";
import type { ValidationError } from "@domain/utils/base.errors";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import z from "zod";

type DtoSchemaInput<T, Out, In> = {
  schema: z.ZodSchema<Out, In>;
  create: (data: unknown) => Result<T, ValidationError>;
};

type DtoSchemaOutput<T, In> = StandardSchemaV1<In, T>;

type TSimpleDto<_Name extends string, Dto> = Dto;

// Ensures that DTOs are only created through the static `create` method, also prevents bypassing validation via subclassing
const RuntimeValidationToken = Symbol.for("EnsureValidationThroughCreation");

export const simpleSchemaDto = <Name extends string, A, I>(
  className: Name,
  schema: z.ZodSchema<A, I>
) => {
  class SimpleDto {
    static readonly schema = schema;

    protected constructor(
      readonly data: A,
      token: typeof RuntimeValidationToken
    ) {
      if (token !== RuntimeValidationToken) {
        throw new Error(
          `${className} should only be instantiated through the static create method. Use ${className}.create(input) to create a valid instance.`
        );
      }
    }

    static create(
      input: unknown
    ): Result<TSimpleDto<Name, SimpleDto>, ValidationError> {
      return createValidator(schema)(input).map(
        // biome-ignore lint/complexity/noThisInStatic: Intentional factory
        (validatedData) => new this(validatedData, RuntimeValidationToken)
      );
    }
  }

  if (className) {
    Object.defineProperty(SimpleDto, "name", { value: className });
  }

  return SimpleDto;
};

export const dtoStandardSchema = <T, Out, In>(
  dtoConst: DtoSchemaInput<T, Out, In>
): DtoSchemaOutput<T, In> => {
  return {
    "~standard": {
      vendor: "zod",
      version: 1,
      validate: (data: unknown): StandardSchemaV1.Result<T> => {
        const result = dtoConst.create(data);

        if (result.isOk())
          return {
            value: result.unwrap(),
          } satisfies StandardSchemaV1.SuccessResult<T>;

        const err = result.unwrapErr();
        const issues = err.issues.map(
          (issue) =>
            ({
              message: issue.message,
              path: issue.path,
            } satisfies StandardSchemaV1.Issue)
        );

        return { issues } satisfies StandardSchemaV1.FailureResult;
      },
    } satisfies StandardSchemaV1.Props<In, T>,
  };
};
