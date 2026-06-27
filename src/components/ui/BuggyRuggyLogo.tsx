import {
  motion,
  useTime,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { asset } from "@/lib/utils";

type HoverVariant = "fuzz" | "soft" | "breeze";

const LOGO_SRC = "/images/buggy-ruggy-logo-transparent.png";
const LOGO_ALT = "buggy ruggy — alfombras de tufting";
const IMG_BASE =
  "logo-tuft block w-auto select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]";

/**
 * The "buggy ruggy" tufted logo.
 *
 * - variant "fuzz": the yarn texture ripples and shimmers energetically on
 *   hover (animated SVG displacement) with a springy wobble. Used in the
 *   header / footer.
 * - variant "soft": a much gentler hover — a smooth scale and warm glow.
 * - variant "breeze": a windswept sway — the logo bends from its base like
 *   long grass in a breeze. The motion is driven by continuous, overlapping
 *   sine waves (never repeating, no keyframe seams) whose amplitude eases in
 *   and out on hover, so it flows instead of jumping. Used in the hero.
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

  return (
    <motion.span
      className={`relative inline-flex items-center ${triggerClass} ${className}`}
      animate={float ? { y: [0, -10, 0] } : undefined}
      transition={
        float ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined
      }
    >
      {variant === "breeze" ? (
        <BreezeImg imgClassName={imgClassName} />
      ) : (
        <motion.img
          src={asset(LOGO_SRC)}
          alt={LOGO_ALT}
          draggable={false}
          whileHover={
            variant === "fuzz" ? { scale: 1.06, rotate: -1.5 } : { scale: 1.035 }
          }
          transition={
            variant === "fuzz"
              ? { type: "spring", stiffness: 320, damping: 11 }
              : { type: "tween", duration: 0.5, ease: "easeOut" }
          }
          className={`${IMG_BASE} ${imgClassName}`}
        />
      )}
    </motion.span>
  );
}

/**
 * Hero logo with a continuous, organic "breeze" sway.
 *
 * Two sine waves at incommensurate frequencies are summed so the motion never
 * loops cleanly (no seam to jump at). A spring-driven amplitude ramps the whole
 * thing from rest to full on hover and back, keeping it perfectly smooth.
 */
function BreezeImg({ imgClassName }: { imgClassName: string }) {
  const time = useTime();
  const amp = useMotionValue(0);
  const ampSpring = useSpring(amp, { stiffness: 45, damping: 16, mass: 0.6 });

  const skewX = useTransform([time, ampSpring], ([t = 0, a = 0]: number[]) => {
    const s = t / 1000;
    return (Math.sin(s * 1.05) * 3 + Math.sin(s * 0.41 + 1.3) * 1.4) * a;
  });
  const rotate = useTransform([time, ampSpring], ([t = 0, a = 0]: number[]) => {
    const s = t / 1000;
    return Math.sin(s * 0.7 + 0.4) * 1.0 * a;
  });
  const scale = useTransform(ampSpring, (a) => 1 + a * 0.02);

  return (
    <motion.img
      src={asset(LOGO_SRC)}
      alt={LOGO_ALT}
      draggable={false}
      onHoverStart={() => amp.set(1)}
      onHoverEnd={() => amp.set(0)}
      style={{ skewX, rotate, scale, transformOrigin: "bottom center" }}
      className={`${IMG_BASE} ${imgClassName}`}
    />
  );
}
