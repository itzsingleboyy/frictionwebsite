import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { Server, MapPin, ArrowRight, Gamepad2 } from "lucide-react";

const vpsCategories = [
  {
    name: "Singapore VPS",
    location: "Singapore",
    description: "Low latency servers for Southeast Asian users with premium bandwidth.",
    route: "/pricing/singapore-vps",
  },
  {
    name: "Dubai VPS",
    location: "Dubai, UAE",
    description: "High-performance servers in the Middle East with excellent connectivity.",
    route: "/pricing/dubai-vps",
  },
  {
    name: "Japan VPS",
    location: "Tokyo, Japan",
    description: "Ultra-fast servers with low ping for Asian gaming communities.",
    route: "/pricing/japan-vps",
  },
  {
    name: "India VPS",
    location: "Mumbai, India",
    description: "Blazing fast servers optimized for Indian users with local support.",
    route: "/pricing/india-vps",
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Pricing - AizyNodes</title>
        <meta name="description" content="Minecraft server hosting and VPS hosting in Singapore, Dubai, Japan, and India." />
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
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <Server className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">Hosting Plans</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                <span className="text-foreground">Choose Your </span>
                <span className="gradient-text">Plan</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Premium game hosting and VPS solutions for the best performance.
              </p>
            </motion.div>

            {/* Minecraft Hosting Category */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <h2 className="font-display text-2xl font-bold gradient-text mb-6">Game Hosting</h2>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => navigate("/pricing/minecraft")}
                className="relative glass rounded-2xl p-8 cursor-pointer hover:border-primary/50 transition-all duration-300 group overflow-hidden"
                style={{
                  boxShadow: "0 0 0 transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 transparent";
                }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Gamepad2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold gradient-text">
                        Minecraft Hosting
                      </h3>
                      <p className="text-primary/80 text-sm">
                        Premium game servers
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    High-performance Minecraft servers with instant setup, DDoS protection, and 24/7 support. Starting at ₹160/month.
                  </p>

                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                    View Plans
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* VPS Categories Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="font-display text-2xl font-bold gradient-text mb-6">VPS Hosting</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {vpsCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onClick={() => navigate(category.route)}
                    className="relative glass rounded-2xl p-8 cursor-pointer hover:border-primary/50 transition-all duration-300 group overflow-hidden"
                    style={{
                      boxShadow: "0 0 0 transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 0 0 transparent";
                    }}
                  >
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      {/* Name and Location */}
                      <div className="mb-4">
                        <h3 className="font-display text-2xl font-bold gradient-text">
                          {category.name}
                        </h3>
                        <div className="flex items-center gap-1 text-primary/70 text-sm mt-1">
                          <MapPin className="w-3 h-3" />
                          {category.location}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6">
                        {category.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                        View Plans
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-16 text-center"
            >
              <p className="text-muted-foreground">
                All plans include DDoS protection, 24/7 support, and 99.9% uptime guarantee.
              </p>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Pricing;