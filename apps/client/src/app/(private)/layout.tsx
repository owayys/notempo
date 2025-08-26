import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/shared/auth-client";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout = async ({ children }: PrivateLayoutProps) => {
  const { session } = await getServerAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  return children;
};
export default PrivateLayout;
