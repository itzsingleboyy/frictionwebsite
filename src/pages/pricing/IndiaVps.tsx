import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Server, MapPin } from "lucide-react";

const IndiaVps = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>India VPS - AizyNodes</title>
        <meta name="description" content="Blazing fast VPS hosting in Mumbai, India with local support." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Background Effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
            <FloatingParticles count={25} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                onClick={() => navigate("/pricing")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Locations
              </Button>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <Server className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">India VPS</span>
              </div>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-6xl">🇮🇳</span>
                <h1 className="font-display text-5xl md:text-6xl font-bold">
                  <span className="gradient-text">India VPS</span>
                </h1>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </div>
              <p className="text-muted-foreground text-lg">
                Blazing fast servers optimized for Indian users with local support.
              </p>
            </motion.div>

            {/* Plans Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-12 text-center max-w-2xl mx-auto"
            >
              <Server className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Plans Coming Soon
              </h2>
              <p className="text-muted-foreground">
                We're preparing amazing VPS plans for this location. Check back soon!
              </p>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default IndiaVps;
