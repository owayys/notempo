import { Elysia } from "elysia";

export const client = new Elysia({ prefix: "/api" })
  .get("/", () => "Hello Elysia!")
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  }));
