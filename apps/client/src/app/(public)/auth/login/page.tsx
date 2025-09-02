"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LoginPage } from "@/pages/auth/login-page";

const Login = () => {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params?.get("redirect") ?? undefined;

  return (
    <LoginPage navigate={(href) => router.push(href)} redirectTo={redirect} />
  );
};
export default Login;
