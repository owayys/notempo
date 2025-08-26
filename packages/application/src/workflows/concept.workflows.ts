import { AppResult } from "@application/utils";
import { ConceptEntity } from "@domain/concept/concept.entity";
import { ConceptRepository } from "@domain/concept/concept.repo";
import {
  CreateConceptParams,
  GetConceptDetailsParams,
  GetConceptParams,
} from "@domain/concept/concept.schema";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class ConceptWorkflows {
  constructor(private readonly conceptRepository: ConceptRepository) {}

  async createConcept(params: CreateConceptParams) {
    const concept = ConceptEntity.create(params);
    const result = await this.conceptRepository.create(concept);
    return AppResult.fromResult(result);
  }

  async getConcepts(params: GetConceptParams) {
    const concepts = await this.conceptRepository.findWithFilters(
      params.filters,
      params.pagination,
    );
    return AppResult.fromResult(concepts);
  }

  async getConceptById(params: GetConceptDetailsParams) {
    const concept = await this.conceptRepository.findById(params.id);
    return AppResult.fromResult(concept);
  }
}
