import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Cpu, Shield, Zap, HardDrive, Clock, Users, 
  Globe, Headphones, Server, Gauge, Lock, RefreshCw 
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AMD Ryzen CPUs",
    description: "Latest generation Ryzen processors for maximum single-thread performance.",
  },
  {
    icon: HardDrive,
    title: "NVMe Storage",
    description: "Ultra-fast NVMe SSDs for instant world loading and zero lag.",
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    description: "Enterprise-grade protection against all types of attacks.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Your server is ready within seconds of purchase.",
  },
  {
    icon: Clock,
    title: "99.9% Uptime",
    description: "Industry-leading reliability with redundant infrastructure.",
  },
  {
    icon: Users,
    title: "Unlimited Slots",
    description: "No artificial player limits on any of our game servers.",
  },
  {
    icon: Globe,
    title: "Global Locations",
    description: "Multiple datacenter locations for low latency worldwide.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert support team available around the clock.",
  },
  {
    icon: Server,
    title: "Full FTP Access",
    description: "Complete control over your server files and configurations.",
  },
  {
    icon: Gauge,
    title: "Custom Control Panel",
    description: "Easy-to-use panel for managing your game server.",
  },
  {
    icon: Lock,
    title: "Auto Backups",
    description: "Daily automatic backups to protect your data.",
  },
  {
    icon: RefreshCw,
    title: "One-Click Mods",
    description: "Install popular mods and plugins with a single click.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

const Features = () => {
  return (
    <>
      <Helmet>
        <title>Features - FrictionHost</title>
        <meta name="description" content="Discover our premium features: AMD Ryzen CPUs, NVMe storage, DDoS protection, and more." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Background Effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                <span className="text-foreground">Powerful </span>
                <span className="gradient-text">
                  Features
                </span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Everything you need for the ultimate gaming experience. Enterprise-grade infrastructure at affordable prices.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group glass hover:border-primary/50 rounded-2xl p-6 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Features;
