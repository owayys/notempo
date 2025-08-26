import { addMethodsToSchema } from "@domain/utils/schema.utils";
import z from "zod";

type Brand<T> = { __brand: T };

export const UUIDBase = z
  .uuid()
  .describe("A universally unique identifier (UUID)")
  .refine(
    (val) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        val,
      ),
    {
      message: "Invalid UUID format",
    },
  )
  .brand("UUID");

export const UUID = addMethodsToSchema(UUIDBase, {
  new: () => crypto.randomUUID() as z.infer<typeof UUIDBase>,
  extend: <Tag extends string>(tag: Tag) =>
    addMethodsToSchema(UUIDBase.brand(tag), {
      new: () => crypto.randomUUID() as string & Brand<"UUID"> & Brand<Tag>,
    }),
});

export type UUIDType = z.infer<typeof UUID>;
export type UUIDEncoded = z.input<typeof UUID>;

export const DateTimeBase = z
  .date()
  .describe("A date-time string in ISO 8601 format")
  .refine((date) => !Number.isNaN(date.getTime()), {
    message: "Invalid date",
  });

export const DateTime = addMethodsToSchema(DateTimeBase, {
  now: () => new Date() as z.infer<typeof DateTimeBase>,
});

export type DateTimeType = z.infer<typeof DateTime>;
export type DateTimeEncoded = z.input<typeof DateTime>;
