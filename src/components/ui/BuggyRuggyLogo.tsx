import { motion } from "motion/react";
import { asset } from "@/lib/utils";

type HoverVariant = "fuzz" | "soft";

/**
 * The "buggy ruggy" tufted logo.
 *
 * - variant "fuzz": the yarn texture ripples and shimmers energetically on
 *   hover (animated SVG displacement) with a springy wobble. Used in the
 *   header / footer.
 * - variant "soft": a much gentler hover — a slow, subtle tuft "breathing"
 *   plus a smooth scale and warm glow, no bounce. Used for the hero showcase.
 *
 * Filters are defined once globally in <SvgFilters />.
 */
export function BuggyRuggyLogo({
  className = "",
  imgClassName = "h-12",
  variant = "fuzz",
  float = false,
}: {
  className?: string;
  imgClassName?: string;
  variant?: HoverVariant;
  float?: boolean;
}) {
  const isFuzz = variant === "fuzz";

  return (
    <motion.span
      className={`relative inline-flex items-center ${
        isFuzz ? "logo-tuft-trigger" : "logo-soft-trigger"
      } ${className}`}
      animate={float ? { y: [0, -10, 0] } : undefined}
      transition={
        float ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined
      }
    >
      <motion.img
        src={asset("/images/buggy-ruggy-logo-transparent.png")}
        alt="buggy ruggy — alfombras de tufting"
        draggable={false}
        whileHover={isFuzz ? { scale: 1.06, rotate: -1.5 } : { scale: 1.035 }}
        transition={
          isFuzz
            ? { type: "spring", stiffness: 320, damping: 11 }
            : { type: "tween", duration: 0.5, ease: "easeOut" }
        }
        className={`logo-tuft block w-auto select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] ${imgClassName}`}
      />
    </motion.span>
  );
}
