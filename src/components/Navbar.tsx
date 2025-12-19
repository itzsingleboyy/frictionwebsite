import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Flame, Zap, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Team", href: "#team" },
    { name: "FAQ", href: "#faq" },
    { name: "Support", href: "#support" },
  ];

  const gameCategories = [
    { name: "All Games", href: "#games", category: "all" },
    { name: "Popular", href: "#games", category: "popular" },
    { name: "Survival", href: "#games", category: "survival" },
    { name: "Sandbox", href: "#games", category: "sandbox" },
    { name: "Roleplay", href: "#games", category: "roleplay" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-red-500/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <Zap className="w-4 h-4 text-orange-400 absolute -top-1 -right-1" />
            </div>
            <span className="font-display font-bold text-xl bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              FrictionHost
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {link.name}
              </a>
            ))}

            {/* Games Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setGamesOpen(true)}
              onMouseLeave={() => setGamesOpen(false)}
            >
              <button className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                Games
                <ChevronDown className={`w-4 h-4 transition-transform ${gamesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {gamesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-[#0a0a0a]/95 backdrop-blur-xl border border-red-500/30 rounded-xl overflow-hidden shadow-2xl"
                  >
                    {gameCategories.map((cat) => (
                      <a
                        key={cat.name}
                        href={cat.href}
                        className="block px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-red-600/20 transition-colors"
                      >
                        {cat.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white hover:bg-red-600/20">
              Login
            </Button>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 border-t border-red-500/20"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="py-2">
                  <p className="text-red-500 text-xs uppercase tracking-wider mb-2">Game Categories</p>
                  {gameCategories.map((cat) => (
                    <a
                      key={cat.name}
                      href={cat.href}
                      className="block text-zinc-400 hover:text-white transition-colors duration-200 text-sm font-medium py-2 pl-4"
                      onClick={() => setIsOpen(false)}
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col gap-2 pt-4 border-t border-red-500/20">
                  <Button variant="ghost" size="sm" className="justify-start text-zinc-300">
                    Login
                  </Button>
                  <Button variant="hero" size="sm">
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
