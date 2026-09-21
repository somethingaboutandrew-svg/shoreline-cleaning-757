import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,box-shadow,transform] duration-150 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-11 px-5 text-sm sm:text-base active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-aqua text-white hover:bg-aqua-dark shadow-card",
        navy: "bg-navy text-white hover:bg-navy-deep shadow-card",
        outline: "bg-white text-navy shadow-card hover:shadow-card-hover",
        ghost: "text-navy hover:bg-sky-soft",
      },
      size: {
        default: "min-h-11 px-5",
        lg: "min-h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
