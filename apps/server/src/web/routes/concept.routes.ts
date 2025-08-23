import Elysia from "elysia";

const app = new Elysia({ prefix: "/concept" });

const conceptRoutes = app
  .get("/", () => {
    return "List of concepts";
  })
  .get("/:id", ({ params }) => {
    return `Concept with ID: ${params.id}`;
  })
  .post("/", ({ body }) => {
    return `Create concept with data: ${JSON.stringify(body)}`;
  });

export { conceptRoutes };
