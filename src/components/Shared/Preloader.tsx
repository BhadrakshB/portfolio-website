"use client";

import { useEffect, useState } from "react";
import anime from "animejs";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [loadingText, setLoadingText] = useState("SYSTEM BOTIS...");

  useEffect(() => {
    const texts = ["SYSTEM BOOTING...", "CALIBRATING NEURAL LINK...", "LOADING ASSETS..."];
    let textIndex = 0;

    const textElement = document.querySelector(".loading-text");

    const tl = gsap.timeline({
      onComplete: () => {
        // Glitch effect and fade out
        gsap.to(".preloader", {
          duration: 0.3,
          opacity: 0,
          ease: "power2.inOut",
          onComplete: onComplete,
        });
      },
    });

    // Placeholder for Lottie Animation
    tl.to(".lottie-placeholder", { duration: 1.5, opacity: 1 });

    // Text animations
    texts.forEach((text, index) => {
      tl.add(() => {
        if (textElement) {
          textElement.innerHTML = ""; // Clear previous text
          anime({
            targets: textElement,
            innerHTML: text.split("").map(char => (char === ' ' ? '&nbsp;' : char)),
            easing: "easeInOutQuad",
            duration: 1500,
            delay: anime.stagger(50),
          });
        }
      }, `+=${index > 0 ? 0.5 : 0}`);
    });

    // Progress bar animation
    tl.to(".progress-bar-inner", {
      duration: 4.5,
      width: "100%",
      ease: "linear",
    }, 0); // Start at the beginning of the timeline

  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 bg-black flex flex-col items-center justify-center z-50 text-white">
      <div className="lottie-placeholder w-64 h-64 bg-gray-800 border-2 border-cyan-400 rounded-full mb-8 flex items-center justify-center">
        <p className="text-cyan-400">[LOTTIE ANIMATION]</p>
      </div>
      <p className="loading-text text-2xl font-mono text-cyan-300" aria-live="polite"></p>
      <div className="progress-bar w-1/2 mt-4 bg-gray-700 h-2">
        <div className="progress-bar-inner h-full bg-cyan-400"></div>
      </div>
    </div>
  );
};

export default Preloader;
