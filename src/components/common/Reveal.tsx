import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
};

const offsets = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 50, y: 0 },
  right: { x: -50, y: 0 },
  none: { x: 0, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: RevealProps) {
  const { x, y } = offsets[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;