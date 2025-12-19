import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const TextReveal = ({ children, className = "", delay = 0 }: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  if (typeof children !== "string") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, rotateX: 0 }
              : { opacity: 0, y: 20, rotateX: -90 }
          }
          transition={{
            duration: 0.5,
            delay: delay + index * 0.05,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export default TextReveal;
