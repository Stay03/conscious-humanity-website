// src/components/layout/Header/components/Logo.jsx

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ethLogo from '../../../../assets/Logo-1.webp';

/**
 * Logo component used in both mobile and desktop headers
 */
const Logo = ({ className, size = 'default' }) => {
  // Size variants for logo
  const sizeClasses = {
    small: 'h-10 w-auto',
    default: 'h-10 w-auto',
    large: 'h-[5.4rem] w-auto'
  };

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img 
        src={ethLogo} 
        alt="Etherean Life" 
        className={sizeClasses[size] || sizeClasses.default} 
      />
    </Link>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'large'])
};

// Memoize to prevent unnecessary re-renders
export default memo(Logo);