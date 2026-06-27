import { motion } from "motion/react";
import { asset } from "@/lib/utils";

type HoverVariant = "fuzz" | "soft" | "breeze";

/**
 * The "buggy ruggy" tufted logo.
 *
 * - variant "fuzz": the yarn texture ripples and shimmers energetically on
 *   hover (animated SVG displacement) with a springy wobble. Used in the
 *   header / footer.
 * - variant "soft": a much gentler hover — a slow, subtle tuft "breathing"
 *   plus a smooth scale and warm glow, no bounce.
 * - variant "breeze": a windswept sway — the logo bends from its base like
 *   long grass in a breeze, with a slow flowing texture ripple. Used in the
 *   hero showcase.
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
  const triggerClass =
    variant === "fuzz"
      ? "logo-tuft-trigger"
      : variant === "breeze"
        ? "logo-breeze-trigger"
        : "logo-soft-trigger";

  const hover =
    variant === "fuzz"
      ? { scale: 1.06, rotate: -1.5 }
      : variant === "breeze"
        ? // Bend from the base like long grass caught in a gust, then settle.
          { skewX: [0, -4.5, 3, -1.5, 0], rotate: [0, -1.2, 0.7, -0.3, 0], scale: 1.02 }
        : { scale: 1.035 };

  const hoverTransition =
    variant === "fuzz"
      ? { type: "spring" as const, stiffness: 320, damping: 11 }
      : variant === "breeze"
        ? {
            default: { duration: 3.6, repeat: Infinity, ease: "easeInOut" as const },
            scale: { duration: 0.6, ease: "easeOut" as const },
          }
        : { type: "tween" as const, duration: 0.5, ease: "easeOut" as const };

  return (
    <motion.span
      className={`relative inline-flex items-center ${triggerClass} ${className}`}
      animate={float ? { y: [0, -10, 0] } : undefined}
      transition={
        float ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined
      }
    >
      <motion.img
        src={asset("/images/buggy-ruggy-logo-transparent.png")}
        alt="buggy ruggy — alfombras de tufting"
        draggable={false}
        whileHover={hover}
        transition={hoverTransition}
        style={variant === "breeze" ? { transformOrigin: "bottom center" } : undefined}
        className={`logo-tuft block w-auto select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] ${imgClassName}`}
      />
    </motion.span>
  );
}
