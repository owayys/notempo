import type { Elysia } from "elysia";
import type { DependencyContainer } from "tsyringe";
import { AuthService } from "@/infra/auth/auth.service";

export const initAuthRouter = (app: Elysia, container: DependencyContainer) => {
  const authServ = container.resolve(AuthService);

  app.all("/auth/*", async ({ request }) => {
    const res = await authServ.getAuthInstance().handler(request);
    return res;
  });

  return app;
};
