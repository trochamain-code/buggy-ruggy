import { Instagram } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { useState } from "react";

export function InstagramFloatingButton() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0.12);
  });

  const R = 26;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://www.instagram.com/buggy.ruggy"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Instagram Buggy Ruggy"
          className="group fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-[0_8px_30px_rgba(255,46,122,0.25)] backdrop-blur-xl"
        >
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff2e7a" />
                <stop offset="33%" stopColor="#ff6b35" />
                <stop offset="66%" stopColor="#ffd60a" />
                <stop offset="100%" stopColor="#00b4d8" />
              </linearGradient>
            </defs>
            <circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke="#f1f1f1"
              strokeWidth="4"
            />
            <motion.circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke="url(#ring-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>
          <Instagram
            size={22}
            className="text-candy-pink transition-transform duration-300 group-hover:scale-110"
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
