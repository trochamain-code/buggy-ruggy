import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

interface YarnToyProps {
  className?: string;
}

export function YarnToy({ className }: YarnToyProps) {
  const toyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (!toyRef.current) return;

      Draggable.create(toyRef.current, {
        type: "x,y",
        inertia: true,
        bounds: window,
        edgeResistance: 0.65,
        dragResistance: 0.4,
        throwResistance: 1000,
        onDragStart() {
          gsap.to(toyRef.current, { scale: 1.2, duration: 0.3 });
        },
        onDragEnd() {
          gsap.to(toyRef.current, { scale: 1, duration: 0.5, ease: "elastic.out(1,0.3)" });
        },
      });
    }, toyRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={toyRef}
      className={`fixed left-8 top-1/3 z-30 hidden cursor-grab select-none lg:block active:cursor-grabbing ${className ?? ""}`}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-400">
          arrastra
        </span>
        <div className="relative h-20 w-20 animate-float">
          {/* Yarn ball */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-candy-pink via-coral to-sun shadow-lg" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-coral via-sun to-lime opacity-70" />
          <div className="absolute inset-4 rounded-full bg-sun opacity-50" />
          {/* Eyes */}
          <div className="absolute left-[30%] top-[35%] h-2.5 w-2.5 rounded-full bg-neutral-900" />
          <div className="absolute right-[30%] top-[35%] h-2.5 w-2.5 rounded-full bg-neutral-900" />
          {/* Smile */}
          <div className="absolute bottom-[25%] left-1/2 h-1.5 w-5 -translate-x-1/2 rounded-full bg-neutral-900" />
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300">
          lánzame
        </span>
      </div>
    </div>
  );
}
