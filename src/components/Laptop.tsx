"use client";

import React, { forwardRef } from "react";
import * as THREE from "three";

// Procedural Laptop using basic Three.js shapes
export const Laptop = forwardRef<THREE.Group, React.ComponentProps<'group'>>((props, ref) => {
  return (
    <group {...props}>
      {/* Laptop Base */}
      <group position={[0, -0.05, 0]}>
        {/* Main Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.1, 2.4]} />
          <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Keyboard Indentation */}
        <mesh position={[0, 0.051, -0.2]} receiveShadow>
          <boxGeometry args={[2.8, 0.01, 1.2]} />
          <meshStandardMaterial color="#111111" />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, 0.051, 0.7]} receiveShadow>
          <boxGeometry args={[1, 0.01, 0.7]} />
          <meshStandardMaterial color="#181818" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Laptop Screen / Lid (Hinged at the back) */}
      {/* Start Open: rotation X = -0.1 */}
      <group position={[0, 0, -1.2]} ref={ref} rotation={[Math.PI / 2, 0, 0]}>
        {/* The Lid rotates around this hinge */}
        <group position={[0, 1.1, 0]}>
          {/* Lid outer shell */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[3.2, 2.2, 0.05]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Screen Inner Bezel */}
          <mesh position={[0, 0, 0.026]}>
            <boxGeometry args={[3.15, 2.15, 0.01]} />
            <meshStandardMaterial color="#000000" />
          </mesh>

          {/* Screen Display Area (where HTML will be attached) */}
          <mesh position={[0, 0, 0.032]}>
            <planeGeometry args={[3.05, 2.05]} />
            <meshBasicMaterial color="#000000" />
            {/* Attach children here (the Html component) */}
            <group position={[0, 0, 0.01]}>
              {props.children}
            </group>
          </mesh>
        </group>
      </group>
    </group>
  );
});

Laptop.displayName = "Laptop";
