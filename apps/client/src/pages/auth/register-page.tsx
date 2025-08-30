import { RegisterForm } from "@/components/auth/register-form";

type RegisterPageProps = {
  redirectTo: string | undefined;
  navigate: (href: string) => void;
};

export function RegisterPage({ redirectTo, navigate }: RegisterPageProps) {
  const onRegisterSuccess = async () => {
    if (redirectTo) {
      navigate(redirectTo);
    } else {
      navigate("/");
    }
  };

  return <RegisterForm onRegisterSuccess={onRegisterSuccess} />;
}
