import { UserSchema } from "@domain/user/user.entity";
import { createCodec, removeBaseFields } from "@domain/utils";
import { BaseEntity, defineEntitySchema } from "@domain/utils/base.entity";
import z from "zod/v4";

export const ConceptSchema = defineEntitySchema("ConceptId", {
  label: z.string().describe("The label of the concept"),
  authorId: UserSchema.id,
});
export type ConceptType = z.infer<typeof ConceptSchema>;
export type ConceptEncoded = z.input<typeof ConceptSchema>;

export const ConceptCreateData = removeBaseFields(ConceptSchema);
export type ConceptCreateData = z.infer<typeof ConceptCreateData>;

const codec = createCodec(ConceptSchema);

export class ConceptEntity extends BaseEntity implements ConceptType {
  override id: ConceptType["id"];
  authorId: ConceptType["authorId"];
  label: string;

  private constructor(data: ConceptType) {
    super(data);
    this.id = data.id;
    this.authorId = data.authorId;
    this.label = data.label;
  }

  static create(data: ConceptCreateData) {
    const conceptData = {
      ...ConceptSchema.baseInit(),
      ...data,
    } as ConceptType;

    return new ConceptEntity(conceptData);
  }

  static fromEncoded(encoded: ConceptEncoded) {
    return codec.deserialize(encoded).map((d) => new ConceptEntity(d));
  }

  serialize() {
    return codec.serialize(this);
  }
}
