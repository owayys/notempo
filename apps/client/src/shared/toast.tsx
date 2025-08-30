"use client";

import { CircleAlert, CircleCheck, CircleX, TriangleAlert } from "lucide-react";
import { toast as sonner } from "sonner";

type ToastArgs = {
  title: string;
  description?: string;
  duration?: number;
};

export const toast = {
  success: ({ title, description, duration = 5000 }: ToastArgs) =>
    sonner.success(title, {
      description,
      duration,
      icon: <CircleCheck className="h-5 w-5" />,
    }),
  error: ({ title, description, duration = 5000 }: ToastArgs) =>
    sonner.error(title, {
      description,
      duration,
      icon: <CircleX className="h-5 w-5" />,
    }),
  warning: ({ title, description, duration = 5000 }: ToastArgs) =>
    sonner.warning(title, {
      description,
      duration,
      icon: <CircleAlert className="h-5 w-5" />,
    }),
  info: ({ title, description, duration = 5000 }: ToastArgs) =>
    sonner.info(title, {
      description,
      duration,
      icon: <TriangleAlert className="h-5 w-5" />,
    }),
} as const;
