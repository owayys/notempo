import { ConceptWorkflows } from "@application/workflows/concept.workflows";
import { handleAppResult } from "@web/utils/result-handler.utils";
import { container } from "tsyringe";
import { authenticated } from "../utils/orpc.utils";

const base = authenticated.concept;

export const createConceptHandler = base.createConcept.handler(
  async ({ input }) => {
    console.log(input);
    const conceptWorkflows = container.resolve(ConceptWorkflows);
    const result = await conceptWorkflows.createConcept(input);

    return handleAppResult(result);
  },
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
  },
);

export default base.router({
  createConcept: createConceptHandler,
  getConcept: getConceptHandler,
  getConceptDetails: getConceptDetailsHandler,
});
