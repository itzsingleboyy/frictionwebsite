import { motion } from "framer-motion";
import { Shield, Headphones, RefreshCw, Cpu, Star, Clock } from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "24/7 - 365 Support",
    description:
      "Help and support available day and night. Our friendly support team is always happy to help you, whatever the question.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: RefreshCw,
    title: "Money Back Guarantee",
    description:
      "Full money-back guarantee if you're not satisfied with your game server. No questions asked.",
    color: "from-green-500 to-emerald-500",
    glow: true,
  },
  {
    icon: Star,
    title: "Rated Excellent",
    description:
      "Our customers rate us as 'Excellent' on both Trustpilot and Google reviews with 4.7+ stars.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Cpu,
    title: "Powerful Hardware",
    description:
      "All servers run on high performance Ryzen CPUs at 4GHz+, paired with NVMe SSDs for lightning speed.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    description:
      "Enterprise-grade DDoS protection included with all plans to keep your server online 24/7.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Instant Activation",
    description:
      "Your server is automatically activated within minutes of payment. Start playing immediately.",
    color: "from-violet-500 to-purple-500",
  },
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#0c0229]">
      {/* Background Effects */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Why Choose Us</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Why </span>
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              LordCloud
            </span>
            <span className="text-white">?</span>
          </h2>
          <p className="text-purple-200/70 text-lg">
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
              whileHover={{ scale: 1.02, y: -5 }}
              className={`group relative bg-purple-900/20 backdrop-blur-lg border border-purple-500/20 p-6 rounded-2xl transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] ${
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

              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-purple-200/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
