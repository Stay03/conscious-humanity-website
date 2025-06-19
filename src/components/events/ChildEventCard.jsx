import React from 'react';

const ChildEventCard = ({ childEvent }) => {
  // Format date and time
  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Calculate event duration
  const calculateDuration = () => {
    if (!childEvent.start_date || !childEvent.end_date) return '';

    const startDate = new Date(childEvent.start_date);
    const endDate = new Date(childEvent.end_date);
    const durationMs = endDate - startDate;
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));

    if (durationHours < 24) {
      return `${durationHours} hour${durationHours !== 1 ? 's' : ''}`;
    } else {
      const durationDays = Math.round(durationHours / 24);
      return `${durationDays} day${durationDays !== 1 ? 's' : ''}`;
    }
  };

  const price = parseFloat(childEvent.price);

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{childEvent.title}</h4>

        <div className="space-y-2 mb-3 flex-grow">
          {/* Date and time */}
          <div className="flex items-start">
            <svg className="w-4 h-4 mr-2 text-gray-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="text-sm">
              <div className="text-gray-700">{formatDateTime(childEvent.start_date)}</div>
              {childEvent.end_date && (
                <div className="text-gray-500">to {formatDateTime(childEvent.end_date)}</div>
              )}
            </div>
          </div>

          {/* Duration */}
          {childEvent.end_date && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700">{calculateDuration()}</span>
            </div>
          )}

          {/* Location */}
          <div className="flex items-start">
            <svg className="w-4 h-4 mr-2 text-gray-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm text-gray-700">{childEvent.location}</span>
          </div>

          {/* Price - only show if more than 0 */}
          {price > 0 && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700">${price.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildEventCard;
