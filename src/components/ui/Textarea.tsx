import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-2xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm font-semibold ring-offset-white transition-all duration-200 placeholder:text-neutral-400 focus-visible:border-candy-pink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-candy-pink/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
