import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
                    { value: "1000+", label: "Servers" },
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
