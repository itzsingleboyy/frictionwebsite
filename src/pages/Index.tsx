import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GamesCategory from "@/components/GamesCategory";
import FeaturesSection from "@/components/FeaturesSection";
import TeamSection from "@/components/TeamSection";
import RamCalculator from "@/components/RamCalculator";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import SupportSection from "@/components/SupportSection";
import Footer from "@/components/Footer";

const Index = () => {
  const mountTime = useRef(Date.now());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state on mount (handles browser refresh)
    setIsLoading(true);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>FrictionHost - Premium Game Server Hosting | Minecraft, Rust, Palworld & More</title>
        <meta
          name="description"
          content="Premium game server hosting starting at ₹45/month. Host Minecraft, Rust, Palworld, GTA V servers with powerful hardware, DDoS protection, and 24/7 support."
        />
        <meta
          name="keywords"
          content="game server hosting, minecraft server, rust server, palworld hosting, gta v server, fivem hosting, india game hosting, frictionhost"
        />
        <meta property="og:title" content="FrictionHost - Premium Game Server Hosting" />
        <meta
          property="og:description"
          content="Host your favorite games on high-performance servers with unlimited slots, NVMe storage, and 24/7 support."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://frictionhost.com" />
      </Helmet>

      {isLoading && (
        <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
      )}
      
      {!isLoading && (
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-[#0a0a0a]"
        >
          <Navbar />
          <HeroSection />
          <GamesCategory />
          <FeaturesSection />
          <TeamSection />
          <RamCalculator />
          <TestimonialsSection />
          <FAQSection />
          <SupportSection />
          <Footer />
        </motion.main>
      )}
    </>
  );
};

export default Index;
