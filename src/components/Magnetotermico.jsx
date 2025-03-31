import { useGLTF } from "@react-three/drei";

export function Magnetotermico({ position }) {
  const { scene } = useGLTF("/src/assets/magnetotermico.glb");
  return (
    <primitive
      object={scene.clone()}
      position={position}
      scale={[1.2, 1.2, 0.5]}
    />
  );
}
