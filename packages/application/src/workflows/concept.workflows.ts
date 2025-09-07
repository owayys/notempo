import { AppResult } from "@application/utils";
import { ConceptEntity } from "@domain/concept/concept.entity";
import { ConceptRepository } from "@domain/concept/concept.repo";
import type {
  CreateConceptData,
  GetConceptData,
  GetConceptDetailsData,
} from "@domain/concept/concept.schema";
import { ThoughtRepository } from "@domain/thought/thought.repo";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class ConceptWorkflows {
  constructor(
    private readonly conceptRepository: ConceptRepository,
    private readonly thoughtRepository: ThoughtRepository,
  ) {}

  async createConcept(params: CreateConceptData) {
    const concept = ConceptEntity.create(params);
    const result = await this.conceptRepository.create(concept);
    return AppResult.fromResult(result);
  }

  async getConcepts(params: GetConceptData) {
    const concepts = await this.conceptRepository.findWithFilters(
      { ...params.filters, authorId: params.authorId },
      params.pagination,
    );

    return AppResult.fromResult(concepts);
  }

  async getConceptById(params: GetConceptDetailsData) {
    const concept = await this.conceptRepository.findById(
      params.id,
      params.authorId,
    );

    const conceptWithThoughts = await concept
      .flatZip((concept) => this.thoughtRepository.findByConceptId(concept.id))
      .toPromise();

    return AppResult.fromResult(
      conceptWithThoughts.map(([c, t]) => ({
        concept: c,
        thoughts: t,
      })),
    );
  }
}
