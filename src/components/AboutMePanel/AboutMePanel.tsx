"use client";

import { motion } from "framer-motion";

const panelVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.3
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
};

interface AboutContent {
    missionHistory: { title: string; date: string; description: string; }[];
    trainingLog: { label: string; value: string; }[];
}

const AboutMePanel = ({ content }: { content: AboutContent }) => {
  return (
    <motion.div
      className="bg-gray-900/50 border border-cyan-400/30 rounded-lg p-8 backdrop-blur-sm"
      variants={panelVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-bold text-cyan-300 mb-4">MISSION HISTORY</h2>
        <div className="space-y-4">
          {content.missionHistory.map((item, index) => (
            <div key={index}>
              <h3 className="text-xl text-cyan-400">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.date}</p>
              <p className="mt-1 text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8">
        <h2 className="text-3xl font-bold text-cyan-300 mb-4">TRAINING LOG</h2>
        <div className="space-y-2">
          {content.trainingLog.map((item, index) => (
             <p key={index} className="text-gray-300">
                <span className="text-cyan-400 font-bold">{item.label}:</span> {item.value}
             </p>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutMePanel;
