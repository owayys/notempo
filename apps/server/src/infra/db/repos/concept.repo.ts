import {
  ConceptRepository,
  type ConceptEntity,
  type ConceptType,
} from "@domain/concept";

export class DrizzleConceptRepository extends ConceptRepository {
  override create(concept: ConceptEntity): Promise<ConceptEntity> {
    throw new Error("Method not implemented.");
  }

  override findById(id: ConceptType["id"]): Promise<ConceptEntity | null> {
    throw new Error("Method not implemented.");
  }

  override delete(id: ConceptType["id"]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  override findWithFilters(
    filters: Partial<ConceptType>
  ): Promise<ConceptEntity[]> {
    throw new Error("Method not implemented.");
  }

  override update(concept: ConceptEntity): Promise<ConceptEntity> {
    throw new Error("Method not implemented.");
  }
}
