import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { GoldDivider } from "./components/ui/GoldDivider";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { MembersSection } from "./components/sections/MembersSection";
import { JoinSection } from "./components/sections/JoinSection";

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      <GoldDivider />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <MembersSection />
      <JoinSection />
      <Footer />
      <GoldDivider />
    </div>
  );
}

export default App;
