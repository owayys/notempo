import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-wide lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-wide",
      h3: "scroll-m-20 text-2xl font-semibold tracking-wide",
      h4: "scroll-m-20 text-xl font-semibold tracking-wide",
      h5: "scroll-m-20 text-lg font-semibold tracking-wide",
      h6: "scroll-m-20 text-base font-semibold tracking-wide",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      muted: "text-muted-foreground",
      small: "text-sm font-medium leading-none",
      large: "text-lg font-semibold",
      lead: "text-xl text-muted-foreground",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      link: "text-primary underline-offset-4 hover:underline font-medium transition-colors",
    },
  },
  defaultVariants: {},
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: keyof React.JSX.IntrinsicElements;
}

const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, ...props }, ref) => {
    const Component = (as ||
      (variant?.startsWith("h")
        ? variant
        : "p")) as keyof React.JSX.IntrinsicElements;

    return React.createElement(Component, {
      className: cn(typographyVariants({ variant }), className),
      ref,
      ...props,
    });
  },
);
Typography.displayName = "Typography";

export { Typography, typographyVariants };
