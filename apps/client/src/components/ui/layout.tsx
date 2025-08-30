import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const boxVariants = cva("", {
  variants: {
    p: {
      0: "p-0",
      1: "p-1",
      2: "p-2",
      3: "p-3",
      4: "p-4",
      5: "p-5",
      6: "p-6",
      8: "p-8",
      10: "p-10",
      12: "p-12",
      16: "p-16",
      20: "p-20",
      24: "p-24",
    },
    px: {
      0: "px-0",
      1: "px-1",
      2: "px-2",
      3: "px-3",
      4: "px-4",
      5: "px-5",
      6: "px-6",
      8: "px-8",
      10: "px-10",
      12: "px-12",
      16: "px-16",
      20: "px-20",
      24: "px-24",
    },
    py: {
      0: "py-0",
      1: "py-1",
      2: "py-2",
      3: "py-3",
      4: "py-4",
      5: "py-5",
      6: "py-6",
      8: "py-8",
      10: "py-10",
      12: "py-12",
      16: "py-16",
      20: "py-20",
      24: "py-24",
    },
    m: {
      0: "m-0",
      1: "m-1",
      2: "m-2",
      3: "m-3",
      4: "m-4",
      5: "m-5",
      6: "m-6",
      8: "m-8",
      10: "m-10",
      12: "m-12",
      16: "m-16",
      20: "m-20",
      24: "m-24",
      auto: "m-auto",
    },
    mx: {
      0: "mx-0",
      1: "mx-1",
      2: "mx-2",
      3: "mx-3",
      4: "mx-4",
      5: "mx-5",
      6: "mx-6",
      8: "mx-8",
      10: "mx-10",
      12: "mx-12",
      16: "mx-16",
      20: "mx-20",
      24: "mx-24",
      auto: "mx-auto",
    },
    my: {
      0: "my-0",
      1: "my-1",
      2: "my-2",
      3: "my-3",
      4: "my-4",
      5: "my-5",
      6: "my-6",
      8: "my-8",
      10: "my-10",
      12: "my-12",
      16: "my-16",
      20: "my-20",
      24: "my-24",
      auto: "my-auto",
    },
    bg: {
      background: "bg-background",
      foreground: "bg-foreground",
      card: "bg-card",
      muted: "bg-muted",
      primary: "bg-primary",
      secondary: "bg-secondary",
      destructive: "bg-destructive",
      accent: "bg-accent",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
    border: {
      0: "border-0",
      1: "border",
      2: "border-2",
      4: "border-4",
      8: "border-8",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-2xl",
    },
  },
});

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {}

const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    { className, p, px, py, m, mx, my, bg, rounded, border, shadow, ...props },
    ref,
  ) => {
    return (
      <div
        className={cn(
          boxVariants({ p, px, py, m, mx, my, bg, rounded, border, shadow }),
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Box.displayName = "Box";

const stackVariants = cva("flex", {
  variants: {
    spacing: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
      20: "gap-20",
      24: "gap-24",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
  },
  defaultVariants: {
    spacing: 0,
    align: "start",
    justify: "start",
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

const VStack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing, align, justify, ...props }, ref) => {
    return (
      <div
        className={cn(
          stackVariants({ spacing, align, justify }),
          "flex-col",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
VStack.displayName = "VStack";

const HStack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing, align, justify, ...props }, ref) => {
    return (
      <div
        className={cn(
          stackVariants({ spacing, align, justify }),
          "flex-row",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
HStack.displayName = "HStack";

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
      20: "gap-20",
      24: "gap-24",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 0,
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, ...props }, ref) => {
    return (
      <div
        className={cn(gridVariants({ cols, gap }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Grid.displayName = "Grid";

export { Box, VStack, HStack, Grid };
