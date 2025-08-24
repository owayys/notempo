import { BaseEntity } from "@domain/utils/base.entity";
import {
  ConceptCreateData,
  ConceptSchema,
  type ConceptType,
} from "@domain/concept/concept.schema";
import { createValidator } from "@domain/utils";

const validate = createValidator(ConceptSchema);

export class ConceptEntity extends BaseEntity implements ConceptType {
  override id: ConceptType["id"];
  label: string;

  private constructor(data: ConceptType) {
    super(data);
    this.id = data.id;
    this.label = data.label;
  }

  static create(data: ConceptCreateData) {
    const conceptData = {
      ...ConceptSchema.baseInit(),
      ...data,
    } as ConceptType;

    return new ConceptEntity(conceptData);
  }

  static fromEncoded(data: ConceptType) {
    return validate(data).map((d) => new ConceptEntity(d));
  }

  serialize() {
    return validate(this);
  }
}
