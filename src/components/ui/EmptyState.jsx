// src/components/ui/EmptyState.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * EmptyState component
 * Displays a friendly empty state with icon, title, and optional action
 */
const EmptyState = ({
  icon = 'search',
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  // Icon mappings
  const icons = {
    search: (
      <svg className="w-12 h-12 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    'empty-box': (
      <svg className="w-12 h-12 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    error: (
      <svg className="w-12 h-12 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    filter: (
      <svg className="w-12 h-12 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
    ),
  };

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-xl shadow-sm ${className}`}>
      <div className="bg-indigo-50 rounded-full p-4 mb-6">
        {icons[icon] || icons.search}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 max-w-md mb-6">
        {description}
      </p>
      
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.oneOf(['search', 'empty-box', 'error', 'filter']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
  className: PropTypes.string,
};

export default EmptyState;