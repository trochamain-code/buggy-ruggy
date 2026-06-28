import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { YarnParticles } from "@/components/ui/YarnParticles";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const underlineRef = useRef<SVGSVGElement>(null);

  const typeText = "EL HILO SE";
  const fullTyped = "EL HILO SE VUELVE ARTE";
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    setTyped("");
    const timer = setInterval(() => {
      if (i < fullTyped.length) {
        setTyped(fullTyped.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(blink);
  }, []);

  const firstLineDone = typed.length >= typeText.length;

  // Scroll-linked animation driven by GSAP ScrollTrigger:
  //  · the content drifts up and fades as you scroll past the hero
  //  · the tufting video gently zooms in (parallax depth)
  //  · the tufted underline unravels (its weave undoes from the right)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const through = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };

      gsap.to(contentRef.current, { y: 150, ease: "none", scrollTrigger: through });
      gsap.to(contentRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "center top", scrub: true },
      });
      gsap.to(videoRef.current, { scale: 1.14, ease: "none", scrollTrigger: through });

      if (underlineRef.current) {
        gsap.fromTo(
          underlineRef.current,
          { scaleX: 1 },
          {
            scaleX: 0,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "center top", scrub: true },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center bg-white/0"
    >
      {/* Looping tufting-machine background video — fixed full-viewport */}
      <video
        ref={videoRef}
        className="fixed inset-0 z-0 h-screen w-screen max-w-none object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/tufting-hero.jpg"
        aria-hidden
      >
        <source src="/tufting-hero.mp4" type="video/mp4" />
      </video>

      {/* Readability layer: soft white wash + a glow behind the text so the
          dark copy stays legible over the colorful spinning yarn. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 52% at 50% 46%, rgba(255,255,255,0.82), rgba(255,255,255,0.32) 60%, rgba(255,255,255,0) 78%), linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 22%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.9) 100%)",
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col items-center text-center">
          {/* Street kicker */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-street mb-5 flex items-center gap-3 text-base uppercase tracking-[0.4em] black"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-candy-pink" />
            Studio de Tufting · Sevilla
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-ocean" />
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="font-climate max-w-5xl text-balance text-5xl leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span>
              {typed.length <= typeText.length ? typed : typeText}
              {!firstLineDone && (
                <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
              )}
            </span>
            <br />
            <motion.span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-candy-pink via-coral to-sun bg-clip-text text-transparent">
                {typed.length > typeText.length ? typed.slice(typeText.length + 1) : ""}
                {typed.length > typeText.length && (
                  <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
                )}
              </span>
              {/* Tufted underline — gradient bar frayed into fuzzy yarn pile.
                  Its weave unravels with scroll (GSAP, see underlineRef). */}
              <svg
                ref={underlineRef}
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
              </svg>
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-xl text-balance text-lg font-semibold leading-relaxed text-neutral-700 md:text-xl"
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
            <div className="relative">
              <YarnParticles className="absolute inset-0 z-0 rounded-2xl" />
              <a
                href="#galeria"
                className="font-street relative z-10 inline-flex -rotate-1 items-center gap-3 rounded-2xl bg-candy-pink px-8 py-3.5 text-2xl uppercase tracking-[0.08em] text-white shadow-[0_0_28px_rgba(255,46,122,0.6)] transition-all duration-300 hover:rotate-0 hover:-translate-y-1"
              >
                Ver Galería
                <ArrowRight
                  size={22}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
            <div className="relative">
              <YarnParticles className="absolute inset-0 z-0 rounded-2xl" />
              <a
                href="#talleres"
                className="font-street relative z-10 inline-flex rotate-1 items-center gap-2 rounded-2xl border-2 border-ocean bg-white/70 px-8 py-3.5 text-2xl uppercase tracking-[0.08em] text-ocean shadow-[0_0_24px_rgba(0,180,216,0.35)] backdrop-blur-sm transition-all duration-300 hover:rotate-0 hover:-translate-y-1 hover:bg-ocean hover:text-white"
              >
                <Sparkles size={20} />
                Reservar Taller
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated scroll cue */}
      <motion.a
        href="#galeria"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 black"
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
    </section>
  );
}
