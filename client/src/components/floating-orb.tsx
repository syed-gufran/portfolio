import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/use-mouse-position";

export function FloatingOrb() {
  const mousePosition = useMousePosition();

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      animate={{
        x: mousePosition.x - 10,
        y: mousePosition.y - 10,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      <div className="w-5 h-5 rounded-full bg-gradient-radial from-blue-400/80 to-blue-400/20 shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
    </motion.div>
  );
}
