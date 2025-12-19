import { motion, useInView } from "framer-motion";
import { Shield, Headphones, RefreshCw, Cpu, Star, Clock, Zap, HardDrive } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { useRef, useState, useEffect } from "react";

const features = [
  {
    icon: Headphones,
    title: "24/7 - 365 Support",
    description:
      "Help and support available day and night. Our friendly support team is always happy to help you.",
    color: "from-primary to-accent",
    delay: 0,
  },
  {
    icon: RefreshCw,
    title: "Money Back Guarantee",
    description:
      "Full money-back guarantee if you're not satisfied with your game server. No questions asked.",
    color: "from-green-500 to-emerald-600",
    delay: 0.1,
    glow: true,
  },
  {
    icon: Star,
    title: "Rated Excellent",
    description:
      "Our customers rate us as 'Excellent' on both Trustpilot and Google reviews with 4.7+ stars.",
    color: "from-yellow-500 to-orange-500",
    delay: 0.2,
  },
  {
    icon: Cpu,
    title: "Powerful Hardware",
    description:
      "All servers run on high performance Ryzen CPUs at 4GHz+, paired with NVMe SSDs.",
    color: "from-accent to-primary",
    delay: 0.3,
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    description:
      "Enterprise-grade DDoS protection included with all plans to keep your server online 24/7.",
    color: "from-primary to-violet-600",
    delay: 0.4,
  },
  {
    icon: Clock,
    title: "Instant Activation",
    description:
      "Your server is automatically activated within minutes of payment. Start playing immediately.",
    color: "from-violet-500 to-primary",
    delay: 0.5,
  },
];

const stats = [
  { icon: Zap, value: 99.9, suffix: "%", label: "Uptime" },
  { icon: HardDrive, value: 50, suffix: "+", label: "Games" },
  { icon: Headphones, value: 5, prefix: "<", suffix: "min", label: "Response" },
  { icon: Star, value: 4.7, suffix: "★", label: "Rating", decimals: 1 },
];

// Counting animation component
const CountingNumber = ({ value, suffix = "", prefix = "", decimals = 0, isInView }: { 
  value: number; 
  suffix?: string; 
  prefix?: string; 
  decimals?: number;
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [isInView, value]);
  
  return (
    <span>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const FeaturesSection = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: false, amount: 0.5 });

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px]" />

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Bar */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <stat.icon className="w-5 h-5 text-primary" />
                <span className="text-3xl md:text-4xl font-display font-bold gradient-text">
                  <CountingNumber 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    prefix={stat.prefix || ""} 
                    decimals={stat.decimals || 0}
                    isInView={isInView}
                  />
                </span>
              </div>
              <span className="text-muted-foreground text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Why Choose Us</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">Why </span>
            <span className="gradient-text">
              FrictionHost
            </span>
            <span className="text-foreground">?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience unparalleled performance, reliability, and support.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <TiltCard intensity={8}>
                <div
                  className={`group relative glass p-6 rounded-2xl transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_50px_hsl(var(--primary)/0.15)] h-full ${
                    feature.glow ? "overflow-hidden" : ""
                  }`}
                >
                  {/* Glow effect for money back */}
                  {feature.glow && (
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-green-500/30 blur-3xl"
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
