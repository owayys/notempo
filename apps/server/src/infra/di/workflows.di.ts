import { ConceptWorkflows } from "@application/workflows/concept.workflows";
import { NoteWorkflows } from "@application/workflows/note.workflows";
import { LinkWorkflows } from "@application/workflows/link.workflows";
import type { DependencyContainer } from "tsyringe";

const workflows = [NoteWorkflows, ConceptWorkflows, LinkWorkflows] as const;

export const registerWorkflows = (container: DependencyContainer) => {
  for (const workflow of workflows) {
    // @ts-expect-error
    container.registerSingleton(workflow, workflow);
  }
};
