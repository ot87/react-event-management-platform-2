import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRoot = document.getElementById("modal-root");

  if (!isOpen || !modalRoot) {
    return null;
  }

  return createPortal(
    <div className="">
      <div className="">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
