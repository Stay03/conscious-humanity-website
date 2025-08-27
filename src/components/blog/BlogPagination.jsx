import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const BlogPagination = ({ paginationData, className = '' }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (!paginationData || paginationData.last_page <= 1) {
    return null;
  }

  const {
    current_page,
    last_page,
    per_page,
    total,
    from,
    to
  } = paginationData;

  const handlePageChange = (page) => {
    if (page < 1 || page > last_page || page === current_page) return;
    
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    navigate(`/blog?${newSearchParams.toString()}`);
  };

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Calculate start and end of visible range
    const start = Math.max(1, current_page - delta);
    const end = Math.min(last_page, current_page + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add first page and dots if necessary
    if (start > 2) {
      rangeWithDots.push(1);
      if (start > 3) {
        rangeWithDots.push('...');
      }
    }

    // Add the visible range
    rangeWithDots.push(...range);

    // Add last page and dots if necessary
    if (end < last_page - 1) {
      if (end < last_page - 2) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(last_page);
    }

    return rangeWithDots;
  };

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Results Info */}
        <div className="text-sm text-gray-600 mb-4 text-center">
          Showing {from} to {to} of {total} results
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(current_page - 1)}
            disabled={current_page === 1}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              current_page === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-gray-400">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      page === current_page
                        ? 'bg-green-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(current_page + 1)}
            disabled={current_page === last_page}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              current_page === last_page
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Next
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Pagination (simplified) */}
        <div className="md:hidden mt-4 flex justify-between">
          <button
            onClick={() => handlePageChange(current_page - 1)}
            disabled={current_page === 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              current_page === 1
                ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                : 'text-white bg-green-600 hover:bg-green-700'
            }`}
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Previous
          </button>

          <span className="flex items-center text-sm text-gray-600">
            Page {current_page} of {last_page}
          </span>

          <button
            onClick={() => handlePageChange(current_page + 1)}
            disabled={current_page === last_page}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              current_page === last_page
                ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                : 'text-white bg-green-600 hover:bg-green-700'
            }`}
          >
            Next
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPagination;