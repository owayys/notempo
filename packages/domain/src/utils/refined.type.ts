import { Option } from "@carbonteq/fp";
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

export const C = {
  stringToNumber: z.codec(z.string().regex(z.regexes.number), z.number(), {
    decode: (str) => Number.parseFloat(str),
    encode: (num) => num.toString(),
  }),
  stringToInt: z.codec(z.string().regex(z.regexes.integer), z.int(), {
    decode: (str) => Number.parseInt(str, 10),
    encode: (num) => num.toString(),
  }),
  stringToBigInt: z.codec(z.string(), z.bigint(), {
    decode: (str) => BigInt(str),
    encode: (bigint) => bigint.toString(),
  }),
  numberToBigInt: z.codec(z.int(), z.bigint(), {
    decode: (num) => BigInt(num),
    encode: (bigint) => Number(bigint),
  }),
  isoDatetimeToDate: z.codec(z.iso.datetime(), z.date(), {
    decode: (isoString) => new Date(isoString),
    encode: (date) => date.toISOString(),
  }),
  epochSecondsToDate: z.codec(z.int().min(0), z.date(), {
    decode: (seconds) => new Date(seconds * 1000),
    encode: (date) => Math.floor(date.getTime() / 1000),
  }),
  epochMillisToDate: z.codec(z.int().min(0), z.date(), {
    decode: (millis) => new Date(millis),
    encode: (date) => date.getTime(),
  }),
  jsonCodec: <T extends z.core.$ZodType>(schema: T) =>
    z.codec(z.string(), schema, {
      decode: (jsonString, ctx) => {
        try {
          return JSON.parse(jsonString);
          // biome-ignore lint/suspicious/noExplicitAny: err catch clause
        } catch (err: any) {
          ctx.issues.push({
            code: "invalid_format",
            format: "json",
            input: jsonString,
            message: err.message,
          });
          return z.NEVER;
        }
      },
      encode: (value) => JSON.stringify(value),
    }),
  stringToURL: z.codec(z.url(), z.instanceof(URL), {
    decode: (urlString) => new URL(urlString),
    encode: (url) => url.href,
  }),
  stringToHttpURL: z.codec(z.httpUrl(), z.instanceof(URL), {
    decode: (urlString) => new URL(urlString),
    encode: (url) => url.href,
  }),
  uriComponent: z.codec(z.string(), z.string(), {
    decode: (encodedString) => decodeURIComponent(encodedString),
    encode: (decodedString) => encodeURIComponent(decodedString),
  }),
  opt: <T>(schema: z.ZodType<T>) =>
    z.codec(
      z.union([schema, z.null()]),
      z.custom<Option<T>>((val) => val instanceof Option, {
        message: "Expected Option instance",
      }),
      {
        decode: (val) => (val ? Option.Some(val) : Option.None),
        encode: (opt) => opt.safeUnwrap(),
      },
    ),
};
