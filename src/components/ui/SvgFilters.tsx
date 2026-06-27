/**
 * Global, hidden SVG filter definitions rendered once at the app root so they
 * can be referenced by id from anywhere (avoids duplicate-id collisions when
 * the logo appears in several places).
 */
export function SvgFilters() {
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
      <defs>
        {/* Intense tuft ripple — used by the header/footer logo on hover. */}
        <filter
          id="tuft-fuzz"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.03"
            numOctaves="2"
            seed="7"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="0.9s"
              values="0.018 0.03; 0.05 0.065; 0.025 0.02; 0.018 0.03"
              repeatCount="indefinite"
            />
            <animate
              attributeName="seed"
              dur="3s"
              values="7; 44; 7"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="9"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Breeze — slow, large-scale flowing ripple, like wind over long grass. */}
        <filter
          id="tuft-breeze"
          x="-18%"
          y="-18%"
          width="136%"
          height="136%"
          colorInterpolationFilters="sRGB"
        >
          {/* No seed animation (it pops). Just a very slow, tiny frequency
              drift so the tuft texture stays alive without crawling. */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.013"
            numOctaves="2"
            seed="5"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="9s"
              values="0.01 0.013; 0.012 0.011; 0.01 0.013"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Tufted edge — dense fine noise that frays a shape's outline into a
            fuzzy yarn-pile border. Used for the hero headline underline. */}
        <filter
          id="tuft-bar"
          x="-12%"
          y="-60%"
          width="124%"
          height="220%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9 1.05"
            numOctaves="2"
            seed="8"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Gentle tuft breathing — soft, slow ripple for the hero logo. */}
        <filter
          id="tuft-soft"
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves="2"
            seed="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="4s"
              values="0.012 0.018; 0.02 0.024; 0.012 0.018"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
