import { useGLTF } from "@react-three/drei";
import { useDrag } from "../../DragContext";

export function Magnetotermico({ position }) {
  const { setDraggedItem } = useDrag();
  const { scene } = useGLTF("/src/assets/magnetotermico.glb");
  return (
    <primitive
      object={scene.clone()}
      position={position}
      scale={[1.2, 1.2, 0.5]}
      onPointerDown={(e) => {
        e.stopPropagation();
        setDraggedItem("magnetotermico");
      }}
    />
  );
}
