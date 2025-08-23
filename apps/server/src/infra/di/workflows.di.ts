import {
  ConceptWorkflows,
  LinkWorkflows,
  NoteWorkflows,
} from "@application/workflows";
import { container } from "tsyringe";

const workflows = [NoteWorkflows, ConceptWorkflows, LinkWorkflows] as const;

export const registerWorkflows = () => {
  for (const workflow of workflows) {
    // @ts-expect-error
    container.registerSingleton(workflow, workflow);
  }
};
