import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const BlogSearch = ({ onSearch, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Initialize search query from URL params
  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch(searchQuery.trim());
  };

  const handleClear = () => {
    setSearchQuery('');
    performSearch('');
  };

  const performSearch = (query) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (query) {
      newSearchParams.set('search', query);
    } else {
      newSearchParams.delete('search');
    }
    
    // Reset to first page when searching
    newSearchParams.delete('page');
    
    navigate(`/blog?${newSearchParams.toString()}`);
    
    // Call the onSearch callback if provided
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MagnifyingGlassIcon className="w-5 h-5" />
          Search Posts
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in titles, content, and excerpts..."
              className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            />
            
            {/* Search Icon */}
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            
            {/* Clear Button */}
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Search
            </button>
            
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </form>
        
        {/* Search Tips */}
        <div className="mt-4 text-sm text-gray-500">
          <p className="font-medium mb-1">Search Tips:</p>
          <ul className="space-y-1 text-xs">
            <li>• Search across post titles, content, and excerpts</li>
            <li>• Use quotes for exact phrases</li>
            <li>• Combine with category filters for better results</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogSearch;