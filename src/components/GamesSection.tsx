import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Import hero images
import minecraftHero from "@/assets/minecraft-hero.jpg";
import rustHero from "@/assets/rust-hero.jpg";
import palworldHero from "@/assets/palworld-hero.jpg";
import gtavHero from "@/assets/gtav-hero.jpg";
import terrariaHero from "@/assets/terraria-hero.jpg";

// Import thumbnails
import minecraftThumb from "@/assets/minecraft-thumb.jpg";
import rustThumb from "@/assets/rust-thumb.jpg";
import palworldThumb from "@/assets/palworld-thumb.jpg";
import gtavThumb from "@/assets/gtav-thumb.jpg";
import terrariaThumb from "@/assets/terraria-thumb.jpg";

const games = [
  {
    id: "minecraft",
    name: "Minecraft",
    title: "Minecraft Server Hosting",
    description: "Build, explore, and survive in your own Minecraft world with friends. Create limitless adventures.",
    price: 160,
    heroImage: minecraftHero,
    thumbnail: minecraftThumb,
  },
  {
    id: "rust",
    name: "Rust",
    title: "Rust Server Hosting",
    description: "Survive and thrive in the harsh world of Rust. Build bases, form alliances, and dominate.",
    price: 320,
    heroImage: rustHero,
    thumbnail: rustThumb,
  },
  {
    id: "palworld",
    name: "Palworld",
    title: "Palworld Server Hosting",
    description: "Catch Pals, build bases, and survive in this open-world creature collection adventure.",
    price: 240,
    heroImage: palworldHero,
    thumbnail: palworldThumb,
  },
  {
    id: "gtav",
    name: "GTA V",
    title: "GTA V Server Hosting",
    description: "Run your own FiveM or alt:V roleplay server. Create custom experiences in Los Santos.",
    price: 480,
    heroImage: gtavHero,
    thumbnail: gtavThumb,
  },
  {
    id: "terraria",
    name: "Terraria",
    title: "Terraria Server Hosting",
    description: "2D sandbox adventure with endless possibilities. Dig, fight, explore, and build.",
    price: 160,
    heroImage: terrariaHero,
    thumbnail: terrariaThumb,
  },
];

const GamesSection = () => {
  const [activeGame, setActiveGame] = useState(games[0]);

  return (
    <section id="games" className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Hero Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeGame.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={activeGame.heroImage}
            alt={activeGame.name}
            className="w-full h-full object-cover"
          />
          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center container mx-auto px-4">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-block text-sm font-medium text-primary tracking-wider uppercase">
              Unlimited Slots, Storage, and Bandwidth
            </span>
          </motion.div>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={activeGame.id + "-title"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4"
            >
              {activeGame.title}
            </motion.h2>
          </AnimatePresence>

          {/* Price */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGame.id + "-price"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-baseline gap-2 mb-6"
            >
              <span className="text-muted-foreground text-sm">Starts at</span>
              <span className="text-4xl md:text-5xl font-bold gradient-text">
                ₹{activeGame.price}
              </span>
              <span className="text-muted-foreground">/month</span>
            </motion.div>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeGame.id + "-desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-muted-foreground text-lg mb-8 max-w-lg"
            >
              {activeGame.description}
            </motion.p>
          </AnimatePresence>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="hero" size="lg" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Game Tabs with Thumbnails */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="glass-strong rounded-2xl p-2 flex gap-2 overflow-x-auto">
              {games.map((game) => (
                <motion.button
                  key={game.id}
                  onClick={() => setActiveGame(game)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 min-w-[140px] ${
                    activeGame.id === game.id
                      ? "bg-gradient-to-r from-primary/30 to-accent/20 border border-primary/50"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={game.thumbnail}
                      alt={game.name}
                      className="w-full h-full object-cover"
                    />
                    {activeGame.id === game.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 border-2 border-primary rounded-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </div>
                  
                  {/* Game Name */}
                  <span
                    className={`font-medium text-sm whitespace-nowrap transition-colors ${
                      activeGame.id === game.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {game.name}
                  </span>

                  {/* Active indicator line */}
                  {activeGame.id === game.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
