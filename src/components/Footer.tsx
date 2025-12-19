import { motion } from "framer-motion";
import { Twitter, Youtube, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.webp";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    games: [
      { name: "Minecraft", href: "#" },
      { name: "Rust", href: "#" },
      { name: "Palworld", href: "#" },
      { name: "GTA V", href: "#" },
      { name: "Terraria", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Team", href: "#team" },
      { name: "Blog", href: "#" },
      { name: "Status", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Live Chat", href: "#" },
      { name: "Discord", href: "https://discord.gg/uAZst3rWMa" },
    ],
    legal: [
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Refund Policy", href: "#" },
      { name: "SLA", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: MessageCircle, href: "https://discord.gg/uAZst3rWMa", label: "Discord" },
  ];

  return (
    <footer className="bg-background border-t border-primary/10">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-6 gap-8"
        >
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="FrictionHost Logo" className="w-10 h-10 rounded-xl" />
              <span className="font-display font-bold text-xl gradient-text">
                FrictionHost
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Premium game server hosting with powerful hardware, 24/7 support,
              and instant setup. Start your gaming journey today.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary hover:border-primary transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Games */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Games
            </h4>
            <ul className="space-y-2">
              {footerLinks.games.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary/10 flex justify-center items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} FrictionHost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
