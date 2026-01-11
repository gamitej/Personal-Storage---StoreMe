import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({
  onClose,
  children,
  isOpen = false,
  title = 'Modal Title',
}: ModalProps) => {
  if (!isOpen) return null;

  /**
   * TSX
   */
  return createPortal(
    <div className="fixed inset-0 w-full h-screen bg-black/40 backdrop-blur-sm z-999 flex justify-center items-center">
      <div className="flex flex-col gap-4 bg-white shadow-2xl rounded-xl p-6 min-w-100">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-(--pink) font-bold text-lg uppercase">{title}</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <section className="py-2">{children}</section>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
