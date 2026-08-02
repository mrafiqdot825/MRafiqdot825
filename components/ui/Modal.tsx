import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AppleX } from "@/components/ui/AppleIcons";
import { ICON_CLASS } from "@/lib/constants";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-text-primary/50 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Center container */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Modal Container */}
        <div
          className="relative w-full max-w-lg rounded-[24px] liquid-glass-modal p-6 sm:p-8 shadow-2xl text-left overflow-hidden animate-fade-in-up my-8"
          role="dialog"
          aria-modal="true"
        >
          {/* Decorative Top Accent Light */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-(--color-rose) to-transparent" />

          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="font-heading text-xl font-bold text-text-primary">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full glass-button-secondary text-text-primary hover:text-(--color-rose-deep) transition-colors focus:outline-none focus:ring-2 focus:ring-rose cursor-pointer font-bold"
              aria-label="Close modal"
            >
              <AppleX className={ICON_CLASS.action} />
            </button>
          </div>

          {/* Content */}
          <div className="font-body text-text-primary font-medium text-[15px] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
