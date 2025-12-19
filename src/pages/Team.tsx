import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Twitter, Linkedin, Github, Crown, Briefcase, Star } from "lucide-react";
import luffyAvatar from "@/assets/luffy-avatar.png";
import paxboltAvatar from "@/assets/paxbolt-avatar.png";
import singleAvatar from "@/assets/single-avatar.png";

const teamMembers = [
  {
    name: "Luffy",
    role: "Founder",
    icon: Crown,
    description: "Visionary founder leading FrictionHost to revolutionize game hosting in India.",
    image: luffyAvatar,
    gradient: "from-primary to-accent",
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
    image: paxboltAvatar,
    gradient: "from-accent to-primary",
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
    image: singleAvatar,
    gradient: "from-primary via-accent to-primary",
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

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-20">
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
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 glass rounded-full text-primary text-sm font-medium mb-6">
                Leadership Team
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">
                  Meet Our Team
                </span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative glass rounded-2xl p-6 overflow-hidden">
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
                          className="absolute inset-[-8px] rounded-full border border-dashed border-primary/30"
                        />
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 mx-auto">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="text-center">
                        <h3 className="font-display text-xl font-bold text-foreground mb-1">
                          {member.name}
                        </h3>
                        <p className={`text-sm font-medium bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-3`}>
                          {member.role}
                        </p>
                        <p className="text-muted-foreground text-sm mb-4">
                          {member.description}
                        </p>

                        {/* Social Links */}
                        <div className="flex justify-center gap-3">
                          {member.social.twitter && (
                            <a
                              href={member.social.twitter}
                              className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary hover:border-primary transition-all"
                            >
                              <Twitter className="w-4 h-4" />
                            </a>
                          )}
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary hover:border-primary transition-all"
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                          {member.social.github && (
                            <a
                              href={member.social.github}
                              className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary hover:border-primary transition-all"
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
              <div className="inline-flex flex-col items-center gap-4 glass rounded-2xl p-8">
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Want to Join Our Team?
                </h3>
                <p className="text-muted-foreground max-w-md">
                  We're always looking for talented individuals passionate about gaming and technology.
                </p>
                <a
                  href="mailto:careers@frictionhost.com"
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-xl transition-all glow-primary"
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
