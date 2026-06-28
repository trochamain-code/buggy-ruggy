import { useRef, useLayoutEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

interface ScrambleTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  scrambleChars?: string;
  revealDelay?: number;
  duration?: number;
  scrollTrigger?: boolean;
}

export function ScrambleText({
  children,
  as: Tag = "span",
  className,
  scrambleChars = "!<>-_\\/[]{}�?=+*^?#________",
  revealDelay = 0.3,
  duration = 0.8,
  scrollTrigger = true,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const anim = gsap.fromTo(
        el,
        { scrambleText: { text: "{original}", chars: scrambleChars, revealDelay: 0, speed: 0.3 } },
        {
          scrambleText: { text: "{original}", chars: scrambleChars, revealDelay, speed: 0.6 },
          duration,
          ease: "none",
        },
      );

      if (scrollTrigger) {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          animation: anim,
          scroller: "#smooth-wrapper",
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [scrambleChars, revealDelay, duration, scrollTrigger]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
