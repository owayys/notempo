import { Elysia } from "elysia";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { router } from "@web/routes";
import { createAuthContext } from "./utils/auth-context";
import { container } from "tsyringe";

const handler = new OpenAPIHandler(router);

export const client = new Elysia()
  .all(
    "/api/*",
    async (c) => {
      const authCtx = await createAuthContext(c, container);

      console.log(c.request.body);

      const { response } = await handler.handle(c.request, {
        prefix: "/api",
        context: { auth: authCtx },
      });

      return response ?? new Response("Not Found", { status: 404 });
    },
    {
      parse: "none",
    },
  )
  .get("/", () => "Hello Elysia!")
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  }));
