import { useRef, useLayoutEffect, type ReactNode } from "react";
import gsap from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(GSAPSplitText, ScrollTrigger);

interface SplitTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  type?: "chars" | "words" | "lines";
  stagger?: number;
  duration?: number;
  from?: gsap.TweenVars;
  scrollTrigger?: boolean;
  scrub?: boolean;
}

export function SplitText({
  children,
  as: Tag = "h2",
  className,
  type = "chars",
  stagger = 0.02,
  duration = 0.5,
  from = { opacity: 0, y: 30, rotateX: -90 },
  scrollTrigger: useScrollTrigger = true,
  scrub = false,
}: SplitTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const split = new GSAPSplitText(el, {
        type: type === "chars" ? "chars" : type === "words" ? "words" : "lines",
        charsClass: "split-char inline-block",
        wordsClass: "split-word inline-block",
        linesClass: "split-line block",
      });

      const targets =
        type === "chars"
          ? split.chars
          : type === "words"
            ? split.words
            : split.lines;

      if (!targets || targets.length === 0) return;

      gsap.set(targets, from);

      const anim = gsap.to(targets, {
        ...from,
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotate: 0,
        scale: 1,
        duration,
        stagger,
        ease: "back.out(1.4)",
      });

      if (useScrollTrigger) {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          end: "bottom 20%",
          animation: anim,
          scrub: scrub ? 0.5 : false,
          scroller: "#smooth-wrapper",
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [type, stagger, duration, useScrollTrigger, scrub, from]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
