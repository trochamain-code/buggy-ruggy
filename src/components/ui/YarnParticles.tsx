import { useRef, useCallback } from "react";
import gsap from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

gsap.registerPlugin(Physics2DPlugin);

const COLORS = ["#ff2e7a", "#ff6b35", "#ffd60a", "#34d399", "#00b4d8", "#a855f7"];

interface YarnParticlesProps {
  className?: string;
}

export function YarnParticles({ className }: YarnParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const burst = useCallback((e: React.MouseEvent) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    for (let i = 0; i < 14; i++) {
      const particle = document.createElement("div");
      particle.className =
        "pointer-events-none absolute h-2 w-2 rounded-full";
      particle.style.background = COLORS[i % COLORS.length]!;
      particle.style.left = `${cx}px`;
      particle.style.top = `${cy}px`;
      particle.style.willChange = "transform, opacity";
      containerRef.current?.appendChild(particle);

      const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.5;
      const velocity = 80 + Math.random() * 120;

      gsap.to(particle, {
        duration: 0.9,
        physics2D: {
          velocity,
          angle: (angle * 180) / Math.PI,
          gravity: 300,
        },
        opacity: 0,
        scale: 0.3,
        onComplete() {
          particle.remove();
        },
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className ?? ""}`}
      onMouseEnter={burst}
      aria-hidden
    >
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-candy-pink/0 via-coral/10 to-sun/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
