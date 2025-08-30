import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  basePath: "/auth",
  plugins: [nextCookies()],
  fetchOptions: {
    credentials: "include",
  },
});

const fetchSession = async (headers?: Headers) => {
  const res = await authClient.getSession({
    fetchOptions: headers
      ? { headers, credentials: "include" }
      : { credentials: "include" },
  });
  return res.data || null;
};

const getServerAuthSession = async () => {
  const { headers } = await import("next/headers");
  const nextHeaders = await headers();
  const session = await fetchSession(nextHeaders);
  return { session };
};

const getClientAuthSession = async () => {
  const session = await fetchSession();
  return { session };
};

export const getAuthSession =
  typeof window !== "undefined" ? getClientAuthSession : getServerAuthSession;

export const useAuthSession = () => {
  return authClient.useSession();
};

export type AppSession = typeof authClient.$Infer.Session;
