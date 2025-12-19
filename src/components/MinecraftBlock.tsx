import { motion } from "framer-motion";

interface MinecraftBlockProps {
  topColor: string;
  sideColor: string;
  frontColor: string;
  size?: number;
  className?: string;
  animate?: {
    y?: number[];
    x?: number[];
    rotateY?: number[];
    rotateX?: number[];
    scale?: number[];
  };
  duration?: number;
  glowColor?: string;
  children?: React.ReactNode;
}

const MinecraftBlock = ({
  topColor,
  sideColor,
  frontColor,
  size = 50,
  className = "",
  animate = { y: [-20, 20, -20], rotateY: [0, 360] },
  duration = 8,
  glowColor,
  children,
}: MinecraftBlockProps) => {
  const halfSize = size / 2;

  return (
    <motion.div
      animate={animate}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
        filter: glowColor ? `drop-shadow(0 0 20px ${glowColor})` : undefined,
      }}
    >
      {/* Front face */}
      <div
        className="absolute w-full h-full flex items-center justify-center"
        style={{
          background: frontColor,
          transform: `translateZ(${halfSize}px)`,
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </div>
      
      {/* Back face */}
      <div
        className="absolute w-full h-full"
        style={{
          background: sideColor,
          transform: `translateZ(-${halfSize}px) rotateY(180deg)`,
          backfaceVisibility: "hidden",
        }}
      />
      
      {/* Left face */}
      <div
        className="absolute w-full h-full"
        style={{
          background: sideColor,
          transform: `translateX(-${halfSize}px) rotateY(-90deg)`,
          backfaceVisibility: "hidden",
        }}
      />
      
      {/* Right face */}
      <div
        className="absolute w-full h-full"
        style={{
          background: sideColor,
          transform: `translateX(${halfSize}px) rotateY(90deg)`,
          backfaceVisibility: "hidden",
        }}
      />
      
      {/* Top face */}
      <div
        className="absolute w-full h-full"
        style={{
          background: topColor,
          transform: `translateY(-${halfSize}px) rotateX(90deg)`,
          backfaceVisibility: "hidden",
        }}
      />
      
      {/* Bottom face */}
      <div
        className="absolute w-full h-full"
        style={{
          background: sideColor,
          transform: `translateY(${halfSize}px) rotateX(-90deg)`,
          backfaceVisibility: "hidden",
        }}
      />
    </motion.div>
  );
};

export default MinecraftBlock;
