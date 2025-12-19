import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const CursorGlow = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div
        className="w-[300px] h-[300px] rounded-full opacity-35"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(168,85,247,0.15) 40%, transparent 70%)",
        }}
      />
    </motion.div>
  );
};

export default CursorGlow;
