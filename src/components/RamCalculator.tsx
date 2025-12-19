import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator, ChevronRight, ChevronDown, ChevronUp, Cpu, HardDrive, Users, Settings, RotateCcw, Puzzle, Zap } from "lucide-react";

const presets = [
  { id: "survival", name: "Survival", players: 10, plugins: { light: 5, medium: 2, heavy: 0 } },
  { id: "skyblock", name: "Skyblock", players: 15, plugins: { light: 8, medium: 4, heavy: 1 } },
  { id: "light-modpack", name: "Light Modpack", players: 8, plugins: { light: 3, medium: 2, heavy: 2 } },
  { id: "heavy-modpack", name: "Heavy Modpack", players: 6, plugins: { light: 2, medium: 3, heavy: 5 } },
];

const serverTypes = ["Spigot/Paper", "Forge", "Fabric", "Vanilla"];
const versions = ["1.21.x", "1.20.x", "1.19.x", "1.18.x", "1.17.x"];

const tiers = [
  { id: "auto", name: "Auto", multiplier: 1 },
  { id: "budget", name: "Budget", multiplier: 0.85 },
  { id: "performance", name: "Performance", multiplier: 1.25 },
];

const plans = [
  { name: "SPARK", ram: 4, price: 170, pricePerPlayer: 14.17 },
  { name: "BLAZE", ram: 6, price: 250, pricePerPlayer: 20.83 },
  { name: "INFERNO", ram: 8, price: 330, pricePerPlayer: 27.50 },
  { name: "PHOENIX", ram: 10, price: 400, pricePerPlayer: 33.33 },
  { name: "DRAGON", ram: 12, price: 480, pricePerPlayer: 40.00 },
  { name: "TITAN", ram: 16, price: 600, pricePerPlayer: 50.00 },
];

const RamCalculator = () => {
  const [players, setPlayers] = useState(12);
  const [mods, setMods] = useState(0);
  const [lightPlugins, setLightPlugins] = useState(10);
  const [mediumPlugins, setMediumPlugins] = useState(5);
  const [heavyPlugins, setHeavyPlugins] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [serverType, setServerType] = useState(serverTypes[0]);
  const [version, setVersion] = useState(versions[0]);
  const [selectedTier, setSelectedTier] = useState("auto");
  const [showAdvanced, setShowAdvanced] = useState(true);

  const calculateRam = () => {
    let baseRam = 2;
    baseRam += Math.ceil(players / 5) * 0.5;
    baseRam += mods * 0.1;
    baseRam += lightPlugins * 0.05;
    baseRam += mediumPlugins * 0.15;
    baseRam += heavyPlugins * 0.3;
    
    if (serverType === "Forge" || serverType === "Fabric") {
      baseRam *= 1.3;
    }
    
    const tier = tiers.find(t => t.id === selectedTier);
    if (tier) {
      baseRam *= tier.multiplier;
    }
    
    return Math.max(4, Math.ceil(baseRam));
  };

  const recommendedRam = calculateRam();
  
  const getRecommendedPlans = () => {
    const planIndex = plans.findIndex(p => p.ram >= recommendedRam);
    const startIndex = Math.max(0, planIndex - 1);
    return plans.slice(startIndex, startIndex + 3);
  };

  const recommendedPlans = getRecommendedPlans();
  const mainPlan = recommendedPlans[1] || recommendedPlans[0];

  const getRamUsage = () => {
    if (recommendedRam <= 6) return { text: "Optimal", color: "text-green-400", barColor: "bg-green-500" };
    if (recommendedRam <= 10) return { text: "Moderate", color: "text-yellow-400", barColor: "bg-yellow-500" };
    return { text: "High", color: "text-orange-400", barColor: "bg-orange-500" };
  };

  const getTpsRisk = () => {
    const pluginLoad = lightPlugins + mediumPlugins * 2 + heavyPlugins * 4;
    if (pluginLoad < 20 && players < 15) return { text: "Low", color: "text-green-400", barColor: "bg-green-500", width: "30%" };
    if (pluginLoad < 40 && players < 25) return { text: "Medium", color: "text-yellow-400", barColor: "bg-yellow-500", width: "60%" };
    return { text: "High", color: "text-orange-400", barColor: "bg-orange-500", width: "90%" };
  };

  const handlePreset = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      setSelectedPreset(presetId);
      setPlayers(preset.players);
      setLightPlugins(preset.plugins.light);
      setMediumPlugins(preset.plugins.medium);
      setHeavyPlugins(preset.plugins.heavy);
    }
  };

  const handleReset = () => {
    setSelectedPreset(null);
    setServerType(serverTypes[0]);
    setVersion(versions[0]);
    setPlayers(12);
    setMods(0);
    setLightPlugins(10);
    setMediumPlugins(5);
    setHeavyPlugins(0);
    setSelectedTier("auto");
  };

  const ramUsage = getRamUsage();
  const tpsRisk = getTpsRisk();

  return (
    <section id="calculator" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[120px]" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 px-4 py-2 rounded-full mb-6">
            <Calculator className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-300">Smart Calculator</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Not Sure Which </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Plan
            </span>
            <span className="text-white"> to Pick?</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Our smart calculator will find the perfect plan for your server.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-900/50 backdrop-blur-lg border border-red-500/10 p-6 rounded-2xl space-y-6"
            >
              {/* Quick Presets */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-red-500" />
                  <span className="font-semibold text-white">Quick Presets</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handlePreset(preset.id)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedPreset === preset.id
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/20"
                          : "bg-zinc-800/80 text-zinc-400 border border-red-500/20 hover:border-red-500/50 hover:text-white"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Server Type & Version */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-sm text-white">Server Type</span>
                  </div>
                  <select
                    value={serverType}
                    onChange={(e) => setServerType(e.target.value)}
                    className="w-full bg-zinc-800/80 text-white px-4 py-2.5 rounded-xl border border-red-500/20 focus:border-red-500 focus:outline-none transition-colors text-sm"
                  >
                    {serverTypes.map((type) => (
                      <option key={type} value={type} className="bg-zinc-900">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <HardDrive className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-sm text-white">Game Version</span>
                  </div>
                  <select
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full bg-zinc-800/80 text-white px-4 py-2.5 rounded-xl border border-red-500/20 focus:border-red-500 focus:outline-none transition-colors text-sm"
                  >
                    {versions.map((v) => (
                      <option key={v} value={v} className="bg-zinc-900">
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Concurrent Players */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-sm text-white">Concurrent Players</span>
                  </div>
                  <span className="text-red-500 font-bold text-lg">{players}</span>
                </div>
                <Slider
                  value={[players]}
                  onValueChange={(value) => setPlayers(value[0])}
                  min={1}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* How many mods */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Puzzle className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-sm text-white">How many mods?</span>
                  </div>
                  <span className="text-red-500 font-bold text-lg">{mods}</span>
                </div>
                <Slider
                  value={[mods]}
                  onValueChange={(value) => setMods(value[0])}
                  min={0}
                  max={200}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Plugin Load */}
              <div className="border border-red-500/20 rounded-xl p-4 bg-zinc-800/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-red-500" />
                    <span className="font-semibold text-white">Plugin Load</span>
                  </div>
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-1 text-xs text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
                
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-5 overflow-hidden"
                    >
                      {/* Light Plugins */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-zinc-400">Light Plugins</span>
                          <span className="text-red-400 font-medium">{lightPlugins}</span>
                        </div>
                        <Slider
                          value={[lightPlugins]}
                          onValueChange={(value) => setLightPlugins(value[0])}
                          min={0}
                          max={50}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Medium Plugins */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-zinc-400">Medium Plugins</span>
                          <span className="text-red-400 font-medium">{mediumPlugins}</span>
                        </div>
                        <Slider
                          value={[mediumPlugins]}
                          onValueChange={(value) => setMediumPlugins(value[0])}
                          min={0}
                          max={30}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Heavy Plugins */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-zinc-400">Heavy Plugins</span>
                          <span className="text-red-400 font-medium">{heavyPlugins}</span>
                        </div>
                        <Slider
                          value={[heavyPlugins]}
                          onValueChange={(value) => setHeavyPlugins(value[0])}
                          min={0}
                          max={20}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-red-400 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  {showAdvanced ? "Hide Advanced" : "Show Advanced"}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-red-400 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </motion.div>

            {/* Recommendation Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-900/50 backdrop-blur-lg border border-red-500/20 p-6 rounded-2xl space-y-6"
            >
              <h3 className="font-display text-2xl font-bold text-white">
                Our Recommendation
              </h3>

              {/* RAM Display */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Calculated RAM:</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                    {recommendedRam} GB
                  </span>
                </div>
                
                {/* Status Bars */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-zinc-500">RAM Usage:</span>
                      <span className={`font-medium ${ramUsage.color}`}>{ramUsage.text}</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (recommendedRam / 16) * 100)}%` }}
                        className={`h-full ${ramUsage.barColor} rounded-full`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-zinc-500">TPS Risk:</span>
                      <span className={`font-medium ${tpsRisk.color}`}>{tpsRisk.text}</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: tpsRisk.width }}
                        className={`h-full ${tpsRisk.barColor} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferred Tier */}
              <div>
                <span className="text-sm text-zinc-400 mb-3 block">Preferred Tier</span>
                <div className="grid grid-cols-3 gap-2">
                  {tiers.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                        selectedTier === tier.id
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/20"
                          : "bg-zinc-800/80 text-zinc-400 hover:text-white border border-red-500/20 hover:border-red-500/40"
                      }`}
                    >
                      {tier.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan Cost Header */}
              <div className="text-center py-4 border-t border-b border-red-500/10">
                <p className="text-lg font-semibold text-white">{recommendedRam} GB Plan Cost</p>
                <p className="text-sm text-zinc-500">
                  Budget: ₹{mainPlan?.price - 50 || 120} / Performance: ₹{mainPlan?.price + 60 || 310}
                </p>
              </div>

              {/* Plan Cards */}
              <div className="grid grid-cols-3 gap-3">
                {recommendedPlans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-4 rounded-xl border transition-all ${
                      index === 1
                        ? "bg-gradient-to-b from-red-500/20 to-red-900/10 border-red-500 scale-105 shadow-lg shadow-red-500/20"
                        : "bg-zinc-800/50 border-red-500/20 hover:border-red-500/40"
                    }`}
                  >
                    {index === 1 && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full whitespace-nowrap">
                        Budget Tier
                      </div>
                    )}
                    <div className="text-center space-y-2 pt-2">
                      <h4 className="font-bold text-sm text-white">{plan.name}</h4>
                      <div className="text-2xl font-bold">
                        <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">₹{plan.price}</span>
                        <span className="text-xs text-zinc-500">/mo</span>
                      </div>
                      <p className="text-xs text-zinc-500">{plan.ram} GB RAM</p>
                      <p className="text-xs text-zinc-500">~₹{plan.pricePerPlayer.toFixed(2)}/player</p>
                      <Button
                        size="sm"
                        className={`w-full mt-2 ${
                          index === 1 
                            ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white" 
                            : "bg-zinc-700 hover:bg-zinc-600 text-white"
                        }`}
                      >
                        Select Plan
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Show Calculation Breakdown */}
              <button className="w-full text-center text-sm text-red-400 hover:text-red-300 transition-colors flex items-center justify-center gap-1">
                Show Calculation Breakdown <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RamCalculator;
