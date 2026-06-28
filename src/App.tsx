import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ThreeGallery } from "@/components/sections/ThreeGallery";
import { CustomDesign } from "@/components/sections/CustomDesign";
import { Workshops } from "@/components/sections/Workshops";
import { Contact } from "@/components/sections/Contact";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { InstagramFloatingButton } from "@/components/ui/InstagramFloatingButton";
import { SvgFilters } from "@/components/ui/SvgFilters";
import { YarnThread } from "@/components/ui/YarnThread";
import { useScrollSmoother } from "@/hooks/useScrollSmoother";

function App() {
  // GSAP ScrollSmoother — inertia + parallax scroll (foundation for the
  // ScrollTrigger / DrawSVG / MotionPath effects). Fixed UI stays outside the
  // smoothed content so position:fixed keeps working.
  useScrollSmoother();

  return (
    <>
      <SvgFilters />
      <CursorGlow />
      <Navbar />
      <InstagramFloatingButton />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <YarnThread className="z-0" />
          <main>
            <Hero />
            <ThreeGallery />
            <CustomDesign />
            <Workshops />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
