import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A soft, colorful light that follows the cursor to make the whole page feel
 * "illuminated". Uses screen blend mode so it brightens whatever is underneath.
 * Disabled on touch / coarse-pointer devices.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  const sx = useSpring(x, { stiffness: 180, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 26, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-30 h-[500px] w-[500px] rounded-full opacity-60 mix-blend-screen blur-3xl"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,46,122,0.45)_0%,rgba(0,180,216,0.25)_40%,transparent_70%)]" />
    </motion.div>
  );
}
