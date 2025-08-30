import "reflect-metadata";

import { cors } from "@elysiajs/cors";
import { config } from "@infra/config";
import { wireDI } from "@infra/di";
import { Elysia } from "elysia";
import { container } from "tsyringe";
import { initAuthRouter } from "./routes/auth";
import { addOpenApiHandler } from "./utils/openapi.handler";
import { addRpcHandler } from "./utils/rpc.handler";

wireDI(container);

export const client = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia!")
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  }));

initAuthRouter(client, container);
addOpenApiHandler(client, container);
addRpcHandler(client, container);

client.listen(config.app.PORT);

console.log(
  `🦊 Elysia is running at ${client.server?.hostname}:${client.server?.port}`,
);
