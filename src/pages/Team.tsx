import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Twitter, Linkedin, Github } from "lucide-react";

const teamMembers = [
  {
    name: "Arjun Sharma",
    role: "Founder & CEO",
    description: "Visionary leader with 10+ years in gaming infrastructure.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Priya Patel",
    role: "Co-Founder & CTO",
    description: "Tech genius behind our high-performance server architecture.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Rahul Verma",
    role: "Director of Operations",
    description: "Ensures 99.9% uptime and seamless customer experience.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Sneha Gupta",
    role: "Head of Support",
    description: "Leading our 24/7 support team with excellence.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
];

const Team = () => {
  return (
    <>
      <Helmet>
        <title>Our Team - FrictionHost</title>
        <meta name="description" content="Meet the passionate team behind FrictionHost. Our experts are dedicated to providing the best gaming experience." />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        
        <main className="pt-24 pb-16">
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
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">Meet Our </span>
                <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                  Team
                </span>
              </h1>
              <p className="text-zinc-400 text-lg">
                The passionate people behind FrictionHost who make your gaming experience exceptional.
              </p>
            </motion.div>

            {/* Team Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-zinc-900/50 backdrop-blur-lg border border-zinc-800 hover:border-red-500/50 rounded-2xl p-6 text-center transition-all duration-300"
                >
                  {/* Avatar */}
                  <div className="relative mb-6 inline-block">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-8px] rounded-full border-2 border-dashed border-red-500/30 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-zinc-800 group-hover:border-red-500/50 transition-colors"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-red-500 text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-zinc-500 text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3">
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-red-600/20 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-red-600/20 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-red-600/20 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Team;
