import React, { useEffect } from 'react';
import { Check, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', isVisible, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: <Check className="text-green-600" />,
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
        };
      case 'error':
        return {
          icon: <AlertTriangle className="text-red-600" />,
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="text-yellow-600" />,
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
        };
      case 'info':
      default:
        return {
          icon: <Info className="text-blue-600" />,
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`max-w-sm w-full ${styles.bg} ${styles.border} border rounded-lg shadow-lg overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {styles.icon}
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className={`text-sm font-medium ${styles.text}`}>
                {message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className={`inline-flex ${styles.text} hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast; 