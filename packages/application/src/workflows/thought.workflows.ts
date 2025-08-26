import { AppResult } from "@application/utils";
import { LinkEntity } from "@domain/link/link.entity";
import { LinkRepository } from "@domain/link/link.repo";
import { ThoughtEntity } from "@domain/thought/thought.entity";
import { ThoughtRepository } from "@domain/thought/thought.repo";
import {
  CreateThoughtParams,
  GetThoughtDetailsParams,
  GetThoughtParams,
} from "@domain/thought/thought.schema";
import { autoInjectable } from "tsyringe";
import { Result as R } from "@carbonteq/fp";
import { validationErrorsToSingle } from "@domain/utils/validation.utils";

@autoInjectable()
export class ThoughtWorkflows {
  constructor(
    private readonly thoughtRepository: ThoughtRepository,
    private readonly linkRepository: LinkRepository,
  ) {}

  async createThought(params: CreateThoughtParams) {
    const thought = ThoughtEntity.create(params);
    const links = params.concepts.map((cId) =>
      LinkEntity.create({
        conceptId: cId,
        thoughtId: thought.id,
      }),
    );
    const thoughtResult = await this.thoughtRepository.create(thought);
    const result = await thoughtResult
      .flatMap(async (t) =>
        R.all(
          ...(await Promise.all(
            links.map((l) => this.linkRepository.create(l)),
          )),
        )
          .map((links) => ({
            links,
            thought: t,
          }))
          .mapErr(validationErrorsToSingle),
      )
      .toPromise();
    return AppResult.fromResult(result);
  }

  async getThoughts(params: GetThoughtParams) {
    const result = await this.thoughtRepository.findWithFilters(
      params.filters,
      params.pagination,
    );
    return AppResult.fromResult(result);
  }

  async getThoughtById(params: GetThoughtDetailsParams) {
    const result = await this.thoughtRepository.findById(params.id);
    return AppResult.fromResult(result);
  }
}
