import { ThoughtEntity } from "@domain/thought/thought.entity";
import { ThoughtRepository } from "@domain/thought/thought.repo";
import { type ThoughtType } from "@domain/thought/thought.schema";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class ThoughtWorkflows {
  constructor(private readonly thoughtRepository: ThoughtRepository) {}

  async createThought(text: ThoughtType["text"]) {
    const thought = ThoughtEntity.create({ text });
    const result = await this.thoughtRepository.create(thought);
    return result;
  }

  async getThoughtById(id: ThoughtType["id"]) {
    const thought = await this.thoughtRepository.findById(id);
    return thought;
  }
}
