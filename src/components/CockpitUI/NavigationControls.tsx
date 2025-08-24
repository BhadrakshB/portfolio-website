"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: {
    scale: 1.1,
    boxShadow: "0 0 15px rgba(0, 255, 255, 0.7)",
    textShadow: "0 0 8px rgba(0, 255, 255, 0.7)",
  },
  tap: { scale: 0.95 },
};

const NavigationControls = () => {
  const navLinks = [
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="absolute bottom-10 right-10 z-20">
      <ul className="flex flex-col items-end gap-4">
        {navLinks.map((link, index) => (
          <motion.li
            key={link.href}
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: 1 + index * 0.2, type: "spring", stiffness: 300 }}
          >
            <Link href={link.href}
              className="px-6 py-2 font-mono text-lg text-cyan-300 uppercase bg-black/50 border-2 border-cyan-400/50 rounded-md backdrop-blur-sm transition-colors duration-300 hover:bg-cyan-400/10"
            >
              {link.name}
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationControls;
