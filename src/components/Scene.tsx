"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Environment, ContactShadows } from "@react-three/drei";
import { LaptopScene } from "./LaptopScene";
import React, { Suspense } from "react";

export default function Scene() {
  return (
    <div className="w-full h-screen bg-neutral-900">
      <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
        <color attach="background" args={["#171717"]} />
        <fog attach="fog" args={["#171717", 5, 15]} />
        <ambientLight intensity={0.5} />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.1}>
            <LaptopScene />
          </ScrollControls>
        </Suspense>

        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={4} />
      </Canvas>
    </div>
  );
}
