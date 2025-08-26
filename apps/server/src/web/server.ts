import "reflect-metadata";

import { config } from "@infra/config";
import { wireDI } from "@infra/di";
import { client } from "@web/client";
import { container } from "tsyringe";
import { initAuthRouter } from "./routes/auth";

wireDI(container);

initAuthRouter(client, container);

client.listen(config.app.PORT);

console.log(
  `🦊 Elysia is running at ${client.server?.hostname}:${client.server?.port}`,
);
