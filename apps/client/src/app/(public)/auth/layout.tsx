import { Loader2 } from "lucide-react";
import type React from "react";
import { Suspense } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
      {children}
    </Suspense>
  );
};

export default AuthLayout;
