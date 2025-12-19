import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import RamCalculator from "@/components/RamCalculator";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import SupportSection from "@/components/SupportSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload images
    const images = [
      "/src/assets/minecraft-hero.jpg",
      "/src/assets/rust-hero.jpg",
      "/src/assets/palworld-hero.jpg",
      "/src/assets/gtav-hero.jpg",
      "/src/assets/terraria-hero.jpg",
    ];

    Promise.all(
      images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
  }, []);

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

      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <main className="min-h-screen bg-[#0c0229]">
          <Navbar />
          <HeroSection />
          <FeaturesSection />
          <RamCalculator />
          <TestimonialsSection />
          <FAQSection />
          <SupportSection />
          <Footer />
        </main>
      )}
    </>
  );
};

export default Index;
