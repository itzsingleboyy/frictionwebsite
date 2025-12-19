import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gamepad2, Users, HardDrive, Cpu, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

// Import thumbnails
import minecraftThumb from "@/assets/minecraft-thumb.jpg";
import rustThumb from "@/assets/rust-thumb.jpg";
import palworldThumb from "@/assets/palworld-thumb.jpg";
import gtavThumb from "@/assets/gtav-thumb.jpg";
import terrariaThumb from "@/assets/terraria-thumb.jpg";
import arkThumb from "@/assets/ark-thumb.jpg";

const categories = [
  { id: "all", label: "All Games", icon: Gamepad2 },
  { id: "popular", label: "Popular", icon: Sparkles },
  { id: "survival", label: "Survival", icon: Shield },
  { id: "sandbox", label: "Sandbox", icon: HardDrive },
  { id: "roleplay", label: "Roleplay", icon: Users },
];

const games = [
  {
    id: "minecraft",
    name: "Minecraft",
    description: "Build, explore, and survive in the world's most popular sandbox game.",
    price: 45,
    thumbnail: minecraftThumb,
    players: "Unlimited",
    popular: true,
    category: "sandbox",
    features: ["Unlimited Slots", "Mod Support", "Auto Backups", "Spigot/Paper"],
  },
  {
    id: "rust",
    name: "Rust",
    description: "Survive and dominate in this brutal multiplayer survival game.",
    price: 89,
    thumbnail: rustThumb,
    players: "300+",
    popular: true,
    category: "survival",
    features: ["Oxide Support", "Custom Maps", "DDoS Protected", "Daily Wipes"],
  },
  {
    id: "palworld",
    name: "Palworld",
    description: "Catch Pals, build bases, and explore this magical adventure.",
    price: 79,
    thumbnail: palworldThumb,
    players: "32",
    popular: true,
    category: "survival",
    features: ["Cross-play", "Auto Updates", "Fast Setup", "Dedicated CPU"],
  },
  {
    id: "gtav",
    name: "GTA V",
    description: "Create your own roleplay server in Los Santos.",
    price: 149,
    thumbnail: gtavThumb,
    players: "128",
    popular: false,
    category: "roleplay",
    features: ["FiveM Ready", "Script Support", "High RAM", "Custom Framework"],
  },
  {
    id: "terraria",
    name: "Terraria",
    description: "2D sandbox adventure with endless exploration possibilities.",
    price: 35,
    thumbnail: terrariaThumb,
    players: "16",
    popular: false,
    category: "sandbox",
    features: ["TShock Support", "Easy Mods", "Quick Setup", "24/7 Online"],
  },
  {
    id: "ark",
    name: "ARK Survival",
    description: "Tame dinosaurs and survive in prehistoric lands.",
    price: 99,
    thumbnail: arkThumb,
    players: "70",
    popular: false,
    category: "survival",
    features: ["Cluster Ready", "Mod Support", "High Memory", "Fast CPU"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const GamesCategory = () => {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredGames = activeCategory === "all" 
    ? games 
    : activeCategory === "popular"
    ? games.filter((g) => g.popular)
    : games.filter((g) => g.category === activeCategory);

  return (
    <section id="games" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 px-4 py-2 rounded-full mb-6"
          >
            <Gamepad2 className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-300">Game Hosting</span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Host Your Favorite </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Games
            </span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Premium servers for all popular games. Instant setup, powerful hardware, 24/7 support.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                    : "bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:border-red-500/50 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </motion.div>

        {/* Games Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                variants={cardVariants}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredGame(game.id)}
                onHoverEnd={() => setHoveredGame(null)}
                className="group relative bg-zinc-900/80 backdrop-blur-lg rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-500/50 transition-all duration-500"
              >
                {/* Popular Badge */}
                {game.popular && (
                  <div className="absolute top-4 right-4 z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      Popular
                    </motion.div>
                  </div>
                )}

                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={game.thumbnail}
                    alt={game.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredGame === game.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                  
                  {/* Overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredGame === game.id ? 1 : 0 }}
                    className="absolute inset-0 bg-red-600/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Button variant="hero" size="lg" className="gap-2">
                      Configure Server <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                        {game.name}
                      </h3>
                      <p className="text-zinc-500 text-sm mt-1">{game.description}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-lg"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Users className="w-4 h-4 text-red-500" />
                      <span>{game.players} Players</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Shield className="w-4 h-4 text-red-500" />
                      <span>DDoS Protected</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                    <div>
                      <span className="text-sm text-zinc-500">Starting at</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-display font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                          ₹{game.price}
                        </span>
                        <span className="text-zinc-500 text-sm">/mo</span>
                      </div>
                    </div>
                    <Button variant="gaming" size="sm" className="gap-1">
                      Select <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(220,38,38,0.1) 0%, transparent 70%)",
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-zinc-500 mb-4">Don't see your game? We support 50+ games!</p>
          <Button variant="outline" size="lg" className="gap-2">
            View All Games <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GamesCategory;
