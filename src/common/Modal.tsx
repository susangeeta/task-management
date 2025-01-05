import { ReactNode, useEffect } from "react";

interface ModalType {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className: string;
}

const Modal = ({ children, isOpen, onClose, className }: ModalType) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`w-full h-[100vh] fixed inset-0 bg-[rgba(12,12,14,0.5)] flex justify-center z-[999] ${className}`}
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
