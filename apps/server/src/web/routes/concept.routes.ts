import { ConceptWorkflows } from "@application/workflows/concept.workflows";
import { handleAppResult } from "@web/utils/result-handler.utils";
import { container } from "tsyringe";
import { authenticated } from "../utils/orpc.utils";

const base = authenticated.concept;

export const createConceptHandler = base.createConcept.handler(
  async ({ input, context }) => {
    const conceptWorkflows = container.resolve(ConceptWorkflows);
    const result = await conceptWorkflows.createConcept({
      ...input,
      authorId: context.user.id,
    });

    return handleAppResult(result);
  },
);

export const getConceptHandler = base.getConcept.handler(
  async ({ input, context }) => {
    const conceptWorkflows = container.resolve(ConceptWorkflows);
    const result = await conceptWorkflows.getConcepts({
      ...input,
      authorId: context.user.id,
    });

    return handleAppResult(result);
  },
);

export const getConceptDetailsHandler = base.getConceptDetails.handler(
  async ({ input, context }) => {
    const conceptWorkflows = container.resolve(ConceptWorkflows);
    const result = await conceptWorkflows.getConceptById({
      ...input,
      authorId: context.user.id,
    });

    return handleAppResult(result);
  },
);

export default base.router({
  createConcept: createConceptHandler,
  getConcept: getConceptHandler,
  getConceptDetails: getConceptDetailsHandler,
});
