import {
  ConceptEntity,
  type ConceptRepository,
  type ConceptType,
} from "@domain/concept";

export class ConceptWorkflows {
  constructor(private readonly conceptRepository: ConceptRepository) {}

  async createConcept(label: ConceptType["label"]) {
    const concept = ConceptEntity.create({ label });
    const result = await this.conceptRepository.create(concept);
    return result;
  }

  async getConceptById(id: ConceptType["id"]) {
    const concept = await this.conceptRepository.findById(id);
    return concept;
  }
}
