"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

// Liten utils for å slå sammen klasser
function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

type Variant = "default" | "outline" | "ghost" | "link" | "secondary";
type Size = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: Variant;
  size?: Size;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background";

const variants: Record<Variant, string> = {
  default:
    "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200",
  outline:
    "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-100 dark:hover:bg-gray-800",
  ghost:
    "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-inherit",
  link: "bg-transparent underline underline-offset-4 hover:no-underline text-blue-600 dark:text-blue-400",
  secondary:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
};

const sizes: Record<Size, string> = {
  default: "h-9 px-4",
  sm: "h-8 px-3 rounded-md",
  lg: "h-10 px-6 rounded-md",
  icon: "h-9 w-9 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild, variant = "default", size = "default", ...props }, ref) => {
    const Comp: any = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
