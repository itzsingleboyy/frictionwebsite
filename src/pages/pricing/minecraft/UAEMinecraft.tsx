import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gamepad2, Cpu, HardDrive, Server, Shield, Clock, Database } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const plans = [
  {
    name: "Dirt Plan",
    cpu: "100%",
    ram: "2GB",
    storage: "6GB SSD",
    priceINR: 78,
  },
  {
    name: "Stone Plan",
    cpu: "150%",
    ram: "4GB",
    storage: "10GB SSD",
    priceINR: 150,
  },
  {
    name: "Iron Plan",
    cpu: "300%",
    ram: "8GB",
    storage: "15GB SSD",
    priceINR: 300,
  },
  {
    name: "Redstone Plan",
    cpu: "350%",
    ram: "15GB",
    storage: "20GB SSD",
    priceINR: 480,
  },
  {
    name: "Gold Plan",
    cpu: "500%",
    ram: "20GB",
    storage: "25GB SSD",
    priceINR: 631,
  },
  {
    name: "Emerald Plan",
    cpu: "600%",
    ram: "32GB",
    storage: "50GB SSD",
    priceINR: 950,
  },
];

const UAEMinecraft = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleSelectPlan = (plan: typeof plans[0]) => {
    addItem({
      name: `${plan.name} - UAE`,
      price: plan.priceINR,
      ram: plan.ram,
      cpu: plan.cpu,
      storage: plan.storage,
    });
  };

  return (
    <>
      <Helmet>
        <title>UAE Minecraft Hosting - AizyNodes</title>
        <meta name="description" content="Premium Minecraft server hosting in UAE with optimal connectivity for Middle East." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
            <FloatingParticles count={25} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                onClick={() => navigate("/pricing/minecraft")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Minecraft Hosting
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <Gamepad2 className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">UAE Location</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">UAE Minecraft Hosting</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Optimal Minecraft servers for Middle East region.
              </p>
            </motion.div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
                >
                  <h3 className="font-display text-2xl font-bold gradient-text mb-4">
                    {plan.name}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Cpu className="w-4 h-4 text-primary" />
                      <span>CPU: {plan.cpu}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Server className="w-4 h-4 text-primary" />
                      <span>RAM: {plan.ram}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <HardDrive className="w-4 h-4 text-primary" />
                      <span>Storage: {plan.storage}</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Price:</p>
                    <p className="text-xl font-bold text-foreground">
                      ₹{plan.priceINR} / month
                    </p>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => handleSelectPlan(plan)}
                  >
                    Select Plan
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Guarantees */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center gap-3">
                  <Clock className="w-8 h-8 text-primary" />
                  <p className="font-semibold text-foreground">99.9% Uptime Guarantee</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Shield className="w-8 h-8 text-primary" />
                  <p className="font-semibold text-foreground">Advanced DDoS Protection</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Database className="w-8 h-8 text-primary" />
                  <p className="font-semibold text-foreground">No Data Loss Guarantee</p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default UAEMinecraft;
