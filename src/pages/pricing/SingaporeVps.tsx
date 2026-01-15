import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Server, MapPin, Cpu, HardDrive, Shield, Clock, Database, Check, Zap, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const plans = [
  {
    name: "Basic",
    tier: "Basic VPS",
    cpu: "2 Cores",
    ram: "8GB",
    storage: "50GB Disk",
    priceUSD: 7.50,
    popular: false,
    features: ["Root Access", "DDoS Protection", "99.9% Uptime", "24/7 Support"],
  },
  {
    name: "Sudo",
    tier: "Sudo VPS",
    cpu: "4 Cores",
    ram: "12GB",
    storage: "80GB Disk",
    priceUSD: 8.50,
    popular: false,
    features: ["Root Access", "DDoS Protection", "99.9% Uptime", "24/7 Support", "Daily Backups"],
  },
  {
    name: "Nano",
    tier: "Nano VPS",
    cpu: "6 Cores",
    ram: "16GB",
    storage: "100GB Disk",
    priceUSD: 9.50,
    popular: true,
    features: ["Root Access", "DDoS Protection", "99.9% Uptime", "24/7 Support", "Daily Backups", "Priority Support"],
  },
  {
    name: "Power",
    tier: "Power VPS",
    cpu: "8 Cores",
    ram: "20GB",
    storage: "150GB Disk",
    priceUSD: 11.50,
    popular: false,
    features: ["Root Access", "DDoS Protection", "99.9% Uptime", "24/7 Support", "Daily Backups", "Priority Support"],
  },
  {
    name: "Extreme",
    tier: "Extreme VPS",
    cpu: "10 Cores",
    ram: "30GB",
    storage: "200GB Disk",
    priceUSD: 12.00,
    popular: true,
    features: ["Root Access", "DDoS Protection", "99.9% Uptime", "24/7 Support", "Hourly Backups", "Priority Support", "Dedicated IP"],
  },
  {
    name: "Supreme",
    tier: "Supreme VPS",
    cpu: "12 Cores",
    ram: "40GB",
    storage: "250GB Disk",
    priceUSD: 14.00,
    popular: false,
    features: ["Root Access", "DDoS Protection", "99.9% Uptime", "24/7 Support", "Hourly Backups", "Priority Support", "Dedicated IP"],
  },
  {
    name: "Ultra",
    tier: "Ultra VPS",
    cpu: "14 Cores",
    ram: "64GB",
    storage: "350GB Disk",
    priceUSD: 17.00,
    popular: false,
    features: ["Root Access", "DDoS Protection", "99.9% Uptime", "24/7 Support", "Hourly Backups", "Priority Support", "Dedicated IP", "Custom Configuration"],
  },
];

const SingaporeVps = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleSelectPlan = (plan: typeof plans[0]) => {
    addItem({
      name: `${plan.name} VPS - Singapore`,
      price: plan.priceUSD,
      ram: plan.ram,
      cpu: plan.cpu,
      storage: plan.storage,
    });
  };

  return (
    <>
      <Helmet>
        <title>Singapore VPS - AizyNodes</title>
        <meta name="description" content="Premium VPS hosting in Singapore with low latency for Southeast Asian users." />
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
                onClick={() => navigate("/pricing")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Locations
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <Server className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">Singapore VPS</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Singapore VPS Hosting</span>
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                <span>Singapore</span>
              </div>
              <p className="text-muted-foreground text-lg mb-4">
                Low latency servers for Southeast Asian users with premium bandwidth.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="flex items-center gap-2 text-primary">
                  <Zap className="w-4 h-4" /> Instant Setup
                </span>
                <span className="flex items-center gap-2 text-primary">
                  <Shield className="w-4 h-4" /> DDoS Protected
                </span>
                <span className="flex items-center gap-2 text-primary">
                  <Server className="w-4 h-4" /> Full Root Access
                </span>
              </div>
            </motion.div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative rounded-2xl p-[1px] transition-all duration-500 ${
                    plan.popular 
                      ? "bg-gradient-to-b from-primary via-accent to-primary" 
                      : "bg-gradient-to-b from-white/20 to-white/5"
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-primary/30">
                        <Star className="w-3 h-3 fill-current" /> POPULAR
                      </span>
                    </div>
                  )}

                  <div className={`h-full rounded-2xl p-5 bg-background ${
                    plan.popular ? "bg-gradient-to-b from-primary/10 to-background" : ""
                  }`}>
                    {/* Tier Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        plan.popular 
                          ? "bg-primary/20 text-primary" 
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        {plan.tier}
                      </span>
                    </div>

                    {/* Plan Name & RAM */}
                    <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                      {plan.name} VPS
                    </h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold gradient-text">{plan.ram}</span>
                      <span className="text-muted-foreground text-sm">RAM</span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-foreground">${plan.priceUSD.toFixed(2)}</span>
                        <span className="text-muted-foreground text-sm">/month</span>
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="space-y-2 mb-4 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Cpu className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-foreground">{plan.cpu}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                          <HardDrive className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-foreground">{plan.storage}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {plan.features.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                      {plan.features.length > 4 && (
                        <p className="text-xs text-primary">+{plan.features.length - 4} more features</p>
                      )}
                    </div>

                    {/* Button */}
                    <Button 
                      variant={plan.popular ? "hero" : "outline"}
                      className="w-full"
                      size="sm"
                      onClick={() => handleSelectPlan(plan)}
                    >
                      Select Plan
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Guarantees */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-center text-xl font-bold text-foreground mb-8">Our Promise to You</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">99.9% Uptime</p>
                  <p className="text-sm text-muted-foreground">Guaranteed server availability</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">DDoS Protection</p>
                  <p className="text-sm text-muted-foreground">Advanced attack mitigation</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Database className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">No Data Loss</p>
                  <p className="text-sm text-muted-foreground">Automatic backups included</p>
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

export default SingaporeVps;
