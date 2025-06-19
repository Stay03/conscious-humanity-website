// src/components/search/SearchResults.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CourseCard from '../courses/CourseCard';
import ProductCard from '../products/ProductCard';
import EventCard from '../events/EventCard';

/**
 * SearchResults component
 * Displays search results in a responsive grid with tabs for filtering by type
 */
const SearchResults = ({ results, activeCategory }) => {
  // Determine if we should show the category tabs
  // Only show if we're viewing 'all' results and have multiple result types
  const hasMultipleTypes = 
    [results.courses.length, results.products.length, results.events.length]
      .filter(count => count > 0).length > 1;
      
  const shouldShowTabs = activeCategory === 'all' && hasMultipleTypes;
  
  // State for active tab when in 'all' view
  const [activeTab, setActiveTab] = useState(getInitialActiveTab());
  
  // Determine initial active tab based on which result type has items
  function getInitialActiveTab() {
    if (results.courses.length > 0) return 'courses';
    if (results.products.length > 0) return 'products';
    if (results.events.length > 0) return 'events';
    return 'courses'; // Default to courses
  }
  
  // Get total count for each category
  const counts = {
    courses: results.courses.length,
    products: results.products.length,
    events: results.events.length,
    all: results.courses.length + results.products.length + results.events.length
  };
  
  // Get results to display based on active category/tab
  const getDisplayResults = () => {
    // If a specific category is selected, show only those results
    if (activeCategory !== 'all') {
      return results[activeCategory] || [];
    }
    
    // Otherwise, show results based on active tab
    return results[activeTab] || [];
  };
  
  // Get content type for current results
  const getCurrentType = () => {
    if (activeCategory !== 'all') return activeCategory;
    return activeTab;
  };
  
  const displayResults = getDisplayResults();
  const currentType = getCurrentType();
  
  return (
    <div className="search-results">
      {/* Category tabs - only shown in 'all' view with multiple result types */}
      {shouldShowTabs && (
        <div className="mb-6 border-b border-gray-200">
          <div className="flex overflow-x-auto hide-scrollbar">
            {Object.entries({
              courses: 'Courses',
              products: 'Products',
              events: 'Events'
            }).map(([key, label]) => (
              counts[key] > 0 && (
                <button
                  key={key}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === key
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  {label} ({counts[key]})
                </button>
              )
            ))}
          </div>
        </div>
      )}
      
      {/* Results grid - responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayResults.map((item, index) => {
          // Render appropriate card component based on content type
          if (currentType === 'courses') {
            return (
              <div key={`course-${item.id || index}`} className="transform hover:scale-105 transition-transform duration-300">
                <CourseCard course={item} />
              </div>
            );
          } else if (currentType === 'products') {
            return (
              <div key={`product-${item.id || index}`} className="transform hover:scale-105 transition-transform duration-300">
                <ProductCard product={item} />
              </div>
            );
          } else if (currentType === 'events') {
            return (
              <div key={`event-${item.id || index}`}>
                <EventCard event={item} />
              </div>
            );
          }
          
          // Fallback rendering in case of unknown type
          return (
            <div key={`item-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title || item.name}</h3>
                <p className="text-gray-600 mt-2 truncate">{item.description || item.short_description || 'No description available'}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Show all results link - only when in specific tab of 'all' category */}
      {activeCategory === 'all' && hasMultipleTypes && displayResults.length > 0 && (
        <div className="mt-8 text-center">
          <Link 
            to={`/search?category=${activeTab}`}
            className="inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors duration-200"
          >
            View all {activeTab}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.shape({
    courses: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
  }).isRequired,
  activeCategory: PropTypes.string.isRequired,
};

export default SearchResults;