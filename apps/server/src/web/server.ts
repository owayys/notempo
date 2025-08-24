import "reflect-metadata";

import { config } from "@infra/config";
import { wireDI } from "@infra/di";
import { client } from "@web/client";
import { container } from "tsyringe";

wireDI(container);

client.listen(config.server.PORT);

console.log(
  `🦊 Elysia is running at ${client.server?.hostname}:${client.server?.port}`
);
