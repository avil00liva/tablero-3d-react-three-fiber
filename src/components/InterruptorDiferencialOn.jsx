import { useGLTF } from "@react-three/drei";
import { useSwitch } from "../../SwitchContext";

export function InterruptorDiferencialOn({ position }) {
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
