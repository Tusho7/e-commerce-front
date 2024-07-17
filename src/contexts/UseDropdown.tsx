import { useContext } from "react";
import { DropdownContextType, DropdownContext } from "./DropDownContext";

export const UseDropdown = (): DropdownContextType => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
};
