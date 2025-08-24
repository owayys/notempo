import { ConceptWorkflows } from "@application/workflows/concept.workflows";
import { CONTRACT } from "@contract/contracts";
import { implement } from "@orpc/server";
import { handleAppResult } from "@web/utils/result-handler.utils";
import { container } from "tsyringe";

const base = implement(CONTRACT.concept);

export const createConceptHandler = base.createConcept.handler(
  async ({ input }) => {
    const conceptWorkflows = container.resolve(ConceptWorkflows);
    const result = await conceptWorkflows.createConcept(input.label);

    return handleAppResult(result);
  }
);

export const getConceptHandler = base.getConcept.handler(async ({ input }) => {
  const conceptWorkflows = container.resolve(ConceptWorkflows);
  const result = await conceptWorkflows.getConcepts(input);

  return handleAppResult(result);
});

export const getConceptDetailsHandler = base.getConceptDetails.handler(
  async ({ input }) => {
    const conceptWorkflows = container.resolve(ConceptWorkflows);
    const result = await conceptWorkflows.getConceptById(input.id);

    return handleAppResult(result);
  }
);

export default base.router({
  createConcept: createConceptHandler,
  getConcept: getConceptHandler,
  getConceptDetails: getConceptDetailsHandler,
});
