import { createContext, useContext, useState } from "react";

export const SwitchContext = createContext();

export function SwitchProvider({ children }) {
  const [isOn, setIsOn] = useState(false);

  return (
    <SwitchContext.Provider
      value={{
        isOn,
        setIsOn,
      }}
    >
      {children}
    </SwitchContext.Provider>
  );
}

export function useSwitch() {
  return useContext(SwitchContext);
}
