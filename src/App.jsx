import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { SwitchProvider, useSwitch } from "../SwitchContext";
import Tablero from "./components/Tablero";

/* function Tablero() {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -5]}>
        <boxGeometry args={[10, 1, 0.5]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
} */

function InterruptorDiferencialOn({ position }) {
  const { setIsOn } = useSwitch();
  const { scene } = useGLTF("/src/assets/interruptor_diferencial_on.glb");
  return (
    <primitive
      onClick={() => setIsOn((prevState) => !prevState)}
      object={scene.clone()}
      position={position}
      rotation={[-0.02, 0.08, -0.005]}
      scale={[1.2, 1.2, 0.95]}
    />
  );
}

function InterruptorDiferencial({ position }) {
  const { isOn, setIsOn } = useSwitch();
  const { scene: offModel } = useGLTF(
    "/src/assets/interruptor_diferencial.glb"
  );
  const { scene: onModel } = useGLTF(
    "/src/assets/interruptor_diferencial_on.glb"
  );
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.clear();
      const newModel = offModel.clone();
      modelRef.current.add(newModel);
    }
  }, [isOn, onModel, offModel]);

  return (
    <group
      ref={modelRef}
      position={position}
      scale={[1.2, 1.2, 1]}
      onClick={() => setIsOn((prev) => !prev)}
      style={{ cursor: "pointer" }}
    />
  );
}

function Magnetotermico({ position }) {
  const { scene } = useGLTF("/src/assets/magnetotermico.glb");
  return (
    <primitive
      object={scene.clone()}
      position={position}
      scale={[1.2, 1.2, 0.5]}
    />
  );
}

function Scene() {
  const groupRef = useRef();
  const { isOn } = useSwitch();

  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
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

        {isOn ? (
          <InterruptorDiferencialOn position={[-3, 0, -4.5]} />
        ) : (
          <InterruptorDiferencial position={[-3, 0, -4.5]} />
        )}
        <Magnetotermico position={[-1, 0, -4.5]} />
        <Magnetotermico position={[1, 0, -4.5]} />
        <Magnetotermico position={[3, 0, -4.5]} />
      </group>
      <OrbitControls enablePan={false} enableZoom={true} target={[0, 0, -5]} />
    </Canvas>
  );
}

export default function App() {
  const [show, setShow] = useState(false);

  const showMenu = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <SwitchProvider>
      <section
        className="bg-[#1a1a1a] py-8 relative overflow-y-hidden"
        style={{ width: "100vw", height: "100vh" }}
      >
        <button
          onClick={showMenu}
          className="bg-orange-700 text-black rounded-lg cursor-pointer ml-2 mt-2 px-4 py-3 font-bold transition-opacity hover:opacity-70"
        >
          Ver materiales
        </button>
        {
          <div
            className={`absolute top-4 left-0 min-w-52 h-[calc(100%-2rem)] rounded-2xl border-amber-500 border-2 p-2 bg-black z-50 ${
              !show ? "-translate-x-full" : ""
            } transition-transform duration-300 flex justify-center items-start`}
          >
            <button
              onClick={showMenu}
              className="bg-orange-700 text-black rounded-lg cursor-pointer px-4 py-3 font-bold transition-opacity hover:opacity-70"
            >
              Esconder menu
            </button>
          </div>
        }
        <Scene />
      </section>
    </SwitchProvider>
  );
}
