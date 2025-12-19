import { motion } from "framer-motion";
import { Shield, Headphones, RefreshCw, Cpu, Star, Clock, Zap, HardDrive } from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "24/7 - 365 Support",
    description:
      "Help and support available day and night. Our friendly support team is always happy to help you.",
    color: "from-red-500 to-red-700",
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
    color: "from-orange-500 to-red-600",
    delay: 0.3,
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    description:
      "Enterprise-grade DDoS protection included with all plans to keep your server online 24/7.",
    color: "from-red-600 to-rose-700",
    delay: 0.4,
  },
  {
    icon: Clock,
    title: "Instant Activation",
    description:
      "Your server is automatically activated within minutes of payment. Start playing immediately.",
    color: "from-rose-500 to-red-600",
    delay: 0.5,
  },
];

const stats = [
  { icon: Zap, value: "99.9%", label: "Uptime" },
  { icon: HardDrive, value: "50+", label: "Games" },
  { icon: Headphones, value: "<5min", label: "Response" },
  { icon: Star, value: "4.7★", label: "Rating" },
];

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
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Effects */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[120px]" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-orange-500/5 blur-[100px]" />

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Bar */}
        <motion.div
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
                <stat.icon className="w-5 h-5 text-red-500" />
                <span className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </div>
              <span className="text-zinc-500 text-sm">{stat.label}</span>
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
            className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 px-4 py-2 rounded-full mb-6"
          >
            <Shield className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-300">Why Choose Us</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Why </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              FrictionHost
            </span>
            <span className="text-white">?</span>
          </h2>
          <p className="text-zinc-400 text-lg">
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
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className={`group relative bg-zinc-900/50 backdrop-blur-lg border border-zinc-800 p-6 rounded-2xl transition-all duration-500 hover:border-red-500/40 hover:shadow-[0_0_50px_rgba(220,38,38,0.15)] ${
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
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-300`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>

              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
