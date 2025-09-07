import { UserSchema } from "@domain/user/user.entity";
import {
  BaseEntity,
  createValidator,
  defineEntitySchema,
  removeBaseFields,
} from "@domain/utils";
import z from "zod";

export const ThoughtSchema = defineEntitySchema("ThoughtId", {
  text: z.string().max(512).describe("The content of the thought"),
  authorId: UserSchema.id,
});

export type ThoughtType = z.infer<typeof ThoughtSchema>;
export type ThoughtEncoded = z.input<typeof ThoughtSchema>;

export const ThoughtCreateData = removeBaseFields(ThoughtSchema);
export type ThoughtCreateData = z.infer<typeof ThoughtCreateData>;

const validate = createValidator(ThoughtSchema);

export class ThoughtEntity extends BaseEntity implements ThoughtType {
  override id: ThoughtType["id"];
  authorId: ThoughtType["authorId"];
  text: ThoughtType["text"];

  private constructor(data: ThoughtType) {
    super(data);
    this.id = data.id;
    this.authorId = data.authorId;
    this.text = data.text;
  }

  static create(data: ThoughtCreateData) {
    const thoughtData = {
      ...ThoughtSchema.baseInit(),
      ...data,
    } as ThoughtType;

    return new ThoughtEntity(thoughtData);
  }

  static fromEncoded(data: ThoughtType) {
    return validate(data).map((d) => new ThoughtEntity(d));
  }

  serialize() {
    return validate(this);
  }
}
