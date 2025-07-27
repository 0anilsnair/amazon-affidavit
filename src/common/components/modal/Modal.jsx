// src/components/Modal/Modal.js
import React from 'react';
import './Modal.scss';

const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className={`${className || ''} modal-content`}>{children}</div>
    </div>
  );
};

export default Modal;
