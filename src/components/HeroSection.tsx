import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Copy, Check } from "lucide-react";

// Import hero images
import minecraftHero from "@/assets/minecraft-hero.jpg";
import rustHero from "@/assets/rust-hero.jpg";
import palworldHero from "@/assets/palworld-hero.jpg";
import gtavHero from "@/assets/gtav-hero.jpg";
import terrariaHero from "@/assets/terraria-hero.jpg";

const games = [
  {
    id: "minecraft",
    name: "Minecraft",
    price: 45,
    image: minecraftHero,
    tagline: "Unlimited Slots, Storage, and Bandwidth",
    description: "Join millions of fellow Minecraft players. Build your dream Minecraft community on the world's most popular game.",
  },
  {
    id: "rust",
    name: "Rust",
    price: 89,
    image: rustHero,
    tagline: "High-Performance Survival Servers",
    description: "Survive and thrive in the harsh world of Rust. Build bases, raid enemies, and dominate the server.",
  },
  {
    id: "palworld",
    name: "Palworld",
    price: 79,
    image: palworldHero,
    tagline: "Catch Pals, Build & Survive",
    description: "Host your own Palworld adventure. Catch Pals, build bases, and explore with friends.",
  },
  {
    id: "gtav",
    name: "GTA V",
    price: 149,
    image: gtavHero,
    tagline: "FiveM & alt:V Ready",
    description: "Run your own roleplay server in Los Santos. Create unique experiences for your community.",
  },
  {
    id: "terraria",
    name: "Terraria",
    price: 35,
    image: terrariaHero,
    tagline: "2D Adventure Awaits",
    description: "Explore, build, and battle in this 2D sandbox adventure with endless possibilities.",
  },
];

const HeroSection = () => {
  const [activeGame, setActiveGame] = useState(games[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("LORD20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background Image with Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeGame.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${activeGame.image})` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0229]/70 via-[#0c0229]/60 to-[#0c0229]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0229]/80 via-transparent to-[#0c0229]/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-purple-200">{activeGame.tagline}</span>
          </motion.div>

          {/* Main Heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGame.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  {activeGame.name}
                </span>
              </h1>
              <h2 className="font-display text-2xl md:text-3xl text-purple-200/80 mb-6">
                Server Hosting
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-lg text-purple-300">Starts at</span>
            <span className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent ml-2">
              ₹{activeGame.price}
            </span>
            <span className="text-purple-300">/month</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-purple-200/70 max-w-2xl mx-auto mb-8"
          >
            {activeGame.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="hero" size="xl" className="text-lg px-12">
              {activeGame.name}
            </Button>
          </motion.div>

          {/* Game Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mt-12"
          >
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeGame.id === game.id
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                    : "bg-purple-900/30 text-purple-300 border border-purple-500/30 hover:bg-purple-800/40 hover:border-purple-500/50 backdrop-blur-sm"
                }`}
              >
                {game.name}
              </button>
            ))}
          </motion.div>

          {/* Promo Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16"
          >
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border border-purple-500/30 px-6 py-4 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl">
                🎉
              </div>
              <div className="text-left">
                <p className="text-sm text-purple-300">Welcome Offer!</p>
                <p className="font-semibold text-white">
                  Get <span className="text-cyan-400">20% OFF</span> your first order.
                </p>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-2 bg-purple-600/50 hover:bg-purple-600 border border-purple-500/50 px-4 py-2 rounded-lg transition-all duration-300"
              >
                <code className="text-cyan-400 font-mono font-bold">LORD20</code>
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-purple-300" />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c0229] to-transparent" />
    </section>
  );
};

export default HeroSection;
