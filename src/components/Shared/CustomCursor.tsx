"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 12, // Center the cursor
      y: mousePosition.y - 12,
      transition: {
        type: "spring",
        stiffness: 800,
        damping: 40,
      },
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 border-2 border-cyan-400 rounded-full pointer-events-none z-50"
      variants={cursorVariants}
      animate="default"
    >
        <div className="absolute w-1 h-6 top-[-10px] left-[9px] bg-cyan-400"></div>
        <div className="absolute h-1 w-6 left-[-10px] top-[9px] bg-cyan-400"></div>
    </motion.div>
  );
};

export default CustomCursor;
