import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const loadingTips = [
  "Preparing your gaming experience...",
  "Initializing high-performance servers...",
  "Loading DDoS protection systems...",
  "Setting up your control panel...",
  "Almost ready to dominate...",
];

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 150);

    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % loadingTips.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(tipInterval);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500/50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Glow Effects */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-600/20 blur-[100px]"
        />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-orange-500/10 blur-[80px]" />

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Animated Ring */}
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20px] rounded-full border-2 border-dashed border-red-500/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-35px] rounded-full border border-dashed border-orange-500/20"
            />

            {/* Logo Icon */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-[0_0_80px_rgba(220,38,38,0.5)]">
                <Flame className="w-14 h-14 text-white" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-2 -right-2"
              >
                <Zap className="w-8 h-8 text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
              </motion.div>
            </motion.div>
          </div>

          {/* Logo Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-5xl font-bold mb-2"
          >
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-red-500 bg-clip-text text-transparent">
              FrictionHost
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-zinc-500 text-sm mb-10"
          >
            Premium Game Hosting
          </motion.p>

          {/* Progress Bar Container */}
          <div className="w-80 mb-4">
            <div className="flex justify-between text-xs text-zinc-500 mb-2">
              <span>Loading</span>
              <span>{Math.min(Math.round(progress), 100)}%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-full"
                style={{ backgroundSize: "200% 100%" }}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(progress, 100)}%`,
                  backgroundPosition: ["0% 0%", "100% 0%"],
                }}
                transition={{
                  width: { duration: 0.3 },
                  backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
                }}
              />
            </div>
          </div>

          {/* Loading Tips */}
          <div className="h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={tipIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-400 text-sm text-center"
              >
                {loadingTips[tipIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom Brand */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 text-zinc-600 text-xs"
        >
          Powered by High-Performance Ryzen CPUs
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
