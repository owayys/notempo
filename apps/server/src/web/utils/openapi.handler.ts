import { onError } from "@orpc/client";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { router } from "@web/routes";
import type { AppContext } from "@web/types";
import { validationErrMap } from "@web/utils/orpc.interceptors";
import { CORSPlugin, ResponseHeadersPlugin } from "@orpc/server/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { experimental_SmartCoercionPlugin as SmartCoercionPlugin } from "@orpc/json-schema";
import type Elysia from "elysia";
import type { DependencyContainer } from "tsyringe";
import { createAuthContext } from "./auth-context";
import { commonPlugins } from "./orpc.plugins";

export const addOpenApiHandler = (
  app: Elysia,
  container: DependencyContainer,
) => {
  const openApiHandler = new OpenAPIHandler<AppContext>(router, {
    interceptors: [onError(validationErrMap)],
    clientInterceptors: [],
    plugins: [
      ...commonPlugins,
      new SmartCoercionPlugin({
        schemaConverters: [new ZodToJsonSchemaConverter()],
      }),
    ],
  });

  return app.all(
    "/api/*",
    async (c) => {
      const authCtx = await createAuthContext(c, container);

      const { response } = await openApiHandler.handle(c.request, {
        prefix: "/api",
        context: { auth: authCtx },
      });

      return response ?? new Response("Not Found", { status: 404 });
    },
    {
      parse: "none",
    },
  );
};
