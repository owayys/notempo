import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { BatchHandlerPlugin } from "@orpc/server/plugins";
import { router } from "@web/routes";
import type { AppContext } from "@web/types";
import type Elysia from "elysia";
import type { DependencyContainer } from "tsyringe";
import { createAuthContext } from "./auth-context";
import { validationErrMap } from "./orpc.interceptors";
import { commonPlugins } from "./orpc.plugins";

export const addRpcHandler = (app: Elysia, container: DependencyContainer) => {
  const rpcHandler = new RPCHandler<AppContext>(router, {
    interceptors: [onError(validationErrMap)],
    clientInterceptors: [],
    plugins: [...commonPlugins, new BatchHandlerPlugin()],
  });

  app.all(
    "/rpc/*",
    async (c) => {
      const authCtx = await createAuthContext(c, container);

      const { response } = await rpcHandler.handle(c.request, {
        prefix: "/rpc",
        context: { auth: authCtx },
      });

      return response ?? new Response("Not Found", { status: 404 });
    },
    {
      parse: "none",
    },
  );
};
