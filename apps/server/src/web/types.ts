import type { UserEntity } from "@domain/user";
import type { ResponseHeadersPluginContext } from "@orpc/server/plugins";

export type AppContext = ResponseHeadersPluginContext & {
  //   auth: AuthContext; // AuthContext can be null, so have to nest it to allow usage with orpc
};

export type AuthenticatedContext = Omit<AppContext, "auth"> & {
  user: UserEntity;
};
