import type { Context as ElysiaContext } from "elysia";
import type { DependencyContainer } from "tsyringe";
import { AuthService } from "@/infra/auth/auth.service";

export const createAuthContext = async (
  c: ElysiaContext,
  container: DependencyContainer,
) => {
  const authServ = container.resolve(AuthService);

  const ctx = await authServ.getUser(c.request.headers);

  return ctx;
};

export type AuthContext = Awaited<ReturnType<typeof createAuthContext>>;
