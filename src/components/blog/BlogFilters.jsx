import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FunnelIcon, XMarkIcon, StarIcon, GlobeAltIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const BlogFilters = ({ className = '' }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const activeFilters = {
    featured: searchParams.get('featured') === '1' || searchParams.get('featured') === 'true',
    visibility: searchParams.get('visibility'),
    orderBy: searchParams.get('orderBy') || 'published_at',
    orderDir: searchParams.get('orderDir') || 'desc',
    perPage: searchParams.get('perPage') || '15'
  };

  const handleFilterChange = (filterKey, value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (value && value !== 'all') {
      newSearchParams.set(filterKey, value);
    } else {
      newSearchParams.delete(filterKey);
    }
    
    // Reset to first page when filters change
    newSearchParams.delete('page');
    
    navigate(`/blog?${newSearchParams.toString()}`);
  };

  const clearAllFilters = () => {
    const newSearchParams = new URLSearchParams();
    
    // Keep search query and category if they exist
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    
    if (search) newSearchParams.set('search', search);
    if (category) newSearchParams.set('category', category);
    if (tag) newSearchParams.set('tag', tag);
    
    navigate(`/blog?${newSearchParams.toString()}`);
  };

  const hasActiveFilters = activeFilters.featured || 
                          activeFilters.visibility || 
                          activeFilters.orderBy !== 'published_at' || 
                          activeFilters.orderDir !== 'desc' ||
                          activeFilters.perPage !== '15';

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FunnelIcon className="w-5 h-5" />
            Filters
          </h3>
          
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Featured Posts Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={activeFilters.featured}
                  onChange={(e) => handleFilterChange('featured', e.target.checked ? '1' : '')}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <StarIcon className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Featured Posts Only</span>
              </label>
            </div>
          </div>

          {/* Visibility Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visibility
            </label>
            <select
              value={activeFilters.visibility || 'all'}
              onChange={(e) => handleFilterChange('visibility', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            >
              <option value="all">All Posts</option>
              <option value="public">
                <GlobeAltIcon className="w-4 h-4 inline mr-1" />
                Public Posts
              </option>
              <option value="members_only">
                <UserGroupIcon className="w-4 h-4 inline mr-1" />
                Members Only
              </option>
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={activeFilters.orderBy}
              onChange={(e) => handleFilterChange('orderBy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            >
              <option value="published_at">Publication Date</option>
              <option value="title">Title</option>
              <option value="created_at">Created Date</option>
              <option value="updated_at">Last Updated</option>
            </select>
          </div>

          {/* Sort Direction */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order
            </label>
            <select
              value={activeFilters.orderDir}
              onChange={(e) => handleFilterChange('orderDir', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          {/* Posts Per Page */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posts Per Page
            </label>
            <select
              value={activeFilters.perPage}
              onChange={(e) => handleFilterChange('perPage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            >
              <option value="5">5 posts</option>
              <option value="10">10 posts</option>
              <option value="15">15 posts</option>
              <option value="20">20 posts</option>
              <option value="30">30 posts</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Active filters:</p>
            <div className="flex flex-wrap gap-2">
              {activeFilters.featured && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  <StarIcon className="w-3 h-3" />
                  Featured
                </span>
              )}
              {activeFilters.visibility && activeFilters.visibility !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {activeFilters.visibility === 'public' ? (
                    <GlobeAltIcon className="w-3 h-3" />
                  ) : (
                    <UserGroupIcon className="w-3 h-3" />
                  )}
                  {activeFilters.visibility === 'public' ? 'Public' : 'Members Only'}
                </span>
              )}
              {(activeFilters.orderBy !== 'published_at' || activeFilters.orderDir !== 'desc') && (
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {activeFilters.orderBy === 'published_at' ? 'Date' :
                   activeFilters.orderBy === 'title' ? 'Title' :
                   activeFilters.orderBy === 'created_at' ? 'Created' : 'Updated'} 
                  ({activeFilters.orderDir === 'desc' ? 'Newest' : 'Oldest'})
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogFilters;