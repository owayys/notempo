import { ConceptWorkflows } from "@application/workflows/concept.workflows";
import { LinkWorkflows } from "@application/workflows/link.workflows";
import { ThoughtWorkflows } from "@application/workflows/thought.workflows";
import type { DependencyContainer } from "tsyringe";

const workflows = [ThoughtWorkflows, ConceptWorkflows, LinkWorkflows] as const;

export const registerWorkflows = (container: DependencyContainer) => {
  for (const workflow of workflows) {
    // @ts-expect-error
    container.registerSingleton(workflow, workflow);
  }
};
