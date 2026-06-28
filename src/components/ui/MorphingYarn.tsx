import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

const shapes = [
  "M20,4 C31,4 36,15 36,20 C36,31 31,36 20,36 C9,36 4,31 4,20 C4,15 5,12 8,8 C13.5,1 16.5,4 20,4 Z",
  "M20,2 L36,12 L34,30 L20,38 L6,30 L4,12 Z",
  "M20,4 C30,4 38,10 38,20 C38,30 30,38 20,38 C10,38 2,32 2,20 C2,8 10,4 20,4 Z",
  "M8,4 L32,4 L36,20 L32,36 L8,36 L4,20 Z",
];

export function MorphingYarn() {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (!pathRef.current) return;

      const morph = () => {
        indexRef.current = (indexRef.current + 1) % shapes.length;
        gsap.to(pathRef.current, {
          duration: 1.5,
          morphSVG: { shape: shapes[indexRef.current]!, type: "rotational" },
          ease: "elastic.inOut(1, 0.4)",
          onComplete: () => {
            gsap.delayedCall(1.5, morph);
          },
        });
      };

      gsap.delayedCall(0.5, morph);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex items-center justify-center" aria-hidden>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="yarn-morph-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2e7a" />
            <stop offset="50%" stopColor="#ff6b35" />
            <stop offset="100%" stopColor="#ffd60a" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={shapes[0]}
          fill="url(#yarn-morph-grad)"
        />
      </svg>
    </div>
  );
}
