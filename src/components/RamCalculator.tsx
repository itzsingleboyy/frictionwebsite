import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, ChevronRight } from "lucide-react";

const presets = [
  { name: "Survival", ram: 2, players: 10 },
  { name: "Skyblock", ram: 3, players: 20 },
  { name: "Light Modpack", ram: 4, players: 15 },
  { name: "Heavy Modpack", ram: 8, players: 25 },
];

const serverTypes = ["Spigot/Paper", "Forge", "Fabric", "Vanilla"];
const versions = ["1.21.x", "1.20.x", "1.19.x", "1.18.x"];

const RamCalculator = () => {
  const [players, setPlayers] = useState(12);
  const [plugins, setPlugins] = useState({ light: 10, medium: 5, heavy: 0 });
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [serverType, setServerType] = useState(serverTypes[0]);
  const [version, setVersion] = useState(versions[0]);

  const calculateRam = () => {
    const baseRam = 1;
    const playerRam = Math.ceil(players / 10) * 0.5;
    const pluginRam =
      plugins.light * 0.05 + plugins.medium * 0.1 + plugins.heavy * 0.2;
    return Math.ceil(baseRam + playerRam + pluginRam);
  };

  const recommendedRam = calculateRam();
  const pricePerGb = 45;
  const totalPrice = recommendedRam * pricePerGb;

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Smart Calculator</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Not Sure Which</span>{" "}
            <span className="text-gradient">Plan</span>
            <span className="text-foreground"> to Pick?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our smart calculator will find the perfect plan for your server.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="glass-card p-6 md:p-8 rounded-3xl shadow-card">
              {/* Quick Presets */}
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-3 block">
                  Quick Presets
                </label>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        setSelectedPreset(preset.name);
                        setPlayers(preset.players);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedPreset === preset.name
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Server Type */}
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-3 block">
                  Server Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {serverTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setServerType(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        serverType === type
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Game Version */}
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-3 block">
                  Game Version
                </label>
                <select
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="w-full bg-secondary text-foreground px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
                >
                  {versions.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              {/* Players Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm text-muted-foreground">
                    Concurrent Players
                  </label>
                  <span className="text-primary font-bold">{players}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={players}
                  onChange={(e) => setPlayers(parseInt(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Plugin Counters */}
              <div className="space-y-4">
                {[
                  { key: "light", label: "Light Plugins" },
                  { key: "medium", label: "Medium Plugins" },
                  { key: "heavy", label: "Heavy Plugins" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex justify-between items-center">
                    <label className="text-sm text-muted-foreground">{label}</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setPlugins((p) => ({
                            ...p,
                            [key]: Math.max(0, p[key as keyof typeof p] - 1),
                          }))
                        }
                        className="w-8 h-8 rounded-lg bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold">
                        {plugins[key as keyof typeof plugins]}
                      </span>
                      <button
                        onClick={() =>
                          setPlugins((p) => ({
                            ...p,
                            [key]: p[key as keyof typeof p] + 1,
                          }))
                        }
                        className="w-8 h-8 rounded-lg bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation Card */}
            <div className="glass-card p-6 md:p-8 rounded-3xl shadow-card border-primary/20">
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                Our Recommendation
              </h3>

              {/* RAM Usage */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Calculated RAM</span>
                  <span className="text-2xl font-display font-bold text-gradient">
                    {recommendedRam} GB
                  </span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(recommendedRam * 10, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>RAM Usage: Safe</span>
                  <span>TPS Risk: Low</span>
                </div>
              </div>

              {/* Recommended Plan */}
              <div className="bg-secondary/50 rounded-2xl p-6 mb-6 border border-primary/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs text-primary uppercase tracking-wider">
                      Recommended Plan
                    </span>
                    <h4 className="font-display text-2xl font-bold text-foreground">
                      {recommendedRam <= 2
                        ? "SILVERFISH"
                        : recommendedRam <= 4
                        ? "IRON GOLEM"
                        : recommendedRam <= 8
                        ? "ENDER DRAGON"
                        : "WITHER BOSS"}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-display font-bold text-gradient">
                      ₹{totalPrice}
                    </span>
                    <span className="text-muted-foreground text-sm">/mo</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="text-foreground font-medium">
                    {recommendedRam} GB RAM
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    ~₹{(totalPrice / players).toFixed(0)}/player
                  </span>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full gap-2">
                Select Plan <ChevronRight className="w-4 h-4" />
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                All plans include DDoS protection, instant setup, and 24/7 support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RamCalculator;
