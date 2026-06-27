import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Gallery } from "@/components/sections/Gallery";
import { CustomDesign } from "@/components/sections/CustomDesign";
import { Workshops } from "@/components/sections/Workshops";
import { Contact } from "@/components/sections/Contact";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Marquee } from "@/components/ui/Marquee";
import { SvgFilters } from "@/components/ui/SvgFilters";

function App() {
  return (
    <>
      <SvgFilters />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Gallery />
        <CustomDesign />
        <Workshops />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
