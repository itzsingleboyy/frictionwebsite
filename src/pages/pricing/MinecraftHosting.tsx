import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gamepad2, MapPin } from "lucide-react";

const locations = [
  {
    name: "Singapore",
    code: "SG",
    description: "Low latency for Southeast Asia",
    route: "/pricing/minecraft/singapore"
  },
  {
    name: "UAE",
    code: "UAE",
    description: "Optimal for Middle East region",
    route: "/pricing/minecraft/uae"
  },
  {
    name: "India",
    code: "IN",
    description: "Best connectivity for South Asia",
    route: "/pricing/minecraft/india"
  }
];

const MinecraftHosting = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Minecraft Hosting - AizyNodes</title>
        <meta name="description" content="Premium Minecraft server hosting with instant setup, DDoS protection, and 24/7 support." />
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
                Back to Plans
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
                <Gamepad2 className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">Minecraft Hosting</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Minecraft Hosting</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Choose your preferred server location for the best gaming experience.
              </p>
            </motion.div>

            {/* Location Categories */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {locations.map((location, index) => (
                <motion.div
                  key={location.code}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(location.route)}
                  className="glass rounded-2xl p-8 cursor-pointer group hover:scale-105 transition-all duration-300"
                  style={{
                    boxShadow: "0 0 0 rgba(139, 92, 246, 0)"
                  }}
                  whileHover={{
                    boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)"
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2">
                      <span className="gradient-text">{location.name}</span>
                    </h3>
                    <p className="text-sm text-primary font-medium mb-2">{location.code} Location</p>
                    <p className="text-muted-foreground text-sm">{location.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MinecraftHosting;