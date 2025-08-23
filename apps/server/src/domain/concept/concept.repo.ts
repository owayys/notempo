import type { ConceptEntity, ConceptType } from "@domain/concept";

export abstract class ConceptRepository {
  abstract create(concept: ConceptEntity): Promise<ConceptEntity>;
  abstract findById(id: ConceptType["id"]): Promise<ConceptEntity | null>;
  abstract findWithFilters(
    filters: Partial<ConceptType>
  ): Promise<ConceptEntity[]>;
  abstract update(concept: ConceptEntity): Promise<ConceptEntity>;
  abstract delete(id: ConceptType["id"]): Promise<void>;
}
