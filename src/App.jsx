import React, { useState } from "react";
import { SwitchProvider } from "../SwitchContext";
import { Scene } from "./components/Scene";
import { DragProvider } from "../DragContext";

export default function App() {
  const [show, setShow] = useState(false);

  const showMenu = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <SwitchProvider>
      <DragProvider>
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
      </DragProvider>
    </SwitchProvider>
  );
}
