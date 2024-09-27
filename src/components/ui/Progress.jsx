import React from 'react';

const Progress = ({ value, max = 100, className }) => {
  return (
    <div className={`bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  );
};

export { Progress };