"use client";

import { useScroll, Html, Text, Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { Laptop } from "./Laptop";

// Define custom 3D Text component
function PortfolioSection({ position, title, subtitle, tech, highlight }: { position: [number, number, number], title: string, subtitle: string, tech: string, highlight?: string }) {
  const groupRef = useRef<THREE.Group>(null);

  // Floating animation for each section
  useFrame((state) => {
    if (groupRef.current) {
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 1.2, 0]}
          fontSize={0.8}
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
        >
          {title}
        </Text>
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.4}
          color="#f3f4f6"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
        >
          {subtitle}
        </Text>
        {highlight && (
           <Text
            position={[0, -0.3, 0]}
            fontSize={0.25}
            color="#60a5fa"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
            textAlign="center"
          >
            {highlight}
          </Text>
        )}
        <Text
          position={[0, -1.0, 0]}
          fontSize={0.2}
          color="#9ca3af"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
        >
          {tech}
        </Text>
      </Float>
    </group>
  );
}

export function LaptopScene() {
  const scroll = useScroll();
  const { camera } = useThree();
  const laptopGroupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Scroll ranges for animation sequencing
    const r1 = scroll.range(0, 1 / 5); // Open laptop
    const r2 = scroll.range(1 / 5, 1 / 5); // Zoom into screen
    const r3 = scroll.range(2 / 5, 1 / 5); // Transition past laptop
    const r4 = scroll.range(3 / 5, 2 / 5); // Fly through projects

    // Laptop screen stays open
    if (screenRef.current) {
      screenRef.current.rotation.x = THREE.MathUtils.damp(
        screenRef.current.rotation.x,
        -0.1,
        4,
        delta
      );
    }

    // Camera Z position: Start at 5, move forward as we scroll
    // r1: zoom into screen
    // r2: move past screen
    // r3, r4: fly through projects
    const targetZ = 5 - (r1 * 4) - (r2 * 8) - (r3 * 20) - (r4 * 40);
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      4,
      delta
    );

    // Camera Y position
    const targetY = 1.5 - (r2 * 0.5) - (r3 * 1) - (r4 * 2);
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetY,
      4,
      delta
    );

    // Fade out laptop slightly when moving past it
    if (laptopGroupRef.current) {
        laptopGroupRef.current.position.y = THREE.MathUtils.damp(
            laptopGroupRef.current.position.y,
            -1.5 - (r3 * 10), // Drop laptop down aggressively as we fly over
            4,
            delta
        );
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />

      {/* Laptop Group */}
      <group ref={laptopGroupRef} position={[0, -1.5, 0]}>
        <Laptop ref={screenRef}>
          <Html
            transform
            wrapperClass="laptop-screen"
            distanceFactor={1.5}
            position={[0, 0, 0.01]}
          >
            <div className="w-[820px] h-[530px] bg-zinc-900 rounded-lg overflow-hidden flex flex-col p-8 pt-12 items-center justify-center text-white border-2 border-zinc-800 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-8 bg-zinc-800/80 backdrop-blur-md flex items-center px-4 space-x-2 rounded-t-lg">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <h1 className="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Welcome to my portfolio
              </h1>

              <div className="w-[500px] h-16 bg-zinc-800 rounded-full flex items-center px-6 shadow-inner ring-1 ring-zinc-700">
                <svg className="w-6 h-6 text-zinc-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input
                  type="text"
                  readOnly
                  value="Merugu Akhila"
                  className="bg-transparent border-none outline-none text-2xl text-white w-full placeholder-zinc-500"
                />
              </div>

              <p className="mt-8 text-xl text-zinc-400 max-w-lg text-center leading-relaxed">
                Full Stack Developer | React · FastAPI · Node.js · MongoDB
              </p>
              <div className="mt-8 flex gap-4 text-sm text-zinc-500 animate-pulse">
                <span>Scroll down to open & explore</span>
                <span>↓</span>
              </div>
            </div>
          </Html>
        </Laptop>
      </group>

      {/* 3D Project Navigation path in space (spaced out along negative Z) */}
      <PortfolioSection
        position={[-4, 2, -10]}
        title="Little Hearts Foundation"
        subtitle="Non-Profit Website"
        highlight="→ Razorpay Checkout via UPI, card & wallets"
        tech="HTML · Bootstrap · Node.js · Razorpay · Hostinger"
      />

      <PortfolioSection
        position={[4, -1, -22]}
        title="Dating Web App"
        subtitle="Zero to production solo project"
        highlight="→ Card-based swiping & Real-time match notifications"
        tech="React.js · Node.js · MongoDB · Socket.IO"
      />

      <PortfolioSection
        position={[-5, 1, -34]}
        title="ENV Safe Solutions"
        subtitle="Environmental Services Website"
        highlight="→ Deployed on GoDaddy to establish brand credibility"
        tech="HTML · Bootstrap · Tailwind CSS"
      />

      <PortfolioSection
        position={[5, 0, -46]}
        title="Tradotsav"
        subtitle="SEBI Registered Stock Advisor Platform"
        highlight="→ Trust-focused, compliance-friendly UI"
        tech="React.js · HTML · CSS · Bootstrap"
      />

      <PortfolioSection
        position={[0, 1, -58]}
        title="ShowTime Consulting"
        subtitle="Employee Portal & Social Media Analytics"
        highlight="→ JWT auth, RBAC, Real-time chat, AWS Backend"
        tech="React.js · FastAPI · MongoDB · Socket.IO · AWS"
      />
    </>
  );
}
