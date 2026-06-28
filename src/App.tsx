import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AnimatedGallery } from "@/components/sections/AnimatedGallery";
import { CustomDesign } from "@/components/sections/CustomDesign";
import { Workshops } from "@/components/sections/Workshops";
import { Contact } from "@/components/sections/Contact";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { InstagramFloatingButton } from "@/components/ui/InstagramFloatingButton";
import { SvgFilters } from "@/components/ui/SvgFilters";

function App() {
  return (
    <>
      <SvgFilters />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <AnimatedGallery />
        <CustomDesign />
        <Workshops />
        <Contact />
      </main>
      <Footer />
      <InstagramFloatingButton />
    </>
  );
}

export default App;
