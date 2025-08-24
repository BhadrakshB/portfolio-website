"use client";

import { useEffect, useRef } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Color4,
  ActionManager,
  ExecuteCodeAction
} from "@babylonjs/core";

const JaegerConfigurator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new Engine(canvasRef.current, true);
      const scene = new Scene(engine);
      scene.clearColor = new Color4(0,0,0,0); // Transparent background

      const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, Vector3.Zero(), scene);
      camera.attachControl(canvasRef.current, true);
      camera.lowerRadiusLimit = 10;
      camera.upperRadiusLimit = 30;

      const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
      light.intensity = 1;

      const createJaegerPart = (name: string, mesh: any, material: StandardMaterial) => {
        mesh.material = material;
        mesh.actionManager = new ActionManager(scene);

        let originalColor = material.emissiveColor.clone();

        // Glow effect on hover
        mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, () => {
            material.emissiveColor = new Color3(0.0, 1.0, 1.0); // Cyan glow
          })
        );

        // Return to normal on hover out
        mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, () => {
            material.emissiveColor = originalColor;
          })
        );

        // Log on click (placeholder for 'upgrade' animation)
        mesh.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
            console.log(`${name} clicked!`);
            // Here you would trigger the GSAP/Rapier animations
          })
        );
        return mesh;
      }

      // Create materials
      const bodyMaterial = new StandardMaterial("bodyMat", scene);
      bodyMaterial.diffuseColor = new Color3(0.4, 0.4, 0.5); // Grey metal
      bodyMaterial.specularColor = new Color3(0.8, 0.8, 0.9);
      bodyMaterial.emissiveColor = new Color3(0.1, 0.1, 0.2);

      const headMaterial = new StandardMaterial("headMat", scene);
      headMaterial.diffuseColor = new Color3(0.6, 0.6, 0.7);
      headMaterial.specularColor = new Color3(0.8, 0.8, 0.9);
      headMaterial.emissiveColor = new Color3(0.1, 0.1, 0.2);

      // Create parts
      const torso = MeshBuilder.CreateBox("torso", { width: 4, height: 5, depth: 2 }, scene);
      torso.position.y = 0;
      createJaegerPart("Torso (Backend Skills)", torso, bodyMaterial.clone("torsoMat"));

      const head = MeshBuilder.CreateSphere("head", { diameter: 2.5 }, scene);
      head.position.y = 4;
      createJaegerPart("Head (Frontend Skills)", head, headMaterial.clone("headMat"));

      const leftArm = MeshBuilder.CreateCylinder("leftArm", { height: 4, diameter: 1 }, scene);
      leftArm.position = new Vector3(-3, 1, 0);
      createJaegerPart("Left Arm (DevOps)", leftArm, bodyMaterial.clone("leftArmMat"));

      const rightArm = MeshBuilder.CreateCylinder("rightArm", { height: 4, diameter: 1 }, scene);
      rightArm.position = new Vector3(3, 1, 0);
      createJaegerPart("Right Arm (Databases)", rightArm, bodyMaterial.clone("rightArmMat"));

      engine.runRenderLoop(() => {
        scene.render();
      });

      const handleResize = () => engine.resize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        engine.dispose();
      };
    }
  }, []);

  return (
    <div className="h-96 lg:h-[500px] border border-cyan-400/30 p-2 rounded-lg bg-black/30">
        <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default JaegerConfigurator;
