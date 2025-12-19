import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Twitter, Youtube, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.webp";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    games: [
      { name: "Minecraft", href: "/#games", isExternal: false },
      { name: "Rust", href: "/#games", isExternal: false },
      { name: "Palworld", href: "/#games", isExternal: false },
      { name: "GTA V", href: "/#games", isExternal: false },
      { name: "Terraria", href: "/#games", isExternal: false },
    ],
    company: [
      { name: "About Us", href: "/#features", isExternal: false },
      { name: "Our Team", href: "/team", isExternal: false },
      { name: "Pricing", href: "/pricing", isExternal: false },
      { name: "Features", href: "/features", isExternal: false },
    ],
    support: [
      { name: "Help Center", href: "/support", isExternal: false },
      { name: "Contact Us", href: "/support", isExternal: false },
      { name: "Live Chat", href: "/support", isExternal: false },
      { name: "Discord", href: "https://discord.gg/93mRrFkutF", isExternal: true },
    ],
    legal: [
      { name: "Terms of Service", href: "/terms", isExternal: false },
      { name: "Privacy Policy", href: "/privacy", isExternal: false },
      { name: "Refund Policy", href: "/terms#section-5", isExternal: false },
      { name: "SLA", href: "/terms#section-9", isExternal: false },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: MessageCircle, href: "https://discord.gg/93mRrFkutF", label: "Discord" },
  ];

  const renderLink = (link: { name: string; href: string; isExternal: boolean }) => {
    if (link.isExternal) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          {link.name}
        </a>
      );
    }
    
    // Handle hash links for same page navigation
    if (link.href.startsWith("/#")) {
      return (
        <Link
          to={link.href}
          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          {link.name}
        </Link>
      );
    }

    return (
      <Link
        to={link.href}
        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        {link.name}
      </Link>
    );
  };

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
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="FrictionHost Logo" className="w-10 h-10 rounded-xl" />
              <div className="flex flex-col items-start">
                <span className="font-display font-bold text-xl gradient-text leading-tight">
                  FrictionHost
                </span>
                <span className="text-[9px] text-foreground/60 tracking-wide leading-tight">
                  India's best hosting
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Premium game server hosting with powerful hardware, 24/7 support,
              and instant setup. Start your gaming journey today.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
                  {renderLink(link)}
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
                  {renderLink(link)}
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
                  {renderLink(link)}
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
                  {renderLink(link)}
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