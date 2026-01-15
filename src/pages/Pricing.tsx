import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { Server, MapPin, ArrowRight } from "lucide-react";

const vpsCategories = [
  {
    name: "Singapore VPS",
    location: "Singapore",
    flag: "🇸🇬",
    description: "Low latency servers for Southeast Asian users with premium bandwidth.",
    route: "/pricing/singapore-vps",
    color: "from-red-500/20 to-primary/20",
  },
  {
    name: "Dubai VPS",
    location: "Dubai, UAE",
    flag: "🇦🇪",
    description: "High-performance servers in the Middle East with excellent connectivity.",
    route: "/pricing/dubai-vps",
    color: "from-amber-500/20 to-primary/20",
  },
  {
    name: "Japan VPS",
    location: "Tokyo, Japan",
    flag: "🇯🇵",
    description: "Ultra-fast servers with low ping for Asian gaming communities.",
    route: "/pricing/japan-vps",
    color: "from-pink-500/20 to-primary/20",
  },
  {
    name: "India VPS",
    location: "Mumbai, India",
    flag: "🇮🇳",
    description: "Blazing fast servers optimized for Indian users with local support.",
    route: "/pricing/india-vps",
    color: "from-orange-500/20 to-primary/20",
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Pricing - AizyNodes</title>
        <meta name="description" content="Choose your VPS location. Premium hosting in Singapore, Dubai, Japan, and India." />
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
                <span className="text-sm text-primary">VPS Hosting</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                <span className="text-foreground">Choose Your </span>
                <span className="gradient-text">Location</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Select a VPS location closest to your users for the best performance.
              </p>
            </motion.div>

            {/* VPS Categories Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {vpsCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => navigate(category.route)}
                  className="relative glass rounded-2xl p-8 cursor-pointer hover:border-primary/50 transition-all duration-300 group overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Flag and Location */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl">{category.flag}</span>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-foreground">
                          {category.name}
                        </h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <MapPin className="w-3 h-3" />
                          {category.location}
                        </div>
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

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 text-center"
            >
              <p className="text-muted-foreground">
                All locations include DDoS protection, 24/7 support, and 99.9% uptime guarantee.
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
