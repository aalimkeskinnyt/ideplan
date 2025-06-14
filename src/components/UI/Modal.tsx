import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'sm:max-w-md',
    md: 'sm:max-w-lg',
    lg: 'sm:max-w-2xl',
    xl: 'sm:max-w-4xl'
  };

  return (
    <div className="modal-professional">
      <div className="flex items-end sm:items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="modal-backdrop-professional"
          onClick={onClose}
          aria-hidden="true"
        />
        
        {/* Center modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        {/* Modal panel */}
        <div className={`
          modal-content-professional
          w-full max-w-none mx-0 mb-0
          sm:mx-4 sm:mb-4 ${sizeClasses[size]}
          rounded-t-2xl sm:rounded-xl
          max-h-[95vh] sm:max-h-[90vh]
        `}>
          {/* Header */}
          <div className="modal-header-professional">
            <div className="flex items-center justify-between">
              <h3 className="modal-title-professional pr-4 truncate">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="btn-professional-secondary p-2 rounded-lg flex-shrink-0"
                aria-label="Modalı kapat"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="professional-card-content overflow-y-auto flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;