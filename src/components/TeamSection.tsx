import { motion } from "framer-motion";
import { Users, Crown, Briefcase, Target } from "lucide-react";

const teamMembers = [
  {
    name: "Luffy",
    role: "Founder",
    description: "Visionary leader who started FrictionHost with a dream to provide the best gaming experience.",
    icon: Crown,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Paxbolt",
    role: "CEO",
    description: "Driving the company forward with strategic decisions and ensuring top-notch service delivery.",
    icon: Briefcase,
    color: "from-red-500 to-red-700",
  },
  {
    name: "Single",
    role: "Director",
    description: "Overseeing operations and ensuring everything runs smoothly for our valued customers.",
    icon: Target,
    color: "from-orange-500 to-red-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const TeamSection = () => {
  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 px-4 py-2 rounded-full mb-6">
            <Users className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-300">Our Team</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
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
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative bg-zinc-900/50 backdrop-blur-lg border border-red-500/10 p-8 rounded-3xl transition-all duration-500 hover:border-red-500/40 hover:shadow-[0_0_50px_rgba(220,38,38,0.2)] text-center"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Avatar */}
              <motion.div
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
                className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-[0_0_40px_rgba(220,38,38,0.4)] transition-all duration-300`}
              >
                <member.icon className="w-12 h-12 text-white" />
              </motion.div>

              {/* Name */}
              <h3 className="font-display text-2xl font-bold text-white mb-1">
                {member.name}
              </h3>

              {/* Role Badge */}
              <div className="inline-flex items-center gap-1 bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-full mb-4">
                <span className="text-sm font-semibold text-red-400">
                  {member.role}
                </span>
              </div>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed">
                {member.description}
              </p>

              {/* Decorative Line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
