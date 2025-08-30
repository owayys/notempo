import { redirect } from "next/navigation";
import { getAuthSession } from "@/shared/auth-client";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout = async ({ children }: PrivateLayoutProps) => {
  const { session } = await getAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  return children;
};
export default PrivateLayout;
