"use client";

import { useState } from "react";
import Preloader from "@/components/Shared/Preloader";
import CockpitScene from "@/components/CockpitUI/CockpitScene";
import NavigationControls from "@/components/CockpitUI/NavigationControls";
import anime from "animejs";
import { useEffect } from "react";

const AnimatedHeadline = () => {
  useEffect(() => {
    anime({
      targets: ".headline-char",
      translateY: [100, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1400,
      delay: anime.stagger(50),
    });
  }, []);

  const text = "PILOTING DIGITAL FRONTIERS";
  return (
    <h1 className="text-6xl font-bold text-cyan-300 uppercase" aria-label={text}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="headline-char inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
};

const HudDisplay = ({ label, value }: { label: string; value: string }) => (
  <div className="font-mono text-cyan-400 border border-cyan-400/50 p-2">
    <span className="text-sm opacity-75">{label}: </span>
    <span className="text-lg">{value}</span>
  </div>
);


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <Preloader onComplete={handleLoadingComplete} />
      ) : (
        <main className="relative w-screen h-screen overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <CockpitScene />
          </div>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
            <AnimatedHeadline />
            <p className="text-xl text-cyan-200 mt-4">
              FORGING INDUSTRY-GRADE EXPERIENCES
            </p>
          </div>
          <div className="absolute top-5 left-5 z-10">
             <HudDisplay label="SYSTEM STATUS" value="ONLINE" />
          </div>
           <div className="absolute top-5 right-5 z-10">
             <HudDisplay label="THREAT LEVEL" value="NOMINAL" />
          </div>
          <NavigationControls />
        </main>
      )}
    </div>
  );
}
