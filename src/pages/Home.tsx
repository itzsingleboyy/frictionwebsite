import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import TextReveal from "@/components/TextReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import ReviewsSection from "@/components/ReviewsSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const offerCode = "AIZYNODES25";

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
        className="min-h-screen bg-background"
      >
        <Navbar />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[150px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px]" />
              <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
              <FloatingParticles count={30} />
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
                      className="absolute inset-[-30px] rounded-full border-2 border-dashed border-primary/30"
                    />
                    <img 
                      src={logo} 
                      alt="FrictionHost Logo" 
                      className="w-32 h-32 rounded-3xl glow-primary" 
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
                  <TextReveal className="gradient-text" delay={0.5}>
                    FrictionHost
                  </TextReveal>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl md:text-2xl text-muted-foreground mb-8"
                >
                  Premium Game Server Hosting for Gamers
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-muted-foreground mb-12 max-w-2xl mx-auto"
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
                  <div className="inline-flex flex-col items-center gap-3 glass-strong rounded-2xl p-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      <span className="text-sm text-muted-foreground">Welcome Offer - 25% OFF</span>
                      <Sparkles className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex items-center gap-3">
                      <code className="text-2xl md:text-3xl font-mono font-bold gradient-text">
                        {offerCode}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="text-muted-foreground hover:text-foreground hover:bg-primary/20"
                      >
                        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                      </Button>
                    </div>
                    <span className="text-xs text-muted-foreground">Use at checkout for discount</span>
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
                    <Button variant="outline" size="lg" className="gap-2 text-lg px-8 border-border hover:border-primary/50">
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
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold gradient-text">
                      <AnimatedCounter value={99.9} suffix="%" />
                    </div>
                    <div className="text-muted-foreground text-sm mt-1">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold gradient-text">
                      <AnimatedCounter value={100} suffix="+" />
                    </div>
                    <div className="text-muted-foreground text-sm mt-1">Servers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold gradient-text">
                      24/7
                    </div>
                    <div className="text-muted-foreground text-sm mt-1">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold gradient-text">
                      ₹<AnimatedCounter value={45} />
                    </div>
                    <div className="text-muted-foreground text-sm mt-1">Starting Price</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <ReviewsSection />
        </main>

        <Footer />
      </motion.div>
    </>
  );
};

export default Home;
