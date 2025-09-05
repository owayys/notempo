"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { useLogoutMutation } from "@/shared/hooks/auth-hooks";
import { toast } from "@/shared/toast";

export const LogoutButton = () => {
  const logoutMut = useLogoutMutation();
  const navigate = useRouter();

  const onLogoutSuccess = async () => {
    navigate.replace("/auth/login");
  };

  const onClick = async () => {
    await logoutMut.mutateAsync(undefined, {
      onError: (err) => {
        toast.error({
          title: "Logout failed",
          description: err.message,
        });
      },
      onSuccess: async (res) => {
        if (res.data?.success) {
          await onLogoutSuccess();
        }
      },
    });
  };

  return (
    <Button onClick={onClick} variant="link">
      <LogOut className="rotate-180" />
    </Button>
  );
};
