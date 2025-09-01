"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const separatorVariants = cva(
  "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
  {
    variants: {
      variant: {
        default: "",
        dashed:
          "bg-transparent relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-border before:to-transparent before:bg-[length:8px_1px] before:bg-repeat-x data-[orientation=vertical]:before:bg-gradient-to-b data-[orientation=vertical]:before:bg-[length:1px_8px] data-[orientation=vertical]:before:bg-repeat-y",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Separator({
  className,
  variant,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>) {
  return (
    <SeparatorPrimitive.Root
      className={cn(separatorVariants({ variant, className }), className)}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
}

export { Separator };
