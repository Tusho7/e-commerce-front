import { AnimatePresence, motion } from "framer-motion";

const FloatingBubbles = () => {
  return (
    <AnimatePresence>
      {[...Array(100)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            delay: Math.random(),
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="w-4 h-4 rounded-full bg-gray-800 absolute"
          style={{
            top: Math.random() * window.innerHeight,
            left: Math.random() * window.innerWidth,
            // backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
            borderRadius: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </AnimatePresence>
  );
};

export default FloatingBubbles;
