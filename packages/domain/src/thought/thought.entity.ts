import { BaseEntity, createValidator } from "@domain/utils";
import {
  ThoughtSchema,
  type ThoughtCreateData,
  type ThoughtType,
} from "@domain/thought/thought.schema";

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
