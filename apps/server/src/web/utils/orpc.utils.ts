import { CONTRACT } from "@contract/contracts";
import { implement } from "@orpc/server";
import type { AppContext, AuthenticatedContext } from "@web/types";

export const pub = implement(CONTRACT.public);
export const authenticated = implement(CONTRACT.authenticated)
  .$context<AppContext>()
  .use(({ context: { auth, ...rest }, next, errors }) => {
    const user = auth.mapErr((_) => errors.NotAuthenticated()).unwrap();

    return next<AuthenticatedContext>({
      context: { ...rest, user },
    });
  });
