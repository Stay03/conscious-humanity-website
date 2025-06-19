// src/components/ui/Spinner.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Spinner component for loading states
 */
const Spinner = ({ size = 'md', color = 'indigo', className = '' }) => {
  // Size mappings
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16',
  };
  
  // Color mappings
  const colors = {
    indigo: 'text-indigo-600',
    yellow: 'text-yellow-500',
    white: 'text-white',
    gray: 'text-gray-500',
  };
  
  // Get the appropriate size and color classes
  const sizeClass = sizes[size] || sizes.md;
  const colorClass = colors[color] || colors.indigo;
  
  return (
    <div className={`${sizeClass} ${colorClass} ${className}`} aria-label="Loading...">
      <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['indigo', 'yellow', 'white', 'gray']),
  className: PropTypes.string,
};

export default Spinner;