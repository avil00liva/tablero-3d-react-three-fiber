import { createContext, useState, useContext } from "react";

const DragContext = createContext();

export const DragProvider = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  return (
    <DragContext.Provider
      value={{ isDragging, setIsDragging, draggedItem, setDraggedItem }}
    >
      {children}
    </DragContext.Provider>
  );
};

export const useDrag = () => {
  return useContext(DragContext);
};
