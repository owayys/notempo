import { AppResult } from "@application/utils";
import { ConceptEntity } from "@domain/concept/concept.entity";
import {
  GetConceptParams,
  type ConceptType,
} from "@domain/concept/concept.schema";
import { ConceptRepository } from "@domain/concept/concept.repo";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class ConceptWorkflows {
  constructor(private readonly conceptRepository: ConceptRepository) {}

  async createConcept(label: ConceptType["label"]) {
    const concept = ConceptEntity.create({ label });
    console.log("Creating concept:", concept);
    console.log("Using repository:", this.conceptRepository);
    const result = await this.conceptRepository.create(concept);
    return AppResult.fromResult(result);
  }

  async getConcepts(params: GetConceptParams) {
    const concepts = await this.conceptRepository.findWithFilters(
      { label: params.label },
      params
    );
    return AppResult.fromResult(concepts);
  }

  async getConceptById(id: ConceptType["id"]) {
    const concept = await this.conceptRepository.findById(id);
    return AppResult.fromResult(concept);
  }
}
