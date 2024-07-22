import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import ReactDOM from "react-dom";
import { DropdownProps } from "../../types/dropDown";

const Dropdown: React.FC<DropdownProps> = ({
  onEdit,
  onDelete,
  onBlock,
  isBlocked,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updatePosition = useCallback(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 80,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [updatePosition]);

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, updatePosition]);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="py-2 px-4 bg-blue-500 text-white rounded-md"
      >
        Actions
      </button>
      {isOpen &&
        position &&
        ReactDOM.createPortal(
          <div
            style={{ top: position.top, left: position.left }}
            className="absolute w-48 bg-slate-500 text-white rounded-lg right-28"
          >
            <ul className="py-1">
              <li
                onClick={() => {
                  onEdit();
                  handleClose();
                }}
                className="block px-4 py-2 hover:bg-slate-700 cursor-pointer"
              >
                Edit User
              </li>
              <li
                onClick={() => {
                  onDelete();
                  handleClose();
                }}
                className="block px-4 py-2 hover:bg-slate-700 cursor-pointer"
              >
                Delete User
              </li>
              <li
                onClick={() => {
                  onBlock();
                  handleClose();
                }}
                className="block px-4 py-2 hover:bg-slate-700 cursor-pointer"
              >
                {isBlocked ? "Unblock User" : "Block User"}
              </li>
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Dropdown;
