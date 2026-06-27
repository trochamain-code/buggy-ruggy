import { motion } from "motion/react";

const items = [
  { text: "Diseño a medida", color: "text-candy-pink" },
  { text: "Hecho a mano", color: "text-ocean" },
  { text: "100% personalizable", color: "text-grape" },
  { text: "Talleres creativos", color: "text-coral" },
  { text: "Color sin límites", color: "text-lime" },
  { text: "Materiales sostenibles", color: "text-berry" },
];

/**
 * An infinite, colorful scrolling ribbon that sits between sections to add
 * energy and movement to the page.
 */
export function Marquee() {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-neutral-950 py-5">
      <span className="bg-grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />
      <motion.div
        className="relative flex w-max gap-10 whitespace-nowrap pr-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="font-street flex items-center gap-10 text-3xl uppercase tracking-[0.08em] sm:text-4xl"
          >
            <span className={item.color}>{item.text}</span>
            <span className="text-2xl text-white/40">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
