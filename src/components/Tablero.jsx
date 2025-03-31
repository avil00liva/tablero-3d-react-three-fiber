import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { useDrag } from "../../DragContext";

const Tablero = () => {
  const { draggedItem, setDraggedItem } = useDrag();
  const groupRef = useRef();
  const { scene: cajaEstanca } = useGLTF("/src/assets/models/caja_estanca.glb");

  const handleDrop = (e) => {
    if (draggedItem) {
      console.log(`Soltaste ${draggedItem} en el tablero!`);
      setDraggedItem(null);
    }
  };

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0;
    }
  });

  return (
    <group ref={groupRef} onPointerUp={handleDrop}>
      <mesh position={[0, 0, -5]}>
        <primitive object={cajaEstanca.clone()} scale={[4, 2, 2.8]} />
        <boxGeometry args={[7, 1, 0.5]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
};

export default Tablero;
