import type { ContractRouterClient } from "@orpc/contract";
import conceptContract from "./concept.contract";

export const CONTRACT = {
  authenticated: {
    concept: conceptContract,
  },
  public: {},
};

export type AppRouterClient = ContractRouterClient<typeof CONTRACT>;
