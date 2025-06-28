import React, { useEffect, useRef } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  showConfirm?: boolean;
  onConfirm?: () => void;
  title?: string;
  variant?: "headless" | "default";
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  variant = "default",
  title,
  showConfirm,
  onConfirm,
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === dialogRef.current) onClose();
  };

  if (!isOpen) return null;

  if (variant === "headless")
    return (
      <div
        ref={dialogRef}
        onClick={handleOverlayClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        {children}
      </div>
    );

  if (variant === "default")
    return (
      <div
        ref={dialogRef}
        onClick={handleOverlayClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
          {children}
          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-sm cursor-pointer"
            >
              Close
            </button>
            {showConfirm ? (
              <button
                onClick={onConfirm}
                className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm cursor-pointer"
              >
                Confirm
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
};

export default Dialog;
