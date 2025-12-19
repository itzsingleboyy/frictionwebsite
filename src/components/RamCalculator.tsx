import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Calculator, ChevronRight, ChevronDown, ChevronUp, Cpu, HardDrive, Users, 
  Settings, RotateCcw, Puzzle, Zap, Globe, Database, Shield, Clock, 
  Server, Layers, Activity, Info, Gauge, MemoryStick
} from "lucide-react";

const presets = [
  { id: "survival", name: "Survival", players: 10, plugins: { light: 5, medium: 2, heavy: 0 }, mods: 0, worldSize: "small" },
  { id: "skyblock", name: "Skyblock", players: 15, plugins: { light: 8, medium: 4, heavy: 1 }, mods: 0, worldSize: "medium" },
  { id: "light-modpack", name: "Light Modpack", players: 8, plugins: { light: 3, medium: 2, heavy: 2 }, mods: 50, worldSize: "medium" },
  { id: "heavy-modpack", name: "Heavy Modpack", players: 6, plugins: { light: 2, medium: 3, heavy: 5 }, mods: 150, worldSize: "large" },
  { id: "network", name: "Network Hub", players: 50, plugins: { light: 10, medium: 5, heavy: 2 }, mods: 0, worldSize: "small" },
  { id: "creative", name: "Creative", players: 20, plugins: { light: 15, medium: 8, heavy: 3 }, mods: 0, worldSize: "large" },
];

const serverTypes = [
  { id: "paper", name: "Paper/Spigot", multiplier: 1 },
  { id: "purpur", name: "Purpur", multiplier: 1.05 },
  { id: "forge", name: "Forge", multiplier: 1.4 },
  { id: "fabric", name: "Fabric", multiplier: 1.3 },
  { id: "vanilla", name: "Vanilla", multiplier: 0.9 },
];

const versions = [
  { id: "1.21", name: "1.21.x", multiplier: 1.15 },
  { id: "1.20", name: "1.20.x", multiplier: 1.1 },
  { id: "1.19", name: "1.19.x", multiplier: 1.05 },
  { id: "1.18", name: "1.18.x", multiplier: 1 },
  { id: "1.16", name: "1.16.x", multiplier: 0.95 },
  { id: "1.12", name: "1.12.x", multiplier: 0.85 },
];

const worldSizes = [
  { id: "small", name: "Small (1-5k)", chunks: 2500, multiplier: 1 },
  { id: "medium", name: "Medium (5-15k)", chunks: 10000, multiplier: 1.2 },
  { id: "large", name: "Large (15-30k)", chunks: 22500, multiplier: 1.4 },
  { id: "massive", name: "Massive (30k+)", chunks: 50000, multiplier: 1.7 },
];

const networkTypes = [
  { id: "standalone", name: "Standalone", multiplier: 1, description: "Single server" },
  { id: "bungeecord", name: "BungeeCord", multiplier: 1.15, description: "Proxy network" },
  { id: "velocity", name: "Velocity", multiplier: 1.1, description: "Modern proxy" },
];

const tiers = [
  { id: "budget", name: "Budget", multiplier: 0.85, icon: "💰" },
  { id: "auto", name: "Balanced", multiplier: 1, icon: "⚖️" },
  { id: "performance", name: "Performance", multiplier: 1.3, icon: "🚀" },
];

const plans = [
  { name: "Meteor", ram: 4, price: 160, cpu: "1 vCore", storage: "10 GB" },
  { name: "Nova", ram: 6, price: 240, cpu: "1.5 vCores", storage: "15 GB" },
  { name: "Eclipse", ram: 8, price: 320, cpu: "2 vCores", storage: "20 GB" },
  { name: "Comet", ram: 12, price: 480, cpu: "2.5 vCores", storage: "30 GB" },
  { name: "Nebula", ram: 16, price: 640, cpu: "3 vCores", storage: "40 GB" },
  { name: "Plasma", ram: 24, price: 960, cpu: "3.5 vCores", storage: "40 GB" },
  { name: "SuperNova", ram: 32, price: 1280, cpu: "4 vCores", storage: "60 GB" },
];

const RamCalculator = () => {
  const [players, setPlayers] = useState(12);
  const [mods, setMods] = useState(0);
  const [lightPlugins, setLightPlugins] = useState(10);
  const [mediumPlugins, setMediumPlugins] = useState(5);
  const [heavyPlugins, setHeavyPlugins] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [serverType, setServerType] = useState("paper");
  const [version, setVersion] = useState("1.20");
  const [selectedTier, setSelectedTier] = useState("auto");
  const [worldSize, setWorldSize] = useState("medium");
  const [networkType, setNetworkType] = useState("standalone");
  const [useDatabase, setUseDatabase] = useState(false);
  const [useOptimizedFlags, setUseOptimizedFlags] = useState(true);
  const [viewDistance, setViewDistance] = useState(10);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculateRam = () => {
    let baseRam = 1.5;
    const playerRam = players <= 20 
      ? players * 0.08 
      : 20 * 0.08 + (players - 20) * 0.12;
    const modRam = mods * 0.02;
    const pluginRam = lightPlugins * 0.03 + mediumPlugins * 0.1 + heavyPlugins * 0.25;
    const worldMultiplier = worldSizes.find(w => w.id === worldSize)?.multiplier || 1;
    const serverMultiplier = serverTypes.find(s => s.id === serverType)?.multiplier || 1;
    const versionMultiplier = versions.find(v => v.id === version)?.multiplier || 1;
    const networkMultiplier = networkTypes.find(n => n.id === networkType)?.multiplier || 1;
    const viewDistanceRam = (viewDistance - 6) * 0.15;
    const databaseRam = useDatabase ? 0.5 : 0;
    const flagsMultiplier = useOptimizedFlags ? 0.92 : 1;
    const tierMultiplier = tiers.find(t => t.id === selectedTier)?.multiplier || 1;
    
    let totalRam = (baseRam + playerRam + modRam + pluginRam + viewDistanceRam + databaseRam) 
      * worldMultiplier 
      * serverMultiplier 
      * versionMultiplier 
      * networkMultiplier 
      * flagsMultiplier 
      * tierMultiplier;
    
    return {
      total: Math.max(4, Math.ceil(totalRam)),
      breakdown: {
        base: 1.5,
        players: playerRam,
        mods: modRam,
        plugins: pluginRam,
        viewDistance: viewDistanceRam,
        database: databaseRam,
        worldMultiplier,
        serverMultiplier,
        versionMultiplier,
        networkMultiplier,
        flagsMultiplier,
        tierMultiplier,
      }
    };
  };

  const { total: recommendedRam, breakdown } = calculateRam();
  
  const getRecommendedPlans = () => {
    const planIndex = plans.findIndex(p => p.ram >= recommendedRam);
    const startIndex = Math.max(0, planIndex === -1 ? plans.length - 3 : planIndex - 1);
    return plans.slice(startIndex, startIndex + 3);
  };

  const recommendedPlans = getRecommendedPlans();
  const mainPlan = recommendedPlans[1] || recommendedPlans[0];

  const getPerformanceScore = () => {
    const pluginLoad = lightPlugins + mediumPlugins * 2 + heavyPlugins * 4;
    const playerLoad = players / 10;
    const modLoad = mods / 20;
    const score = 100 - (pluginLoad * 0.8 + playerLoad * 3 + modLoad * 2);
    return Math.max(20, Math.min(100, Math.round(score)));
  };

  const getTpsEstimate = () => {
    const score = getPerformanceScore();
    if (score >= 80) return { tps: "19-20", color: "text-green-400", status: "Excellent" };
    if (score >= 60) return { tps: "17-19", color: "text-yellow-400", status: "Good" };
    if (score >= 40) return { tps: "14-17", color: "text-orange-400", status: "Moderate" };
    return { tps: "10-14", color: "text-red-400", status: "Heavy Load" };
  };

  const getStorageEstimate = () => {
    const baseStorage = 2;
    const worldStorage = worldSizes.find(w => w.id === worldSize)?.chunks || 5000;
    const modStorage = mods * 0.05;
    const pluginStorage = (lightPlugins + mediumPlugins + heavyPlugins) * 0.02;
    return Math.ceil(baseStorage + (worldStorage / 1000) + modStorage + pluginStorage);
  };

  const handlePreset = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      setSelectedPreset(presetId);
      setPlayers(preset.players);
      setLightPlugins(preset.plugins.light);
      setMediumPlugins(preset.plugins.medium);
      setHeavyPlugins(preset.plugins.heavy);
      setMods(preset.mods);
      setWorldSize(preset.worldSize);
    }
  };

  const handleReset = () => {
    setSelectedPreset(null);
    setServerType("paper");
    setVersion("1.20");
    setPlayers(12);
    setMods(0);
    setLightPlugins(10);
    setMediumPlugins(5);
    setHeavyPlugins(0);
    setSelectedTier("auto");
    setWorldSize("medium");
    setNetworkType("standalone");
    setUseDatabase(false);
    setUseOptimizedFlags(true);
    setViewDistance(10);
  };

  const performanceScore = getPerformanceScore();
  const tpsEstimate = getTpsEstimate();
  const storageEstimate = getStorageEstimate();

  return (
    <section id="calculator" className="py-24 relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Advanced Calculator</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Server Resource </span>
            <span className="gradient-text">
              Calculator
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Get precise recommendations based on your server configuration.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Calculator Form - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 glass p-6 rounded-2xl space-y-6"
            >
              {/* Quick Presets */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">Quick Presets</span>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handlePreset(preset.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                        selectedPreset === preset.id
                          ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg glow-primary"
                          : "bg-secondary text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Server Configuration Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="w-3 h-3 text-primary" />
                    <span className="font-medium text-xs text-foreground">Server Type</span>
                  </div>
                  <select
                    value={serverType}
                    onChange={(e) => setServerType(e.target.value)}
                    className="w-full bg-secondary text-foreground px-3 py-2 rounded-xl border border-border focus:border-primary focus:outline-none transition-colors text-xs"
                  >
                    {serverTypes.map((type) => (
                      <option key={type.id} value={type.id} className="bg-card">
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <HardDrive className="w-3 h-3 text-primary" />
                    <span className="font-medium text-xs text-foreground">Version</span>
                  </div>
                  <select
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full bg-secondary text-foreground px-3 py-2 rounded-xl border border-border focus:border-primary focus:outline-none transition-colors text-xs"
                  >
                    {versions.map((v) => (
                      <option key={v.id} value={v.id} className="bg-card">
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-3 h-3 text-primary" />
                    <span className="font-medium text-xs text-foreground">World Size</span>
                  </div>
                  <select
                    value={worldSize}
                    onChange={(e) => setWorldSize(e.target.value)}
                    className="w-full bg-secondary text-foreground px-3 py-2 rounded-xl border border-border focus:border-primary focus:outline-none transition-colors text-xs"
                  >
                    {worldSizes.map((size) => (
                      <option key={size.id} value={size.id} className="bg-card">
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-3 h-3 text-primary" />
                    <span className="font-medium text-xs text-foreground">Network</span>
                  </div>
                  <select
                    value={networkType}
                    onChange={(e) => setNetworkType(e.target.value)}
                    className="w-full bg-secondary text-foreground px-3 py-2 rounded-xl border border-border focus:border-primary focus:outline-none transition-colors text-xs"
                  >
                    {networkTypes.map((net) => (
                      <option key={net.id} value={net.id} className="bg-card">
                        {net.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Main Sliders */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Players */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm text-foreground">Concurrent Players</span>
                    </div>
                    <span className="text-primary font-bold text-lg">{players}</span>
                  </div>
                  <Slider
                    value={[players]}
                    onValueChange={(value) => setPlayers(value[0])}
                    min={1}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span>
                    <span>200</span>
                  </div>
                </div>

                {/* View Distance */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm text-foreground">View Distance</span>
                    </div>
                    <span className="text-primary font-bold text-lg">{viewDistance} chunks</span>
                  </div>
                  <Slider
                    value={[viewDistance]}
                    onValueChange={(value) => setViewDistance(value[0])}
                    min={4}
                    max={32}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>4</span>
                    <span>32</span>
                  </div>
                </div>

                {/* Mods */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Puzzle className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm text-foreground">Mods Installed</span>
                    </div>
                    <span className="text-primary font-bold text-lg">{mods}</span>
                  </div>
                  <Slider
                    value={[mods]}
                    onValueChange={(value) => setMods(value[0])}
                    min={0}
                    max={300}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0</span>
                    <span>300</span>
                  </div>
                </div>

                {/* Plugins Summary */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm text-foreground">Total Plugins</span>
                    </div>
                    <span className="text-primary font-bold text-lg">{lightPlugins + mediumPlugins + heavyPlugins}</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">{lightPlugins} Light</span>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">{mediumPlugins} Medium</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded">{heavyPlugins} Heavy</span>
                  </div>
                </div>
              </div>

              {/* Toggle Options */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setUseOptimizedFlags(!useOptimizedFlags)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    useOptimizedFlags
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-secondary text-muted-foreground border border-border"
                  }`}
                >
                  <Gauge className="w-3 h-3" />
                  Optimized JVM
                </button>
                <button
                  onClick={() => setUseDatabase(!useDatabase)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    useDatabase
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-secondary text-muted-foreground border border-border"
                  }`}
                >
                  <Database className="w-3 h-3" />
                  MySQL/MariaDB
                </button>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium bg-secondary text-muted-foreground border border-border hover:border-primary/50 transition-all"
                >
                  <Settings className="w-3 h-3" />
                  {showAdvanced ? "Hide Plugins" : "Edit Plugins"}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium bg-secondary text-muted-foreground border border-border hover:border-primary/50 transition-all"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset All
                </button>
              </div>

              {/* Advanced Plugin Editor */}
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border border-primary/20 rounded-xl p-4 bg-secondary/30 overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Light Plugins <span className="text-muted">(EssentialsX, Vault, etc.)</span></span>
                          <span className="text-primary font-medium">{lightPlugins}</span>
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
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Medium Plugins <span className="text-muted">(WorldEdit, FAWE, etc.)</span></span>
                          <span className="text-primary font-medium">{mediumPlugins}</span>
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
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Heavy Plugins <span className="text-muted">(Dynmap, Citizens, etc.)</span></span>
                          <span className="text-primary font-medium">{heavyPlugins}</span>
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Recommendation Panel - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* RAM Result Card */}
              <div className="bg-gradient-to-br from-primary/20 to-accent/10 backdrop-blur-lg border border-primary/30 p-6 rounded-2xl">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MemoryStick className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground text-sm">Recommended RAM</span>
                  </div>
                  <div className="text-6xl font-bold gradient-text">
                    {recommendedRam} GB
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    Based on your server configuration
                  </p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="glass p-4 rounded-2xl space-y-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground text-sm">Performance Metrics</span>
                </div>
                
                <div className="space-y-3">
                  {/* Performance Score */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Performance Score</span>
                      <span className={`font-medium ${performanceScore >= 70 ? 'text-green-400' : performanceScore >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {performanceScore}/100
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${performanceScore}%` }}
                        className={`h-full rounded-full ${performanceScore >= 70 ? 'bg-green-500' : performanceScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      />
                    </div>
                  </div>

                  {/* TPS Estimate */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">Est. TPS</span>
                    <span className={`font-medium text-sm ${tpsEstimate.color}`}>
                      {tpsEstimate.tps} ({tpsEstimate.status})
                    </span>
                  </div>

                  {/* Storage Estimate */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">Est. Storage</span>
                    <span className="font-medium text-sm text-foreground">{storageEstimate} GB</span>
                  </div>
                </div>
              </div>

              {/* Tier Selection */}
              <div className="glass p-4 rounded-2xl">
                <span className="text-sm text-muted-foreground mb-3 block">Optimization Tier</span>
                <div className="grid grid-cols-3 gap-2">
                  {tiers.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`py-2 px-2 rounded-xl text-xs font-medium transition-all ${
                        selectedTier === tier.id
                          ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg glow-primary"
                          : "bg-secondary text-muted-foreground hover:text-foreground border border-border hover:border-primary/40"
                      }`}
                    >
                      <span className="block text-base mb-1">{tier.icon}</span>
                      {tier.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended Plan */}
              {mainPlan && (
                <div className="bg-gradient-to-b from-primary/20 to-primary/5 backdrop-blur-lg border border-primary p-5 rounded-2xl glow-primary">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-xs text-primary font-medium">BEST MATCH</span>
                  </div>
                  <h4 className="font-bold text-xl text-foreground mb-2">{mainPlan.name} Plan</h4>
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-secondary/50 rounded-lg p-2">
                      <div className="text-foreground font-semibold text-sm">{mainPlan.ram} GB</div>
                      <div className="text-muted-foreground text-[10px]">RAM</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-2">
                      <div className="text-foreground font-semibold text-sm">{mainPlan.cpu}</div>
                      <div className="text-muted-foreground text-[10px]">CPU</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-2">
                      <div className="text-foreground font-semibold text-sm">{mainPlan.storage}</div>
                      <div className="text-muted-foreground text-[10px]">Storage</div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-3xl font-bold gradient-text">
                        ₹{mainPlan.price}
                      </span>
                      <span className="text-muted-foreground text-sm">/mo</span>
                    </div>
                    <Button variant="hero">
                      Select Plan <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Breakdown Toggle */}
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full text-center text-sm text-primary hover:text-accent transition-colors flex items-center justify-center gap-1 py-2"
              >
                <Info className="w-4 h-4" />
                {showBreakdown ? "Hide" : "Show"} Calculation Breakdown
                {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Breakdown Panel */}
              <AnimatePresence>
                {showBreakdown && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="glass p-4 rounded-2xl overflow-hidden"
                  >
                    <h4 className="font-semibold text-foreground text-sm mb-3">RAM Calculation Breakdown</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base RAM</span>
                        <span className="text-foreground">{breakdown.base.toFixed(2)} GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Players ({players})</span>
                        <span className="text-foreground">+{breakdown.players.toFixed(2)} GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mods ({mods})</span>
                        <span className="text-foreground">+{breakdown.mods.toFixed(2)} GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plugins ({lightPlugins + mediumPlugins + heavyPlugins})</span>
                        <span className="text-foreground">+{breakdown.plugins.toFixed(2)} GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">View Distance ({viewDistance})</span>
                        <span className="text-foreground">+{breakdown.viewDistance.toFixed(2)} GB</span>
                      </div>
                      {useDatabase && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Database</span>
                          <span className="text-foreground">+{breakdown.database.toFixed(2)} GB</span>
                        </div>
                      )}
                      <div className="border-t border-border pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">World Size</span>
                          <span className="text-foreground">×{breakdown.worldMultiplier.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Server Type</span>
                          <span className="text-foreground">×{breakdown.serverMultiplier.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Version</span>
                          <span className="text-foreground">×{breakdown.versionMultiplier.toFixed(2)}</span>
                        </div>
                        {useOptimizedFlags && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">JVM Optimization</span>
                            <span className="text-green-400">×{breakdown.flagsMultiplier.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tier ({selectedTier})</span>
                          <span className="text-foreground">×{breakdown.tierMultiplier.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
                        <span className="text-foreground">Final Result</span>
                        <span className="text-primary">{recommendedRam} GB</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RamCalculator;
