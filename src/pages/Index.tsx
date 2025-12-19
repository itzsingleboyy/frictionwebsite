import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GamesSection from "@/components/GamesSection";
import FeaturesSection from "@/components/FeaturesSection";
import RamCalculator from "@/components/RamCalculator";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import SupportSection from "@/components/SupportSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LordCloud - Premium Game Server Hosting | Minecraft, Rust, Palworld & More</title>
        <meta
          name="description"
          content="Premium game server hosting starting at ₹45/month. Host Minecraft, Rust, Palworld, GTA V servers with powerful hardware, DDoS protection, and 24/7 support."
        />
        <meta
          name="keywords"
          content="game server hosting, minecraft server, rust server, palworld hosting, gta v server, fivem hosting, india game hosting"
        />
        <meta property="og:title" content="LordCloud - Premium Game Server Hosting" />
        <meta
          property="og:description"
          content="Host your favorite games on high-performance servers with unlimited slots, NVMe storage, and 24/7 support."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://lordcloud.in" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <GamesSection />
        <FeaturesSection />
        <RamCalculator />
        <TestimonialsSection />
        <FAQSection />
        <SupportSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
