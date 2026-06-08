import { createPortal } from "react-dom";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div role="status">
      <span>{message}</span>
      <button onClick={onClose} aria-label="Dismiss notification">
        ×
      </button>
    </div>,
    modalRoot,
  );
}
