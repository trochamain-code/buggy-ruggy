import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowRight, Sparkles, Play, ChevronDown } from "lucide-react";
import { BuggyRuggyLogo } from "@/components/ui/BuggyRuggyLogo";

const floatingBlobs = [
  { color: "bg-candy-pink/40", size: "h-72 w-72", left: "-5%", top: "10%", delay: 0, depth: 30 },
  { color: "bg-ocean/30", size: "h-56 w-56", left: "75%", top: "5%", delay: 1.5, depth: -40 },
  { color: "bg-sun/50", size: "h-64 w-64", left: "55%", top: "60%", delay: 0.8, depth: 50 },
  { color: "bg-lime/35", size: "h-48 w-48", left: "20%", top: "70%", delay: 2.2, depth: -25 },
  { color: "bg-grape/30", size: "h-52 w-52", left: "85%", top: "45%", delay: 1.0, depth: 35 },
  { color: "bg-coral/35", size: "h-40 w-40", left: "40%", top: "25%", delay: 3.0, depth: -50 },
  { color: "bg-berry/25", size: "h-60 w-60", left: "10%", top: "80%", delay: 1.8, depth: 20 },
  { color: "bg-sky/30", size: "h-44 w-44", left: "65%", top: "30%", delay: 2.5, depth: -30 },
];

const colorBursts = [
  { color: "#ff2e7a", cx: 120, cy: 80, r: 18 },
  { color: "#ff6b35", cx: 250, cy: 180, r: 14 },
  { color: "#ffd60a", cx: 380, cy: 60, r: 22 },
  { color: "#34d399", cx: 500, cy: 160, r: 16 },
  { color: "#00b4d8", cx: 180, cy: 200, r: 20 },
  { color: "#a855f7", cx: 450, cy: 210, r: 12 },
  { color: "#ec4899", cx: 300, cy: 120, r: 15 },
  { color: "#60a5fa", cx: 550, cy: 90, r: 18 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Scroll-linked parallax: content drifts up & fades as you scroll past.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const blobsY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  // The tufted underline weaves (full at the top) and unravels from the right
  // as you scroll through the hero — and re-weaves when you scroll back up.
  const underlineScale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse-driven parallax for the blobs.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    const { innerWidth, innerHeight } = window;
    mx.set((e.clientX / innerWidth - 0.5) * 2);
    my.set((e.clientY / innerHeight - 0.5) * 2);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouse}
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-neutral-950 via-[#1a0b2e] to-neutral-900"
    >
      {/* Gritty grain overlay */}
      <span className="bg-grain pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-overlay" />

      {/* Floating colorful blobs with scroll + mouse parallax */}
      <motion.div style={{ y: blobsY }} className="pointer-events-none absolute inset-0">
        {floatingBlobs.map((blob, i) => (
          <Blob key={i} blob={blob} smx={smx} smy={smy} />
        ))}
      </motion.div>

      {/* SVG paint splatters at bottom */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 w-full"
        viewBox="0 0 600 300"
        preserveAspectRatio="none"
        height="150"
        xmlns="http://www.w3.org/2000/svg"
      >
        {colorBursts.map((b, i) => (
          <motion.circle
            key={i}
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: b.r, opacity: 0.85 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: "easeOut" }}
            cx={b.cx}
            cy={b.cy}
            fill={b.color}
          />
        ))}
      </svg>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col items-center text-center">
          {/* Street kicker */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-street mb-5 flex items-center gap-3 text-base uppercase tracking-[0.4em] text-neutral-400"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-candy-pink" />
            Studio de Tufting · Madrid
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-ocean" />
          </motion.p>

          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-2 rounded-full border border-candy-pink/40 bg-white/5 px-5 py-2 backdrop-blur-md"
          >
            <Sparkles size={16} className="text-candy-pink" />
            <span className="text-sm font-bold text-candy-pink">
              ¡Taller creativo cada finde!
            </span>
            <Play size={14} className="text-coral" />
          </motion.div>

          {/* Hero logo showcase — gentle hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <a href="#" aria-label="buggy ruggy" className="inline-block">
              <BuggyRuggyLogo
                variant="breeze"
                float
                imgClassName="h-24 sm:h-32 lg:h-40"
              />
            </a>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mt-6 max-w-5xl text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            TU ESPACIO,
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-candy-pink via-coral to-sun bg-clip-text text-transparent">
                TUS REGLAS
              </span>
              {/* Tufted underline — gradient bar frayed into fuzzy yarn pile */}
              <motion.svg
                initial={{ scaleX: 0, rotate: -1.5 }}
                animate={{ scaleX: 1, rotate: -1.5 }}
                transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
                viewBox="0 0 320 22"
                preserveAspectRatio="none"
                aria-hidden
                className="absolute -bottom-3 left-0 h-5 w-full origin-left overflow-visible drop-shadow-[0_4px_7px_rgba(255,107,53,0.45)] sm:h-6"
              >
                <defs>
                  <linearGradient id="tuft-underline-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ff2e7a" />
                    <stop offset="45%" stopColor="#ff6b35" />
                    <stop offset="100%" stopColor="#ffd60a" />
                  </linearGradient>
                </defs>
                <rect
                  x="4"
                  y="3"
                  width="312"
                  height="15"
                  rx="7.5"
                  fill="url(#tuft-underline-grad)"
                  filter="url(#tuft-bar)"
                />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-xl text-balance text-lg font-semibold leading-relaxed text-neutral-300 md:text-xl"
          >
            Diseñamos alfombras tan{" "}
            <span className="text-candy-pink">únicas</span> como tú.{" "}
            <span className="text-ocean">Coloridas</span>,{" "}
            <span className="text-coral">atrevidas</span> y{" "}
            <span className="text-grape">divertidas</span>. ¡Y te enseñamos a
            hacer la tuya en nuestros talleres!
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <a
              href="#galeria"
              className="font-street group inline-flex -rotate-1 items-center gap-3 rounded-2xl bg-candy-pink px-8 py-3.5 text-2xl uppercase tracking-[0.08em] text-white shadow-[0_0_28px_rgba(255,46,122,0.6)] transition-all duration-300 hover:rotate-0 hover:-translate-y-1"
            >
              Ver Galería
              <ArrowRight
                size={22}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#talleres"
              className="font-street group inline-flex rotate-1 items-center gap-2 rounded-2xl border-2 border-ocean bg-transparent px-8 py-3.5 text-2xl uppercase tracking-[0.08em] text-ocean shadow-[0_0_24px_rgba(0,180,216,0.35)] transition-all duration-300 hover:rotate-0 hover:-translate-y-1 hover:bg-ocean hover:text-white"
            >
              <Sparkles size={20} />
              Reservar Taller
            </a>
          </motion.div>

          {/* Fun stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 rounded-3xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-md sm:gap-12 sm:px-12"
          >
            {[
              { emoji: "🧶", number: "200+", label: "Alfombras locas", color: "text-candy-pink" },
              { emoji: "🎨", number: "50+", label: "Talleres divertidos", color: "text-ocean" },
              { emoji: "✨", number: "100%", label: "A tu gusto", color: "text-grape" },
              { emoji: "❤️", number: "4.9", label: "Estrellas Google", color: "text-coral" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.05 }}
                className="cursor-default text-center"
              >
                <span className="text-2xl">{stat.emoji}</span>
                <p className={`mt-1 text-2xl font-extrabold ${stat.color} sm:text-3xl`}>
                  {stat.number}
                </p>
                <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Animated scroll cue */}
      <motion.a
        href="#galeria"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-neutral-400"
        aria-label="Desplázate hacia abajo"
      >
        <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} className="text-candy-pink" />
        </motion.span>
      </motion.a>

      {/* Bottom wavy color bar */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="h-16 w-full">
          <motion.path
            initial={{ d: "M0,50 C360,50 360,0 720,0 C1080,0 1080,50 1440,50 L1440,100 L0,100 Z" }}
            d="M0,70 C360,100 360,20 720,20 C1080,20 1080,100 1440,70 L1440,100 L0,100 Z"
            fill="#ff2e7a"
            fillOpacity="0.15"
          />
          <motion.path
            initial={{ d: "M0,60 C360,60 360,10 720,10 C1080,10 1080,60 1440,60 L1440,100 L0,100 Z" }}
            d="M0,80 C360,50 360,30 720,30 C1080,30 1080,50 1440,80 L1440,100 L0,100 Z"
            fill="#00b4d8"
            fillOpacity="0.12"
          />
        </svg>
      </div>
    </section>
  );
}

/* Individual blob: entrance animation + mouse parallax based on its depth. */
function Blob({
  blob,
  smx,
  smy,
}: {
  blob: (typeof floatingBlobs)[number];
  smx: ReturnType<typeof useSpring>;
  smy: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(smx, (v) => v * blob.depth);
  const y = useTransform(smy, (v) => v * blob.depth);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: blob.delay, ease: "easeOut" }}
      style={{ left: blob.left, top: blob.top, x, y }}
      className={`absolute ${blob.color} ${blob.size} rounded-full blur-3xl`}
    />
  );
}
