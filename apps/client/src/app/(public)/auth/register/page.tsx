"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { RegisterPage } from "@/pages/auth/register-page";

const Register = () => {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params?.get("redirect") ?? undefined;

  return (
    <RegisterPage
      navigate={(href) => router.push(href)}
      redirectTo={redirect}
    />
  );
};
export default Register;
