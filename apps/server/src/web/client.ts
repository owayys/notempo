import { Elysia } from "elysia";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { router } from "@web/routes";

const handler = new OpenAPIHandler(router);

export const client = new Elysia()
  .all(
    "/api*",
    async ({ request }: { request: Request }) => {
      const { response } = await handler.handle(request, {
        prefix: "/api",
      });

      return response ?? new Response("Not Found", { status: 404 });
    },
    {
      parse: "none",
    }
  )
  .get("/", () => "Hello Elysia!")
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  }));
