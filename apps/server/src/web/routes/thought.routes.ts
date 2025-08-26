import { container } from "tsyringe";
import { authenticated } from "../utils/orpc.utils";
import { ThoughtWorkflows } from "@application/workflows/thought.workflows";
import { handleAppResult } from "../utils/result-handler.utils";

const base = authenticated.thought;

export const createThoughtHandler = base.createThought.handler(
  async ({ input }) => {
    const thoughtWorkflows = container.resolve(ThoughtWorkflows);
    const result = await thoughtWorkflows.createThought(input);

    return handleAppResult(result);
  },
);

export const getThoughtHandler = base.getThought.handler(async ({ input }) => {
  console.log(input);
  const thoughtWorkflows = container.resolve(ThoughtWorkflows);
  const result = await thoughtWorkflows.getThoughts(input);

  return handleAppResult(result);
});

export const getThoughtDetailsHandler = base.getThoughtDetails.handler(
  async ({ input }) => {
    const thoughtWorkflows = container.resolve(ThoughtWorkflows);
    const result = await thoughtWorkflows.getThoughtById(input);

    return handleAppResult(result);
  },
);

export default base.router({
  createThought: createThoughtHandler,
  getThought: getThoughtHandler,
  getThoughtDetails: getThoughtDetailsHandler,
});
