import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-2xl border-2 border-neutral-200 bg-white px-4 py-2 text-sm font-semibold ring-offset-white transition-all duration-200 placeholder:text-neutral-400 focus-visible:border-candy-pink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-candy-pink/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
