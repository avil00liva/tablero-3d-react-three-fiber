import { useRef } from "react";
import { useSwitch } from "../../SwitchContext";
import { Canvas } from "@react-three/fiber";
import Tablero from "./Tablero";
import { InterruptorDiferencialOn } from "./InterruptorDiferencialOn";
import { Magnetotermico } from "./Magnetotermico";
import { OrbitControls } from "@react-three/drei";

export function Scene() {
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
          <InterruptorDiferencialOn position={[-3, 0, -4.5]} />
        )}
        <Magnetotermico position={[-1, 0, -4.5]} />
        <Magnetotermico position={[1, 0, -4.5]} />
        <Magnetotermico position={[3, 0, -4.5]} />
      </group>
      <OrbitControls enablePan={false} enableZoom={true} target={[0, 0, -5]} />
    </Canvas>
  );
}
