import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-200 hover:shadow-brand-300 hover:-translate-y-0.5",
        secondary:
          "bg-neutral-900 text-white hover:bg-neutral-800 shadow-lg shadow-neutral-200 hover:-translate-y-0.5",
        outline:
          "border-2 border-neutral-200 bg-transparent text-neutral-900 hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50",
        ghost:
          "bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100",
        accent:
          "bg-accent-600 text-white hover:bg-accent-700 shadow-lg shadow-accent-200 hover:shadow-accent-300 hover:-translate-y-0.5",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
