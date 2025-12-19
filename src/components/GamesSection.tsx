import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2, Users, HardDrive, Cpu, ArrowRight } from "lucide-react";

const games = [
  {
    id: "minecraft",
    name: "Minecraft",
    description: "The world's most popular sandbox game. Build, explore, and survive.",
    price: 45,
    icon: "🎮",
    color: "from-green-500 to-emerald-600",
    features: ["Unlimited Slots", "NVMe Storage", "Auto Backups", "Mod Support"],
  },
  {
    id: "rust",
    name: "Rust",
    description: "Survive and thrive in the harsh world of Rust with friends.",
    price: 89,
    icon: "⚔️",
    color: "from-orange-500 to-red-600",
    features: ["High Performance", "DDoS Protection", "Oxide Support", "Custom Maps"],
  },
  {
    id: "palworld",
    name: "Palworld",
    description: "Catch Pals, build bases, and survive in this open-world adventure.",
    price: 79,
    icon: "🐾",
    color: "from-blue-500 to-cyan-600",
    features: ["Dedicated CPU", "Fast Setup", "Auto Updates", "Cross-play"],
  },
  {
    id: "gtav",
    name: "GTA V",
    description: "Run your own FiveM or alt:V roleplay server.",
    price: 149,
    icon: "🚗",
    color: "from-purple-500 to-pink-600",
    features: ["FiveM Ready", "High RAM", "Fast SSD", "Script Support"],
  },
  {
    id: "terraria",
    name: "Terraria",
    description: "2D sandbox adventure with endless possibilities.",
    price: 35,
    icon: "⛏️",
    color: "from-yellow-500 to-orange-600",
    features: ["TShock Support", "Easy Mods", "Quick Setup", "24/7 Online"],
  },
  {
    id: "ark",
    name: "ARK Survival",
    description: "Tame dinosaurs and survive prehistoric lands.",
    price: 99,
    icon: "🦖",
    color: "from-teal-500 to-green-600",
    features: ["Cluster Ready", "Mod Support", "High Memory", "Fast CPU"],
  },
];

const GamesSection = () => {
  const [activeGame, setActiveGame] = useState(games[0]);

  return (
    <section id="games" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <Gamepad2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Game Hosting</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Host Your Favorite</span>{" "}
            <span className="text-gradient">Games</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose from our wide selection of game servers, all running on premium hardware.
          </p>
        </div>

        {/* Game Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeGame.id === game.id
                  ? "bg-primary text-primary-foreground shadow-button"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <span className="mr-2">{game.icon}</span>
              {game.name}
            </button>
          ))}
        </div>

        {/* Active Game Card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-3xl shadow-card">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Game Info */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{activeGame.icon}</span>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {activeGame.name}
                    </h3>
                    <p className="text-muted-foreground">Game Server Hosting</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{activeGame.description}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {activeGame.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary text-xs">✓</span>
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button variant="hero" size="lg" className="gap-2">
                  Start Hosting <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Pricing Card */}
              <div className="bg-secondary/50 rounded-2xl p-6 border border-border/50">
                <p className="text-sm text-muted-foreground mb-2">Starting at</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-display font-bold text-gradient">
                    ₹{activeGame.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Unlimited Player Slots</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HardDrive className="w-5 h-5 text-primary" />
                    <span className="text-foreground">NVMe SSD Storage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Ryzen 9 CPU (4GHz+)</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    All plans include DDoS protection, instant setup, and 24/7 support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
