import "reflect-metadata";

import { config } from "@infra/config";
import { wireDI } from "@infra/di";
import { client } from "@web/client";
import { routes } from "@web/routes";

wireDI();

for (const route of routes) {
  client.use(route);
}

client.listen(config.server.PORT);

console.log(
  `🦊 Elysia is running at ${client.server?.hostname}:${client.server?.port}`
);
