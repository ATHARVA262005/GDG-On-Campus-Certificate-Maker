import React from 'react';

const Alert = ({ children, variant = 'default' }) => {
  const baseClasses = 'p-4 rounded-md';
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    destructive: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`} role="alert">
      {children}
    </div>
  );
};

const AlertDescription = ({ children }) => {
  return <div className="text-sm">{children}</div>;
};

export { Alert, AlertDescription };