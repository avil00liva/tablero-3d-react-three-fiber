import { useGLTF } from "@react-three/drei";
import { useSwitch } from "../../SwitchContext";
import { useEffect, useRef } from "react";

export function InterruptorDiferencial({ position }) {
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
