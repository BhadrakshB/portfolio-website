"use client";

import { useEffect, useRef, useState } from "react";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Color3, Color4, Mesh } from "@babylonjs/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<Worker>();
  const [isPhysicsReady, setIsPhysicsReady] = useState(false);

  // Babylon.js scene setup & Worker Initialization
  useEffect(() => {
    if (canvasRef.current) {
      const engine = new Engine(canvasRef.current, true);
      const scene = new Scene(engine);
      scene.clearColor = new Color4(0, 0, 0, 0);

      const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
      camera.attachControl(canvasRef.current, false);

      const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
      light.intensity = 1;

      const kaiju = MeshBuilder.CreateIcoSphere("kaiju", { radius: 1.5, subdivisions: 3 }, scene);
      const kaijuMaterial = new StandardMaterial("kaijuMaterial", scene);
      kaijuMaterial.diffuseColor = new Color3(0.8, 0.2, 0.2);
      kaijuMaterial.emissiveColor = new Color3(0.4, 0.1, 0.1);
      kaiju.material = kaijuMaterial;

      const debrisMeshes: Mesh[] = [];
      const debrisMaterial = new StandardMaterial("debrisMat", scene);
      debrisMaterial.diffuseColor = new Color3(0, 1, 1);
      debrisMaterial.emissiveColor = new Color3(0, 0.5, 0.5);

      const NUM_DEBRIS = 4 * 4 * 4;
      for (let i = 0; i < NUM_DEBRIS; i++) {
          const debris = MeshBuilder.CreateSphere(`debris_${i}`, { diameter: 0.2 }, scene);
          debris.material = debrisMaterial;
          debris.isVisible = false;
          debrisMeshes.push(debris);
      }

      workerRef.current = new Worker('/physics.worker.js');
      workerRef.current.onmessage = (event) => {
          const { type, positions } = event.data;
          if (type === 'initialized') {
              setIsPhysicsReady(true);
          }
          if (type === 'positions') {
              for (let i = 0; i < NUM_DEBRIS; i++) {
                  if (debrisMeshes[i]) {
                      debrisMeshes[i].isVisible = true;
                      debrisMeshes[i].position.set(
                          positions[i * 3 + 0],
                          positions[i * 3 + 1],
                          positions[i * 3 + 2]
                      );
                  }
              }
          }
      };
      workerRef.current.postMessage({ type: 'init' });

      engine.runRenderLoop(() => {
        kaiju.rotation.y += 0.01;
        scene.render();
      });

      const handleResize = () => engine.resize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        workerRef.current?.terminate();
        engine.dispose();
      };
    }
  }, []);

  // GSAP ScrollTrigger animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        }
      );
    }
  }, []);

  const handleTriggerEffect = () => {
      if (isPhysicsReady) {
          workerRef.current?.postMessage({ type: 'triggerEffect' });
      }
  };

  return (
    <div ref={cardRef} className="bg-gray-900/50 border border-cyan-400/30 rounded-lg p-6 flex flex-col backdrop-blur-sm">
      <div className="h-64 mb-4">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <h3 className="text-2xl font-bold text-cyan-300">{project.title}</h3>
      <p className="text-sm uppercase text-cyan-400/70">{project.category}</p>
      <p className="mt-2 text-gray-300 flex-grow">{project.description}</p>
      <button
        onClick={handleTriggerEffect}
        disabled={!isPhysicsReady}
        className="mt-4 px-4 py-2 bg-cyan-500/80 hover:bg-cyan-500 text-black font-bold rounded-md transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isPhysicsReady ? 'VIEW REPORT (Click for Effect)' : 'Physics Loading...'}
      </button>
    </div>
  );
};

export default ProjectCard;
