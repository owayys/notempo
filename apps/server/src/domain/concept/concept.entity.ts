import { BaseEntity } from "@domain/utils/base.entity";
import type { EntityCreateData, EntityType } from "@domain/utils/refined.type";

export type ConceptType = EntityType<
  "Concept",
  {
    label: string;
  }
>;

export type ConceptCreateData = EntityCreateData<ConceptType>;

export class ConceptEntity
  extends BaseEntity<"Concept">
  implements ConceptType
{
  label: string;

  private constructor(data: ConceptType) {
    super(data);
    this.label = data.label;
  }

  static create(data: ConceptCreateData) {
    const conceptData = {
      ...ConceptEntity.init(),
      ...data,
    } as ConceptType;

    return new ConceptEntity(conceptData);
  }
}
