import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import { headers } from "next/headers";

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

export const getServerAuthSession = async () => {
  const nextHeaders = await headers();
  const session = await fetchSession(nextHeaders);
  return { session };
};

export const getClientAuthSession = async () => {
  const session = await fetchSession();
  return { session };
};

export const useAuthSession = () => {
  return authClient.useSession();
};

export type AppSession = typeof authClient.$Infer.Session;
