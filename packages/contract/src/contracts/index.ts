import type { ContractRouterClient } from "@orpc/contract";
import conceptContract from "./concept.contract";
import thoughtContract from "./thought.contract";

export const CONTRACT = {
  authenticated: {
    concept: conceptContract,
    thought: thoughtContract,
  },
  public: {},
};

export type AppRouterClient = ContractRouterClient<typeof CONTRACT>;
