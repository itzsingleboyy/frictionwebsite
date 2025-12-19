import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, Mail, Phone, FileText, 
  ExternalLink, Headphones, Clock, Users 
} from "lucide-react";

const supportChannels = [
  {
    icon: MessageCircle,
    title: "Discord Community",
    description: "Join our active Discord server for instant help and community support.",
    link: "https://discord.gg/frictionhost",
    linkText: "Join Discord",
    highlight: true,
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us an email and we'll respond within 24 hours.",
    link: "mailto:support@frictionhost.com",
    linkText: "support@frictionhost.com",
    highlight: false,
  },
  {
    icon: Headphones,
    title: "Live Chat",
    description: "Chat with our support team in real-time through our panel.",
    link: "#",
    linkText: "Open Live Chat",
    highlight: false,
  },
  {
    icon: FileText,
    title: "Knowledge Base",
    description: "Browse our documentation and tutorials for self-help.",
    link: "#",
    linkText: "View Docs",
    highlight: false,
  },
];

const stats = [
  { icon: Clock, value: "< 5 min", label: "Avg Response Time" },
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Headphones, value: "24/7", label: "Support Available" },
];

const Support = () => {
  return (
    <>
      <Helmet>
        <title>Support - FrictionHost</title>
        <meta name="description" content="Get help from FrictionHost. Join our Discord, email us, or use live chat for instant support." />
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
                <span className="text-foreground">Get </span>
                <span className="gradient-text">
                  Support
                </span>
              </h1>
              <p className="text-muted-foreground text-lg">
                We're here to help 24/7. Choose your preferred way to reach us.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-8 mb-16"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3 glass rounded-xl px-6 py-4">
                    <Icon className="w-8 h-8 text-primary" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-muted-foreground text-sm">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Support Channels */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {supportChannels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`glass rounded-2xl p-6 transition-all duration-300 ${
                      channel.highlight
                        ? "border-primary/50 glow-primary"
                        : "hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        channel.highlight 
                          ? "bg-gradient-to-br from-primary to-accent" 
                          : "bg-secondary"
                      }`}>
                        <Icon className={`w-7 h-7 ${channel.highlight ? "text-white" : "text-primary"}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-bold text-foreground mb-2">
                          {channel.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {channel.description}
                        </p>
                        <a
                          href={channel.link}
                          target={channel.link.startsWith("http") ? "_blank" : undefined}
                          rel={channel.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          <Button 
                            variant={channel.highlight ? "hero" : "outline"} 
                            size="sm"
                            className="gap-2"
                          >
                            {channel.linkText}
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* FAQ Link */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <p className="text-muted-foreground mb-4">
                Have common questions? Check out our FAQ section.
              </p>
              <Button variant="outline" size="lg" className="gap-2">
                View FAQ <ExternalLink className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Support;
