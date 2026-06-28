import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candy-pink focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-candy-pink text-white hover:brightness-90 shadow-lg shadow-candy-pink/30 hover:shadow-candy-pink/50 hover:-translate-y-0.5",
        secondary:
          "bg-neutral-900 text-white hover:brightness-90 shadow-lg shadow-neutral-200 hover:-translate-y-0.5",
        outline:
          "border-2 border-neutral-200 bg-transparent text-neutral-900 hover:border-candy-pink hover:text-candy-pink hover:bg-candy-pink-light",
        ghost:
          "bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100",
        accent:
          "bg-coral text-white hover:brightness-90 shadow-lg shadow-coral/30 hover:shadow-coral/50 hover:-translate-y-0.5",
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
