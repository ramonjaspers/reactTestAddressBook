import React from "react";
import "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-message" role="alert">
      <div className="error-message__content">
        <span className="error-message__icon">⚠️</span>
        <span className="error-message__text">{message}</span>
        {onClose && (
          <button 
            className="error-message__close" 
            onClick={onClose}
            aria-label="Close error message"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;