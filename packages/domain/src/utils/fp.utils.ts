import { Result } from "@carbonteq/fp/result";
import type { ValidationError } from "@domain/utils/base.errors";
import { validationErrorsToSingle } from "@domain/utils/validation.utils";

function collectValidationErrors<T>(
  results: Result<Promise<T>, ValidationError>[],
): never;
function collectValidationErrors<T>(
  results: Result<T, ValidationError>[],
): Result<T[], ValidationError>;
function collectValidationErrors<T>(results: Result<T, ValidationError>[]) {
  return Result.all(...results).mapErr(validationErrorsToSingle);
}

export const FpUtils = {
  pick:
    <T extends Record<string, unknown>, K extends (keyof T)[]>(...keys: K) =>
    (obj: T) => {
      const picked: Partial<T> = {};
      for (const key of keys) {
        picked[key] = obj[key];
      }

      return picked as Pick<T, K[number]>;
    },
  extract:
    <T extends Record<string, unknown>, K extends keyof T>(key: K) =>
    (obj: T): T[K] =>
      obj[key],

  omit:
    <T extends Record<string, unknown>, K extends (keyof T)[]>(...keys: K) =>
    (obj: T): Omit<T, K[number]> => {
      const picked: Partial<T> = {};
      for (const key of Object.keys(obj) as K) {
        if (keys.includes(key)) {
          continue;
        }

        picked[key] = obj[key];
      }

      return picked as Omit<T, K[number]>;
    },

  collectSuccessful: <T, E>(results: Result<T, E>[]): Result<T[], E[]> => {
    const successes: T[] = [];
    const errors: E[] = [];

    for (const result of results) {
      if (result.isOk()) {
        successes.push(result.unwrap());
      } else {
        errors.push(result.unwrapErr());
      }
    }

    return errors.length === 0 ? Result.Ok(successes) : Result.Err(errors);
  },

  filterOk: <T, E>(results: Result<T, E>[]): T[] => {
    return results.filter((r) => r.isOk()).map((r) => r.unwrap());
  },

  filterErr: <T, E>(results: Result<T, E>[]): E[] => {
    return results.filter((r) => r.isErr()).map((r) => r.unwrapErr());
  },

  log: <T, E>(result: Result<T, E>, prefix: string = "") => {
    if (result.isOk()) {
      console.log(`${prefix} Success:`, result.unwrap());
    } else {
      console.error(`${prefix} Error:`, result.unwrapErr());
    }
  },

  collectValidationErrors,
} as const;
