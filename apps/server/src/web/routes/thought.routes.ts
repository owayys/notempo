import { ThoughtWorkflows } from "@application/workflows/thought.workflows";
import { container } from "tsyringe";
import { authenticated } from "../utils/orpc.utils";
import { handleAppResult } from "../utils/result-handler.utils";

const base = authenticated.thought;

export const createThoughtHandler = base.createThought.handler(
  async ({ input, context }) => {
    const thoughtWorkflows = container.resolve(ThoughtWorkflows);
    const result = await thoughtWorkflows.createThought({
      ...input,
      authorId: context.user.id,
    });

    return handleAppResult(result);
  },
);

export const getThoughtHandler = base.getThought.handler(
  async ({ input, context }) => {
    const thoughtWorkflows = container.resolve(ThoughtWorkflows);
    const result = await thoughtWorkflows.getThoughts({
      ...input,
      authorId: context.user.id,
    });

    return handleAppResult(result);
  },
);

export const getThoughtDetailsHandler = base.getThoughtDetails.handler(
  async ({ input, context }) => {
    const thoughtWorkflows = container.resolve(ThoughtWorkflows);
    const result = await thoughtWorkflows.getThoughtById({
      ...input,
      authorId: context.user.id,
    });

    return handleAppResult(result);
  },
);

export default base.router({
  createThought: createThoughtHandler,
  getThought: getThoughtHandler,
  getThoughtDetails: getThoughtDetailsHandler,
});
