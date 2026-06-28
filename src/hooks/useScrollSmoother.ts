import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/**
 * Initialises GSAP ScrollSmoother (inertia/parallax scroll) around the app.
 * Expects markup: #smooth-wrapper > #smooth-content wrapping all scrollable content.
 *
 * - Disables smoothing when the user prefers reduced motion.
 * - Routes in-page anchor links (#galeria, …) through smoother.scrollTo so they
 *   glide instead of jumping (native anchor jumps fight the transformed content).
 * - Cleans up fully (StrictMode double-mount safe).
 */
export function useScrollSmoother() {
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Avoid duplicate instances (e.g. React StrictMode re-mount).
      ScrollSmoother.get()?.kill();
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: reduce ? 0 : 1.2,
        effects: !reduce, // enables data-speed / data-lag parallax
        normalizeScroll: true,
        ignoreMobileResize: true,
      });
    });

    // Smooth in-page anchor navigation through the smoother.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const smoother = ScrollSmoother.get();
      if (!smoother) return;
      if (href.length < 2) {
        e.preventDefault();
        smoother.scrollTo(0, true);
        return;
      }
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        smoother.scrollTo(el, true, "top 88px");
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      ctx.revert();
      ScrollSmoother.get()?.kill();
    };
  }, []);
}
