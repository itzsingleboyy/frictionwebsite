import { motion } from "framer-motion";
import { Users, Crown, Briefcase, Target, Twitter, MessageCircle } from "lucide-react";
import jaythAvatar from "@/assets/jayth-avatar.png";
import paxboltAvatar from "@/assets/paxbolt-avatar.png";
import singleAvatar from "@/assets/single-avatar.png";

const teamMembers = [
  {
    name: "Jayth",
    role: "Founder",
    description: "Visionary leader who started FrictionHost with a dream to provide the best gaming experience.",
    icon: Crown,
    color: "from-yellow-500 to-orange-500",
    socials: { twitter: "#", discord: "#" },
    avatar: jaythAvatar,
  },
  {
    name: "Paxbolt",
    role: "CEO",
    description: "Driving the company forward with strategic decisions and ensuring top-notch service delivery.",
    icon: Briefcase,
    color: "from-red-500 to-red-700",
    socials: { twitter: "#", discord: "#" },
    avatar: paxboltAvatar,
  },
  {
    name: "Single",
    role: "Director",
    description: "Overseeing operations and ensuring everything runs smoothly for our valued customers.",
    icon: Target,
    color: "from-orange-500 to-red-600",
    socials: { twitter: "#", discord: "#" },
    avatar: singleAvatar,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, rotateY: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const TeamSection = () => {
  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]" />

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 px-4 py-2 rounded-full mb-6"
          >
            <Users className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-300">Our Team</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Meet The </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Leaders
            </span>
          </h2>
          <p className="text-zinc-400 text-lg">
            The passionate team behind FrictionHost dedicated to your gaming success.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -15,
                rotateY: 5,
              }}
              className="group relative perspective-1000"
            >
              <div className="relative bg-zinc-900/80 backdrop-blur-lg border border-zinc-800 p-8 rounded-3xl transition-all duration-500 hover:border-red-500/50 hover:shadow-[0_0_60px_rgba(220,38,38,0.2)] text-center overflow-hidden">
                {/* Background Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated particles on hover */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-red-500 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        bottom: "0%",
                      }}
                      animate={{
                        y: [0, -200],
                        opacity: [1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
                
                {/* Avatar */}
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 mb-6"
                >
                  <div className={`w-28 h-28 mx-auto rounded-2xl bg-gradient-to-br ${member.color} overflow-hidden shadow-lg group-hover:shadow-[0_0_50px_rgba(220,38,38,0.4)] transition-all duration-500`}>
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Ring animation */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-10px] rounded-2xl border border-dashed border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.div>

                {/* Name */}
                <h3 className="relative z-10 font-display text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                  {member.name}
                </h3>

                {/* Role Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 inline-flex items-center gap-1 bg-red-500/20 border border-red-500/30 px-4 py-1.5 rounded-full mb-4"
                >
                  <span className="text-sm font-semibold text-red-400">
                    {member.role}
                  </span>
                </motion.div>

                {/* Description */}
                <p className="relative z-10 text-zinc-400 text-sm leading-relaxed mb-6">
                  {member.description}
                </p>

                {/* Social Links */}
                <div className="relative z-10 flex justify-center gap-3">
                  <motion.a
                    href={member.socials.twitter}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all duration-200"
                  >
                    <Twitter className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={member.socials.discord}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </motion.a>
                </div>

                {/* Bottom decorative line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
