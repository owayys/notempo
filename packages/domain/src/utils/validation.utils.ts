import { z } from "zod";
import {
  ValidationError,
  type ValidationIssue,
} from "@domain/utils/base.errors";

export const mergeValidationErrors = (
  errors: ValidationError[]
): ValidationError => {
  const issues: ValidationIssue[] = errors.flatMap((err) => err.issues);

  return ValidationError.multiple(issues);
};

export const validationErrorsToSingle = (
  errors: ValidationError[]
): ValidationError => {
  if (errors.length === 0) {
    return ValidationError.single("Unknown validation error");
  }

  if (errors.length === 1) {
    return errors[0] as ValidationError;
  }

  const allIssues = errors.flatMap((error) => error.issues);
  return ValidationError.multiple(allIssues);
};

export const zodErrorsToValidationError = (
  zodErrors: z.ZodError[]
): ValidationError => {
  if (zodErrors.length === 0) {
    return ValidationError.single("Unknown validation error");
  }

  const issues: ValidationIssue[] = zodErrors.flatMap((err) =>
    getIssuesFromZodError(err)
  );
  return ValidationError.multiple(issues);
};

export const zodErrorToValidationError = (
  error: z.ZodError
): ValidationError => {
  const issues = getIssuesFromZodError(error);
  return ValidationError.multiple(issues);
};

export const getIssuesFromZodError = (error: z.ZodError): ValidationIssue[] => {
  return error.issues.flatMap((issue) => getIssuesFromZodIssue(issue));
};

export const getIssuesFromZodIssue = (issue: z.ZodIssue): ValidationIssue[] => {
  const path = issue.path;
  const field = pathToFieldName(path.map(String));

  switch (issue.code) {
    case "invalid_type": {
      const expectedType = issue.expected || "unknown type";
      const receivedType = issue.input || "unknown";

      return [
        {
          message:
            issue.message ||
            `TypeError: Expected ${expectedType}, got ${receivedType}`,
          cause: issue,
          value: (issue as any).received,
          path: path.map(String),
          field,
        },
      ];
    }

    case "too_small": {
      const smallIssue = issue;
      let typeDescription = smallIssue.origin ?? "value";

      let constraint = "";
      if (smallIssue.exact) {
        constraint = `exactly ${smallIssue.minimum}`;
      } else if (smallIssue.inclusive) {
        constraint = `at least ${smallIssue.minimum}`;
      } else {
        constraint = `more than ${smallIssue.minimum}`;
      }

      return [
        {
          message: issue.message || `${typeDescription} must be ${constraint}`,
          cause: issue,
          path: path.map(String),
          field,
        },
      ];
    }

    case "too_big": {
      const bigIssue = issue;
      let typeDescription = bigIssue.origin ?? "value";

      let constraint = "";
      if (bigIssue.exact) {
        constraint = `exactly ${bigIssue.maximum}`;
      } else if (bigIssue.inclusive) {
        constraint = `at most ${bigIssue.maximum}`;
      } else {
        constraint = `less than ${bigIssue.maximum}`;
      }

      return [
        {
          message: issue.message || `${typeDescription} must be ${constraint}`,
          cause: issue,
          path: path.map(String),
          field,
        },
      ];
    }

    case "invalid_format": {
      return [
        {
          message: issue.message || `Expected ${issue.format}`,
          cause: issue,
          path: path.map(String),
          field,
        },
      ];
    }

    case "not_multiple_of": {
      return [
        {
          message:
            issue.message || `Number must be a multiple of ${issue.divisor}`,
          cause: issue,
          path: path.map(String),
          field,
        },
      ];
    }

    case "unrecognized_keys": {
      const keysIssue = issue;
      const keys = keysIssue.keys.join(", ");
      return [
        {
          message: issue.message || `Unrecognized key(s) in object: ${keys}`,
          cause: issue,
          path: path.map(String),
          field,
        },
      ];
    }

    case "invalid_union": {
      const unionIssue = issue;
      if (unionIssue.errors) {
        return unionIssue.errors.flatMap((unionErrorArray) =>
          unionErrorArray.flatMap((unionIssue) =>
            getIssuesFromZodIssue(unionIssue)
          )
        );
      }
      return [
        {
          message: issue.message || "Invalid union value",
          cause: issue,
          path: path.map(String),
          field,
        },
      ];
    }

    case "invalid_key": {
      return [
        {
          message: issue.message || "Invalid key",
          cause: issue,
          path: path.map(String),
          field,
        },
      ];
    }

    case "invalid_element": {
      return [
        {
          message: issue.message || "Invalid element",
          cause: issue,
          path: path.map(String),
          field,
        },
      ];
    }

    case "invalid_value": {
      return [
        {
          message: issue.message || "Invalid value",
          cause: issue,
          path: path.map(String),
          field,
        },
      ];
    }

    case "custom": {
      return [
        {
          message: issue.message || "Custom validation failed",
          cause: issue,
          path: path.map(String),
          field,
        },
      ];
    }

    default: {
      return [
        {
          message: "Unknown validation error",
          cause: issue,
          path: path.map(String),
          field,
        },
      ];
    }
  }
};

function pathToFieldName(path: string[]): string | undefined {
  return path.length > 0 ? path.join(".") : undefined;
}
