"use client";

import { useEffect, useRef } from "react";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";

const CockpitScene = () => {
  const reactCanvas = useRef(null);

  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(reactCanvas.current, true);
      const scene = new Scene(engine);

      const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, Vector3.Zero(), scene);
      camera.attachControl(reactCanvas.current, true);

      const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
      light.intensity = 0.7;

      // Placeholder for the cockpit model
      const cockpitSphere = MeshBuilder.CreateSphere("cockpitSphere", { diameter: 30, segments: 32 }, scene);
      const cockpitMaterial = new StandardMaterial("cockpitMaterial", scene);
      cockpitMaterial.diffuseColor = new Color3(0.2, 0.2, 0.2); // Dark metallic color
      cockpitMaterial.specularColor = new Color3(0.5, 0.5, 0.5);
      cockpitMaterial.emissiveColor = new Color3(0.1, 0.1, 0.2); // Faint blue glow
      cockpitSphere.material = cockpitMaterial;
      cockpitSphere.scaling.y = 0.5; // Flatten it a bit

      // Placeholder for the dynamic background (e.g., stars)
      const starfield = MeshBuilder.CreateSphere("starfield", { diameter: 100, segments: 64 }, scene);
      const starfieldMaterial = new StandardMaterial("starfieldMaterial", scene);
      starfieldMaterial.diffuseColor = new Color3(0, 0, 0);
      starfieldMaterial.emissiveColor = new Color3(0.8, 0.8, 1); // Bright stars
      starfieldMaterial.specularColor = new Color3(0, 0, 0);
      starfieldMaterial.disableLighting = true; // Stars should not be lit
      starfield.material = starfieldMaterial;
      starfield.material.backFaceCulling = false; // Render inside of the sphere

      engine.runRenderLoop(() => {
        scene.render();
      });

      const handleResize = () => {
        engine.resize();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        engine.dispose();
      };
    }
  }, []);

  return (
    <canvas ref={reactCanvas} className="w-full h-full block" />
  );
};

export default CockpitScene;
