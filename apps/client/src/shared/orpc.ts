import { type ClientContext, createORPCClient } from "@orpc/client";
import { RPCLink, type RPCLinkOptions } from "@orpc/client/fetch";
import { createORPCReactQueryUtils, type RouterUtils } from "@orpc/react-query";
import type { AppRouterClient } from "@repo/contract/contracts";
import { headers } from "next/headers";

export type ContractClient = AppRouterClient;

const baseRpcLinkOpts: RPCLinkOptions<ClientContext> = {
  url: `${import.meta.env.VITE_SERVER_URL}/rpc`,
};

const getClientLink = () => {
  if (typeof window !== "undefined") {
    return new RPCLink({
      ...baseRpcLinkOpts,
      fetch(request, init) {
        return globalThis.fetch(request, {
          ...init,
          credentials: "include",
        });
      },
    });
  } else {
    return new RPCLink({
      ...baseRpcLinkOpts,
      headers: async () => Object.fromEntries(await headers()),
      fetch(request, init) {
        return globalThis.fetch(request, { ...init, credentials: "include" });
      },
    });
  }
};

const link = getClientLink();
const orpcClient: AppRouterClient = createORPCClient(link);

export type OrpcReactQuery = RouterUtils<ContractClient>;
export const orpc = createORPCReactQueryUtils(orpcClient);
