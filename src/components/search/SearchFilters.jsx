// src/components/search/SearchFilters.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * SearchFilters component
 * Provides filtering options for search results
 */
const SearchFilters = ({ activeCategory, onCategoryChange, filters, onFilterChange }) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  // Category options
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'courses', name: 'Courses' },
    { id: 'products', name: 'Products' },
    { id: 'events', name: 'Events' },
  ];
  
  // Sort options
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];
  
  // Handle price range change
  const handlePriceChange = (e, index) => {
    const newValue = parseInt(e.target.value, 10);
    const newRange = [...filters.priceRange];
    newRange[index] = newValue;
    
    // Ensure min <= max
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[1] = newRange[0];
    } else if (index === 1 && newRange[1] < newRange[0]) {
      newRange[0] = newRange[1];
    }
    
    onFilterChange({ priceRange: newRange });
  };
  
  // Handle sort change
  const handleSortChange = (e) => {
    onFilterChange({ sortBy: e.target.value });
  };

  // Helper to format price display
  const formatPrice = (price) => {
    return `$${price}`;
  };

  // Toggle mobile filters visibility
  const toggleFilters = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Mobile filter toggle */}
      <div className="lg:hidden p-4 border-b border-gray-200">
        <button 
          className="flex items-center justify-between w-full"
          onClick={toggleFilters}
          aria-expanded={isFilterExpanded}
        >
          <span className="text-lg font-medium">Filters</span>
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isFilterExpanded ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {/* Filter sections - Hidden on mobile when collapsed */}
      <div className={`${isFilterExpanded ? 'block' : 'hidden'} lg:block`}>
        {/* Categories filter */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  className="form-radio h-5 w-5 text-indigo-600"
                  checked={activeCategory === category.id}
                  onChange={() => onCategoryChange(category.id)}
                />
                <span className="ml-2 text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Price Range filter */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Price Range</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">
                {formatPrice(filters.priceRange[0])}
              </span>
              <span className="text-sm text-gray-600">
                {formatPrice(filters.priceRange[1])}
              </span>
            </div>
            
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute h-2 bg-indigo-500 rounded-full"
                  style={{
                    left: `${(filters.priceRange[0] / 1000) * 100}%`,
                    right: `${100 - (filters.priceRange[1] / 1000) * 100}%`,
                  }}
                ></div>
              </div>
              
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="absolute top-0 h-2 w-full appearance-none bg-transparent pointer-events-none"
                style={{ 
                  WebkitAppearance: 'none',
                  zIndex: 3,
                }}
              />
              
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="absolute top-0 h-2 w-full appearance-none bg-transparent pointer-events-none"
                style={{ 
                  WebkitAppearance: 'none',
                  zIndex: 4,
                }}
              />
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="text-xs text-gray-500">Min</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500">Max</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Sort options */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Sort By</h3>
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full p-2 border border-gray-300 rounded bg-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Reset filters button */}
        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={() => onFilterChange({
              priceRange: [0, 1000],
              sortBy: 'relevance',
              dateRange: null,
            })}
            className="w-full py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

SearchFilters.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    priceRange: PropTypes.arrayOf(PropTypes.number),
    sortBy: PropTypes.string,
    dateRange: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default SearchFilters;