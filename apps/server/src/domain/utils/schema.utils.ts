import type z from "zod";

export type ExtendedSchema<T, Methods extends Record<string, unknown>> = T &
  Methods;

export const addMethodsToSchema = <T, Methods extends Record<string, unknown>>(
  schema: T,
  methods: Methods
): ExtendedSchema<T, Methods> => {
  const extended = schema as ExtendedSchema<T, Methods>;
  for (const [key, value] of Object.entries(methods)) {
    // biome-ignore lint/suspicious/noExplicitAny: Have to work around the type system here
    (extended as any)[key] = value;
  }
  return extended;
};
