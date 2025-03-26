import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Tablero() {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0; // Rotación controlada si se desea
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -5]}>
        <boxGeometry args={[10, 2.5, 0.5]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

function InterruptorDiferencial({ position }) {
  const { scene } = useGLTF("/src/assets/interruptor_diferencial.glb");
  return <primitive object={scene.clone()} position={position} scale={1.2} />;
}

function Magnetotermico({ position }) {
  const { scene } = useGLTF("/src/assets/magnetotermico.glb");
  return <primitive object={scene.clone()} position={position} scale={1} />;
}

function Scene() {
  const groupRef = useRef();

  return (
    <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight
        position={[-4, 0.4, -3]}
        intensity={100.5}
        color="#ff8303"
        distance={8}
      />
      <group ref={groupRef}>
        <Tablero />
        <InterruptorDiferencial position={[-3, 0, -4.5]} />
        <Magnetotermico position={[-1, 0, -4.5]} />
        <Magnetotermico position={[1, 0, -4.5]} />
        <Magnetotermico position={[3, 0, -4.5]} />
      </group>
      <OrbitControls enablePan={false} enableZoom={true} target={[0, 0, -5]} />
    </Canvas>
  );
}

export default function App() {
  return (
    <div className="bg-[#1a1a1a]" style={{ width: "100vw", height: "100vh" }}>
      <Scene />
    </div>
  );
}
