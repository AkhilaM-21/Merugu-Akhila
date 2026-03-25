"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    const arr = [];
    const geometries = [
      new THREE.IcosahedronGeometry(1),
      new THREE.TorusGeometry(0.8, 0.3, 16, 32),
      new THREE.OctahedronGeometry(1),
      new THREE.DodecahedronGeometry(0.8)
    ];

    // Create random positions and types for shapes
    for (let i = 0; i < 15; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10 - 5
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ] as [number, number, number],
        geometry: geometries[Math.floor(Math.random() * geometries.length)],
        scale: Math.random() * 0.5 + 0.3,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {shapes.map((shape, i) => (
        <Float
          key={i}
          speed={1.5 + Math.random()}
          rotationIntensity={1.5 + Math.random()}
          floatIntensity={1.5 + Math.random()}
        >
          <mesh
            position={shape.position}
            rotation={shape.rotation}
            scale={shape.scale}
            geometry={shape.geometry}
          >
            <meshStandardMaterial
              color={new THREE.Color().setHSL(Math.random() * 0.1 + 0.8, 0.6, 0.7)} // Plum/Pinkish tones
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <FloatingShapes />
      <Environment preset="city" />
      <ContactShadows position={[0, -10, 0]} opacity={0.5} scale={50} blur={2} far={10} />
    </Canvas>
  );
}