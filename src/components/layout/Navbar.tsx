import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { useUIStore } from "@/store/ui";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Magnetic } from "@/components/ui/Magnetic";
import { BuggyRuggyLogo } from "@/components/ui/BuggyRuggyLogo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#galeria", id: "galeria", label: "Galería", emoji: "🖼️", accent: "text-candy-pink" },
  { href: "#diseno", id: "diseno", label: "A Medida", emoji: "🎨", accent: "text-ocean" },
  { href: "#talleres", id: "talleres", label: "Talleres", emoji: "🧶", accent: "text-sun" },
  { href: "#contacto", id: "contacto", label: "Contacto", emoji: "💌", accent: "text-lime" },
];

const sectionIds = navLinks.map((l) => l.id);

export function Navbar() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrolled(v > 0.015);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Rainbow scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-candy-pink via-coral via-sun via-lime via-ocean to-grape"
      />

      <motion.nav
        initial={false}
        animate={{
          marginTop: scrolled ? 12 : 18,
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className={cn(
          "relative mx-3 flex max-w-7xl items-center justify-between overflow-hidden rounded-[1.6rem] border border-white/10 px-4 sm:mx-6 sm:px-6 lg:mx-auto lg:px-8",
          "bg-neutral-950/50 backdrop-blur-2xl transition-[box-shadow,background] duration-500",
          scrolled
            ? "shadow-neon bg-neutral-950/70"
            : "shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]",
        )}
      >
        {/* Gritty grain + spray glow */}
        <span className="bg-grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />
        <span className="pointer-events-none absolute -left-10 -top-16 h-40 w-40 rounded-full bg-candy-pink/30 blur-3xl" />
        <span className="pointer-events-none absolute -right-8 -bottom-16 h-40 w-40 rounded-full bg-ocean/30 blur-3xl" />

        {/* Logo */}
        <Magnetic strength={0.25} className="relative z-10">
          <a href="#" className="flex items-center" aria-label="buggy ruggy — inicio">
            <BuggyRuggyLogo imgClassName={scrolled ? "h-9 sm:h-10" : "h-11 sm:h-12"} />
          </a>
        </Magnetic>

        {/* Desktop nav — street tags */}
        <ul className="relative z-10 hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.href} className="relative">
                <Magnetic strength={0.3}>
                  <a
                    href={link.href}
                    className={cn(
                      "font-street relative block px-4 py-2 text-xl uppercase leading-none tracking-[0.12em] transition-colors duration-200",
                      isActive
                        ? cn(link.accent, "spray-underline")
                        : "text-neutral-300 hover:text-white",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-glow"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 -z-10 rounded-xl bg-white/5"
                      />
                    )}
                  </a>
                </Magnetic>
              </li>
            );
          })}
        </ul>

        {/* CTAs — street stickers */}
        <div className="relative z-10 hidden items-center gap-3 md:flex">
          <Magnetic strength={0.35}>
            <a
              href="#contacto"
              className="font-street inline-flex -rotate-1 items-center rounded-xl border-2 border-white/80 bg-transparent px-5 py-2 text-lg uppercase tracking-[0.1em] text-white transition-all duration-300 hover:rotate-0 hover:bg-white hover:text-neutral-950"
            >
              Presupuesto
            </a>
          </Magnetic>
          <Magnetic strength={0.35}>
            <a
              href="#talleres"
              className="font-street inline-flex rotate-1 items-center gap-2 rounded-xl bg-candy-pink px-5 py-2 text-lg uppercase tracking-[0.1em] text-white shadow-[0_0_20px_rgba(255,46,122,0.6)] transition-all duration-300 hover:rotate-0 hover:-translate-y-0.5"
            >
              <Sparkles size={16} />
              Reservar
            </a>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-10 rounded-xl p-2.5 text-white transition-all hover:bg-white/10 md:hidden"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile menu — dark sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-grain relative mx-3 mt-2 overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/95 shadow-neon backdrop-blur-2xl md:hidden"
          >
            <div className="relative z-10 flex flex-col gap-1 px-4 py-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "font-street flex items-center gap-3 rounded-2xl px-4 py-3 text-2xl uppercase tracking-[0.1em] transition-colors",
                    active === link.id
                      ? cn(link.accent, "bg-white/5")
                      : "text-neutral-300 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <span className="text-lg">{link.emoji}</span>
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="#contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-street flex items-center justify-center rounded-2xl border-2 border-white/80 py-3.5 text-xl uppercase tracking-[0.1em] text-white transition-all hover:bg-white hover:text-neutral-950"
                >
                  Pedir Presupuesto
                </a>
                <a
                  href="#talleres"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-street flex items-center justify-center gap-2 rounded-2xl bg-candy-pink py-3.5 text-xl uppercase tracking-[0.1em] text-white shadow-[0_0_20px_rgba(255,46,122,0.6)]"
                >
                  <Sparkles size={18} />
                  Reservar Taller
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
