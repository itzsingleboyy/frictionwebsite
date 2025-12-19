import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Twitter, Linkedin, Github, Crown, Briefcase, Star } from "lucide-react";

const teamMembers = [
  {
    name: "Luffy",
    role: "Founder",
    icon: Crown,
    description: "Visionary founder leading FrictionHost to revolutionize game hosting in India.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=face",
    gradient: "from-yellow-500 to-orange-500",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Paxbolt",
    role: "CEO",
    icon: Briefcase,
    description: "Strategic leader driving business growth and customer success.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    gradient: "from-red-500 to-red-700",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Single",
    role: "Director",
    icon: Star,
    description: "Operations mastermind ensuring 99.9% uptime and seamless service delivery.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    gradient: "from-orange-500 to-red-500",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

const Team = () => {
  return (
    <>
      <Helmet>
        <title>Our Team - FrictionHost</title>
        <meta
          name="description"
          content="Meet the team behind FrictionHost - passionate gamers and tech experts dedicated to providing the best game server hosting experience."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />

        <main className="pt-24 pb-20">
          {/* Background Effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6">
                Leadership Team
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-500 via-orange-400 to-red-500 bg-clip-text text-transparent">
                  Meet Our Team
                </span>
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                The passionate leaders behind FrictionHost, dedicated to delivering
                the ultimate gaming experience.
              </p>
            </motion.div>

            {/* Team Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {teamMembers.map((member) => {
                const IconComponent = member.icon;
                return (
                  <motion.div
                    key={member.name}
                    variants={cardVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 overflow-hidden">
                      {/* Role Badge */}
                      <div className="absolute top-4 right-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Avatar */}
                      <div className="relative mb-6">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-[-8px] rounded-full border border-dashed border-red-500/30"
                        />
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-red-500/30 mx-auto">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="text-center">
                        <h3 className="font-display text-xl font-bold text-white mb-1">
                          {member.name}
                        </h3>
                        <p className={`text-sm font-medium bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-3`}>
                          {member.role}
                        </p>
                        <p className="text-zinc-500 text-sm mb-4">
                          {member.description}
                        </p>

                        {/* Social Links */}
                        <div className="flex justify-center gap-3">
                          {member.social.twitter && (
                            <a
                              href={member.social.twitter}
                              className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all"
                            >
                              <Twitter className="w-4 h-4" />
                            </a>
                          )}
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all"
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                          {member.social.github && (
                            <a
                              href={member.social.github}
                              className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Join CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-20"
            >
              <div className="inline-flex flex-col items-center gap-4 bg-zinc-900/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8">
                <h3 className="font-display text-2xl font-bold text-white">
                  Want to Join Our Team?
                </h3>
                <p className="text-zinc-400 max-w-md">
                  We're always looking for talented individuals passionate about gaming and technology.
                </p>
                <a
                  href="mailto:careers@frictionhost.com"
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Team;
