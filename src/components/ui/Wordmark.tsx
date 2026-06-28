import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

interface WordmarkProps {
  className?: string;
}

/**
 * "BUGGY RUGGY" wordmark that draws itself with a tufted/frayed fill
 * as the user scrolls into the footer.
 */
export function Wordmark({ className }: WordmarkProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (!svgRef.current) return;

      const paths = svgRef.current.querySelectorAll("path");
      if (paths.length === 0) return;

      gsap.fromTo(
        paths,
        { drawSVG: "0% 0%" },
        {
          drawSVG: "100% 100%",
          duration: 2,
          stagger: 0.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: svgRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.6,
          },
        },
      );
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={className} aria-label="Buggy Ruggy">
      <svg
        ref={svgRef}
        viewBox="0 0 800 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-40 w-full sm:h-48"
      >
        <defs>
          <linearGradient id="wm-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff2e7a" />
            <stop offset="40%" stopColor="#ff6b35" />
            <stop offset="70%" stopColor="#ffd60a" />
            <stop offset="100%" stopColor="#00b4d8" />
          </linearGradient>
          <pattern id="tuft-hatch" patternUnits="userSpaceOnUse" width="8" height="8">
            <path d="M0,4 L8,4 M4,0 L4,8" stroke="url(#wm-grad)" strokeWidth="0.8" opacity="0.4" />
          </pattern>
        </defs>
        {/* B */}
        <path
          d="M40,30 L40,150 M40,30 L85,30 C110,30 120,55 120,75 C120,95 110,105 85,105 L40,105 M40,105 L90,105 C115,105 125,130 125,150 L40,150"
          stroke="url(#wm-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* U */}
        <path
          d="M150,30 L150,130 C150,155 175,150 190,130"
          stroke="url(#wm-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* G1 */}
        <path
          d="M220,90 C220,40 280,30 300,60 C310,80 300,105 270,105 L300,105 C320,105 330,90 330,70"
          stroke="url(#wm-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* G2 */}
        <path
          d="M360,90 C360,40 420,30 440,60 C450,80 440,105 410,105 L440,105 C460,105 470,90 470,70"
          stroke="url(#wm-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Y */}
        <path
          d="M500,30 L530,90 L530,150 M530,90 L560,30"
          stroke="url(#wm-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* R */}
        <path
          d="M590,30 L590,150 M590,30 L635,30 C660,30 670,60 670,80 C670,100 660,110 635,110 L590,110 M620,110 L670,150"
          stroke="url(#wm-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* U */}
        <path
          d="M700,30 L700,130 C700,155 725,150 740,130"
          stroke="url(#wm-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* G */}
        <path
          d="M760,60 C760,30 800,40 800,70 C800,95 780,110 755,105 L780,105"
          stroke="url(#wm-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Fill pattern */}
        <rect x="0" y="0" width="800" height="180" fill="url(#tuft-hatch)" opacity="0" />
      </svg>
    </div>
  );
}
