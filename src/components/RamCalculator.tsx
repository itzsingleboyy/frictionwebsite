import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calculator, ChevronRight, Cpu, HardDrive, Users } from "lucide-react";

const presets = [
  { name: "Survival", ram: 2, players: 10 },
  { name: "Skyblock", ram: 3, players: 20 },
  { name: "Light Modpack", ram: 4, players: 15 },
  { name: "Heavy Modpack", ram: 8, players: 25 },
];

const serverTypes = ["Spigot/Paper", "Forge", "Fabric", "Vanilla"];
const versions = ["1.21.x", "1.20.x", "1.19.x", "1.18.x"];

const tiers = [
  { name: "budget", label: "Budget", pricePerGb: 45 },
  { name: "performance", label: "Performance", pricePerGb: 60 },
];

const RamCalculator = () => {
  const [players, setPlayers] = useState(12);
  const [plugins, setPlugins] = useState({ light: 10, medium: 5, heavy: 0 });
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [serverType, setServerType] = useState(serverTypes[0]);
  const [version, setVersion] = useState(versions[0]);
  const [selectedTier, setSelectedTier] = useState(tiers[0]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const calculateRam = () => {
    const baseRam = 1;
    const playerRam = Math.ceil(players / 10) * 0.5;
    const pluginRam =
      plugins.light * 0.05 + plugins.medium * 0.1 + plugins.heavy * 0.2;
    return Math.max(1, Math.ceil(baseRam + playerRam + pluginRam));
  };

  const recommendedRam = calculateRam();
  const totalPrice = recommendedRam * selectedTier.pricePerGb;
  const pricePerPlayer = (totalPrice / players).toFixed(2);

  const getPlanName = (ram: number) => {
    if (ram <= 1) return "PROXY ONLY";
    if (ram <= 2) return "SILVERFISH";
    if (ram <= 4) return "IRON GOLEM";
    if (ram <= 6) return "ENDER DRAGON";
    if (ram <= 8) return "WITHER BOSS";
    return "MEGA SERVER";
  };

  const getRamRisk = (ram: number) => {
    if (ram <= 2) return { usage: "Safe", risk: "Low", color: "text-green-400" };
    if (ram <= 4) return { usage: "Good", risk: "Low", color: "text-green-400" };
    if (ram <= 6) return { usage: "Moderate", risk: "Medium", color: "text-yellow-400" };
    return { usage: "Heavy", risk: "Monitor", color: "text-orange-400" };
  };

  const ramStatus = getRamRisk(recommendedRam);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#0c0229]">
      {/* Background */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-full mb-6">
            <Calculator className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Smart Calculator</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Not Sure Which </span>
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Plan
            </span>
            <span className="text-white"> to Pick?</span>
          </h2>
          <p className="text-purple-200/70 text-lg">
            Our smart calculator will find the perfect plan for your server.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-purple-900/20 backdrop-blur-lg border border-purple-500/20 p-6 md:p-8 rounded-3xl"
            >
              {/* Quick Presets */}
              <div className="mb-6">
                <label className="text-sm text-purple-300 mb-3 block font-medium">
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
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedPreset === preset.name
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                          : "bg-purple-900/50 text-purple-300 border border-purple-500/30 hover:border-purple-500/50"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Server Type */}
              <div className="mb-6">
                <label className="text-sm text-purple-300 mb-3 block font-medium">
                  Server Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {serverTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setServerType(type)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        serverType === type
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                          : "bg-purple-900/50 text-purple-300 border border-purple-500/30 hover:border-purple-500/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Game Version */}
              <div className="mb-6">
                <label className="text-sm text-purple-300 mb-3 block font-medium">
                  Game Version
                </label>
                <select
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="w-full bg-purple-900/50 text-white px-4 py-3 rounded-xl border border-purple-500/30 focus:border-purple-500 focus:outline-none transition-colors"
                >
                  {versions.map((v) => (
                    <option key={v} value={v} className="bg-purple-900">
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              {/* Players Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm text-purple-300 font-medium">
                    Concurrent Players
                  </label>
                  <span className="text-cyan-400 font-bold text-lg">{players}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={players}
                  onChange={(e) => setPlayers(parseInt(e.target.value))}
                  className="w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* Toggle Advanced */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-purple-400 text-sm hover:text-purple-300 transition-colors mb-4"
              >
                {showAdvanced ? "Hide" : "Show"} Advanced Options
              </button>

              {/* Plugin Counters */}
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4"
                >
                  {[
                    { key: "light", label: "Light Plugins" },
                    { key: "medium", label: "Medium Plugins" },
                    { key: "heavy", label: "Heavy Plugins" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex justify-between items-center">
                      <label className="text-sm text-purple-300">{label}</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setPlugins((p) => ({
                              ...p,
                              [key]: Math.max(0, p[key as keyof typeof p] - 1),
                            }))
                          }
                          className="w-8 h-8 rounded-lg bg-purple-900/50 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors border border-purple-500/30"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-white">
                          {plugins[key as keyof typeof plugins]}
                        </span>
                        <button
                          onClick={() =>
                            setPlugins((p) => ({
                              ...p,
                              [key]: p[key as keyof typeof p] + 1,
                            }))
                          }
                          className="w-8 h-8 rounded-lg bg-purple-900/50 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors border border-purple-500/30"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Recommendation Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-purple-900/20 backdrop-blur-lg border border-purple-500/30 p-6 md:p-8 rounded-3xl"
            >
              <h3 className="font-display text-xl font-bold text-white mb-6">
                Our Recommendation
              </h3>

              {/* RAM Display */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-300">Calculated RAM</span>
                  <span className="text-3xl font-display font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {recommendedRam} GB
                  </span>
                </div>
                <div className="h-3 bg-purple-900/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(recommendedRam * 10, 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <span className={ramStatus.color}>RAM Usage: {ramStatus.usage}</span>
                  <span className={ramStatus.color}>TPS Risk: {ramStatus.risk}</span>
                </div>
              </div>

              {/* Tier Selection */}
              <div className="mb-6">
                <label className="text-sm text-purple-300 mb-3 block font-medium">
                  Preferred Tier
                </label>
                <div className="flex gap-2">
                  {tiers.map((tier) => (
                    <button
                      key={tier.name}
                      onClick={() => setSelectedTier(tier)}
                      className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedTier.name === tier.name
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                          : "bg-purple-900/50 text-purple-300 border border-purple-500/30 hover:border-purple-500/50"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended Plan Card */}
              <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-2xl p-6 mb-6 border border-purple-500/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs text-cyan-400 uppercase tracking-wider font-medium">
                      {selectedTier.label} Tier
                    </span>
                    <h4 className="font-display text-2xl font-bold text-white">
                      {getPlanName(recommendedRam)}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-display font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      ₹{totalPrice}
                    </span>
                    <span className="text-purple-300 text-sm">/mo</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-3 text-sm">
                    <HardDrive className="w-4 h-4 text-purple-400" />
                    <span className="text-white">{recommendedRam} GB RAM</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300">~₹{pricePerPlayer}/player</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300">Ryzen 9 CPU (4GHz+)</span>
                  </div>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full gap-2">
                Select Plan <ChevronRight className="w-4 h-4" />
              </Button>

              <p className="text-xs text-purple-400/60 text-center mt-4">
                All plans include DDoS protection, instant setup, and 24/7 support.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RamCalculator;
