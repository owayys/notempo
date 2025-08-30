import { LoginForm } from "@/components/auth/login-form";

type LoginPageProps = {
  redirectTo: string | undefined;
  navigate: (href: string) => void;
};

export function LoginPage({ redirectTo, navigate }: LoginPageProps) {
  const onLoginSuccess = async () => {
    if (redirectTo) {
      navigate(redirectTo);
    } else {
      navigate("/");
    }
  };

  return <LoginForm onLoginSuccess={onLoginSuccess} />;
}
