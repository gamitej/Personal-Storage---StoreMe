import './toast.css';
import { ReactNode } from 'react';

interface ToastProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Toast = ({ isOpen = false, title, children, onClose }: ToastProps) => {
  if (!isOpen) return null;

  return (
    <div className="toast toast-show">
      <header className="toast-header border-b pb-2">
        <h1 className="toast-title text-(--pink)">{title}</h1>
        <button className="toast-close" onClick={onClose}>
          ✕
        </button>
      </header>

      <main className="toast-body">{children}</main>
    </div>
  );
};

export default Toast;
