import { describe, expect, test } from "bun:test";
import { validateWithZod } from "@application/utils/validation.utils";
import z from "zod";

describe("Validation Utils", () => {
  const testSchema = z.object({
    name: z.string().nonempty(),
    age: z.number().gte(0),
    email: z.string().refine((a) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)),
  });

  test("should validate correct data", () => {
    const validData = {
      name: "John Doe",
      age: 30,
      email: "john@example.com",
    };

    const result = validateWithZod(testSchema, validData);

    expect(result.isOk()).toBe(true);
    expect(result.unwrap()).toEqual(validData);
  });

  test("should return validation error for invalid data", () => {
    const invalidData = {
      name: "",
      age: -5,
      email: "not-an-email",
    };

    const result = validateWithZod(testSchema, invalidData);

    expect(result.isErr()).toBe(true);
    const error = result.unwrapErr();
    expect(error.name).toBe("ValidationError");
    expect(error.message).toContain("Too small");
  });

  test("should handle missing fields", () => {
    const incompleteData = {
      name: "John Doe",
      // missing age and email
    };

    const result = validateWithZod(testSchema, incompleteData);

    expect(result.isErr()).toBe(true);
    const error = result.unwrapErr();
    expect(error.name).toBe("ValidationError");
  });

  test("should handle null/undefined input", () => {
    const result1 = validateWithZod(testSchema, null);
    const result2 = validateWithZod(testSchema, undefined);

    expect(result1.isErr()).toBe(true);
    expect(result2.isErr()).toBe(true);
  });
});
