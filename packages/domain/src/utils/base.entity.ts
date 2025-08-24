import { z } from "zod";
import { addMethodsToSchema } from "@domain/utils/schema.utils";
import { DateTime, UUID } from "@domain/utils/refined.type";

export const baseEntityFields = {
  id: UUID,
  createdAt: DateTime,
  updatedAt: DateTime,
} as const;

export type TBaseEntityFields = typeof baseEntityFields;

const baseEntityStruct = z.object(baseEntityFields);

export const defineEntitySchema = <
  Tag extends string,
  Fields extends Record<string, z.ZodType>
>(
  tag: Tag,
  fields: Fields
) => {
  const id = UUID.extend(tag);

  const struct = z.object({
    ...baseEntityFields,
    id,
    ...fields,
  });

  const extendedStruct = addMethodsToSchema(struct, {
    baseInit: () => ({
      id: id.new(),
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    }),
    id,
  });

  return extendedStruct;
};

export type BaseEntityEncoded = z.input<typeof baseEntityStruct>;
export type BaseEntityType = z.infer<typeof baseEntityStruct>;

export class BaseEntity implements BaseEntityType {
  readonly id: BaseEntityType["id"];
  readonly createdAt: BaseEntityType["createdAt"];
  readonly updatedAt: BaseEntityType["updatedAt"];

  protected constructor(data: BaseEntityType) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
