import type { ContractRouterClient } from "@orpc/contract";
import conceptContract from "./concept.contract";

export const CONTRACT = {
  concept: conceptContract,
};

export type AppRouterClient = ContractRouterClient<typeof CONTRACT>;
