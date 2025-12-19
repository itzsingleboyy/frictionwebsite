import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MinecraftBlock from "@/components/MinecraftBlock";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const offerCode = "FRICTION20";

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(offerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <Helmet>
        <title>FrictionHost - Premium Game Server Hosting</title>
        <meta
          name="description"
          content="Premium game server hosting starting at ₹45/month. Host Minecraft, Rust, Palworld, GTA V servers with powerful hardware and 24/7 support."
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-[#0a0a0a]"
      >
        <Navbar />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-red-600/20 blur-[150px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[120px]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* 3D Minecraft Floating Blocks */}
            <div className="absolute inset-0" style={{ perspective: "1000px" }}>
              {/* Grass Block */}
              <MinecraftBlock
                topColor="#5d8c3e"
                sideColor="#8b5a2b"
                frontColor="linear-gradient(to bottom, #5d8c3e 0%, #5d8c3e 30%, #8b5a2b 30%)"
                size={56}
                className="top-[15%] left-[10%]"
                animate={{ y: [-20, 20, -20], rotateY: [0, 360], rotateX: [-15, 15, -15] }}
                duration={12}
                glowColor="rgba(93, 140, 62, 0.5)"
              />
              
              {/* Diamond Block */}
              <MinecraftBlock
                topColor="#4aedd9"
                sideColor="#1a9988"
                frontColor="#2dd4bf"
                size={48}
                className="top-[20%] right-[15%]"
                animate={{ y: [20, -20, 20], rotateY: [360, 0], rotateX: [10, -10, 10] }}
                duration={10}
                glowColor="rgba(74, 237, 217, 0.6)"
              />
              
              {/* TNT Block */}
              <MinecraftBlock
                topColor="#7f1d1d"
                sideColor="#991b1b"
                frontColor="#dc2626"
                size={60}
                className="bottom-[25%] left-[8%]"
                animate={{ y: [-15, 25, -15], rotateY: [0, -360], scale: [1, 1.05, 1] }}
                duration={8}
                glowColor="rgba(220, 38, 38, 0.6)"
              >
                <span className="text-white font-bold text-xs" style={{ fontFamily: 'monospace' }}>TNT</span>
              </MinecraftBlock>
              
              {/* Creeper Block */}
              <MinecraftBlock
                topColor="#22c55e"
                sideColor="#15803d"
                frontColor="#4ade80"
                size={52}
                className="bottom-[30%] right-[10%]"
                animate={{ y: [15, -25, 15], rotateY: [0, 360], rotateX: [5, -5, 5] }}
                duration={14}
                glowColor="rgba(74, 222, 128, 0.5)"
              >
                {/* Creeper Face */}
                <div className="relative w-full h-full">
                  <div className="absolute top-2 left-2 w-3 h-3 bg-black" />
                  <div className="absolute top-2 right-2 w-3 h-3 bg-black" />
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2 h-4 bg-black" />
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-6 h-2 bg-black" />
                </div>
              </MinecraftBlock>
              
              {/* Gold Block */}
              <MinecraftBlock
                topColor="#fbbf24"
                sideColor="#d97706"
                frontColor="#f59e0b"
                size={44}
                className="top-[40%] left-[5%]"
                animate={{ y: [-10, 30, -10], rotateY: [360, 0], rotateX: [-10, 10, -10] }}
                duration={9}
                glowColor="rgba(251, 191, 36, 0.6)"
              />
              
              {/* Dirt Block */}
              <MinecraftBlock
                topColor="#92400e"
                sideColor="#78350f"
                frontColor="#8b5a2b"
                size={46}
                className="top-[60%] right-[8%]"
                animate={{ y: [25, -15, 25], x: [5, -5, 5], rotateY: [0, 360] }}
                duration={11}
                glowColor="rgba(139, 90, 43, 0.5)"
              />
              
              {/* Redstone Block */}
              <MinecraftBlock
                topColor="#ef4444"
                sideColor="#991b1b"
                frontColor="#dc2626"
                size={40}
                className="top-[70%] left-[15%]"
                animate={{ y: [-20, 15, -20], rotateY: [0, -360], scale: [1, 1.1, 1] }}
                duration={7}
                glowColor="rgba(239, 68, 68, 0.7)"
              />
              
              {/* Emerald Block */}
              <MinecraftBlock
                topColor="#22c55e"
                sideColor="#166534"
                frontColor="#16a34a"
                size={36}
                className="top-[25%] left-[25%]"
                animate={{ y: [10, -20, 10], rotateY: [360, 0], rotateX: [15, -15, 15] }}
                duration={10}
                glowColor="rgba(34, 197, 94, 0.6)"
              />
              
              {/* Lapis Block */}
              <MinecraftBlock
                topColor="#3b82f6"
                sideColor="#1e40af"
                frontColor="#2563eb"
                size={42}
                className="bottom-[40%] right-[20%]"
                animate={{ y: [-25, 10, -25], x: [-8, 8, -8], rotateY: [0, 360] }}
                duration={13}
                glowColor="rgba(59, 130, 246, 0.6)"
              />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                {/* Logo Animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                  className="mb-8 inline-block"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-30px] rounded-full border-2 border-dashed border-red-500/30"
                    />
                    <img 
                      src={logo} 
                      alt="FrictionHost Logo" 
                      className="w-32 h-32 rounded-3xl shadow-[0_0_100px_rgba(220,38,38,0.5)]" 
                    />
                  </div>
                </motion.div>

                {/* Company Name */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-display text-6xl md:text-8xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-red-500 via-orange-400 to-red-500 bg-clip-text text-transparent">
                    FrictionHost
                  </span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl md:text-2xl text-zinc-400 mb-8"
                >
                  Premium Game Server Hosting for Gamers
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-zinc-500 mb-12 max-w-2xl mx-auto"
                >
                  Experience lag-free gaming with our high-performance servers. 
                  Powered by Ryzen CPUs, NVMe storage, and enterprise-grade DDoS protection.
                </motion.p>

                {/* Offer Code */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mb-12"
                >
                  <div className="inline-flex flex-col items-center gap-3 bg-gradient-to-r from-red-600/20 to-orange-500/20 backdrop-blur-lg border border-red-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-orange-400" />
                      <span className="text-sm text-zinc-300">Welcome Offer - 20% OFF</span>
                      <Sparkles className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="flex items-center gap-3">
                      <code className="text-2xl md:text-3xl font-mono font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                        {offerCode}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="text-zinc-400 hover:text-white hover:bg-red-600/20"
                      >
                        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                      </Button>
                    </div>
                    <span className="text-xs text-zinc-500">Use at checkout for discount</span>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link to="/pricing">
                    <Button variant="hero" size="lg" className="gap-2 text-lg px-8">
                      Get Started <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button variant="outline" size="lg" className="gap-2 text-lg px-8 border-zinc-700 hover:border-red-500/50">
                      View Plans
                    </Button>
                  </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                  {[
                    { value: "99.9%", label: "Uptime" },
                    { value: "100+", label: "Servers" },
                    { value: "24/7", label: "Support" },
                    { value: "₹45", label: "Starting Price" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-zinc-500 text-sm mt-1">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </motion.div>
    </>
  );
};

export default Home;
