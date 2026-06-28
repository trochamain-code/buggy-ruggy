import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, ScrollTrigger);

interface YarnThreadProps {
  className?: string;
}

export function YarnThread({ className }: YarnThreadProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (!pathRef.current) return;

      // Draw the yarn thread on scroll
      gsap.fromTo(
        pathRef.current,
        { drawSVG: "0% 0%" },
        {
          drawSVG: "100% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.5,
            scroller: "#smooth-wrapper",
          },
        },
      );

      // Animate yarn ball along the path
      if (ballRef.current) {
        gsap.to(ballRef.current, {
          duration: 1,
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.5,
            scroller: "#smooth-wrapper",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-visible ${className ?? ""}`}
      aria-hidden
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M-50,100 C200,200 300,50 500,150 C700,250 600,400 800,350 C1000,300 1100,500 1300,450 C1450,420 1490,550 1490,550"
          stroke="url(#yarn-grad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: "none",
          }}
        />
        <defs>
          <linearGradient id="yarn-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff2e7a" />
            <stop offset="25%" stopColor="#ff6b35" />
            <stop offset="50%" stopColor="#ffd60a" />
            <stop offset="75%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#00b4d8" />
          </linearGradient>
        </defs>
      </svg>
      {/* Yarn ball that travels along the path */}
      <div
        ref={ballRef}
        className="absolute left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-candy-pink via-coral to-sun shadow-lg"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
