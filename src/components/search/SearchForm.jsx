// src/components/search/SearchForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * SearchForm component for the search page
 * Provides an animated search input with suggestions
 */
const SearchForm = ({ initialQuery = '', onSearch, inputRef, isSearching }) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to load recent searches:', error);
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (query.trim()) {
      onSearch(query.trim());
      
      // Save to recent searches
      try {
        const updatedSearches = [
          query.trim(),
          ...recentSearches.filter(item => item !== query.trim())
        ].slice(0, 5);
        
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      } catch (error) {
        console.error('Failed to save recent search:', error);
      }
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setIsFocused(false);
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      <form 
        onSubmit={handleSubmit}
        className={`transition-all duration-300 ${
          isFocused 
            ? 'bg-white shadow-2xl rounded-t-xl' 
            : 'bg-white shadow-lg rounded-xl'
        }`}
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search for courses, products, events..."
            className="w-full px-6 py-5 text-lg outline-none rounded-xl"
            disabled={isSearching}
            aria-label="Search"
          />
          <button
            type="submit"
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-colors duration-200 ${
              isSearching 
                ? 'bg-yellow-400 text-white cursor-wait'
                : 'bg-yellow-500 text-white hover:bg-yellow-600'
            }`}
            disabled={isSearching}
            aria-label="Search"
          >
            {isSearching ? (
              <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Recent searches dropdown */}
        {isFocused && recentSearches.length > 0 && (
          <div className="absolute left-0 right-0 bg-white border-t border-gray-100 rounded-b-xl shadow-2xl z-10">
            <div className="p-2">
              <p className="text-xs text-gray-500 px-3 py-2">Recent Searches</p>
              <ul>
                {recentSearches.map((search, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {search}
                    </button>
                  </li>
                ))}
                <li className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem('recentSearches');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-red-500 rounded"
                  >
                    Clear recent searches
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  initialQuery: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  isSearching: PropTypes.bool
};

export default SearchForm;