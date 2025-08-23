import { BaseEntity } from "@domain/utils/base.entity";
import {
  ConceptCreateData,
  ConceptSchema,
  type ConceptType,
} from "@domain/concept";
import { Result as R } from "@carbonteq/fp";

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

    return R.Ok(new ConceptEntity(conceptData));
  }
}
