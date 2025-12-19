import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #ef4444 0%, #f97316 50%, #ef4444 100%)",
        boxShadow: "0 0 10px rgba(239,68,68,0.5), 0 0 20px rgba(239,68,68,0.3)",
      }}
    />
  );
};

export default ScrollProgress;
