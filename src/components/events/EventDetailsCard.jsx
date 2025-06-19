import React from 'react';
import ChildEventCard from './ChildEventCard';

const EventDetailsCard = ({ event, formatDateTime, calculateDuration }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>

      <div className="space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
        </div>

        {/* Date and time */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Date & Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Start</p>
              <p className="text-gray-900">{formatDateTime(event.start_date)}</p>
            </div>
            {event.end_date && (
              <div>
                <p className="text-sm text-gray-500">End</p>
                <p className="text-gray-900">{formatDateTime(event.end_date)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
          <p className="text-gray-600">{event.location}</p>
          {event.location_url && (
            <a
              href={event.location_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-2 text-green-600 hover:text-green-700"
            >
              View location
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        {/* Price and capacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Price</h3>
            <p className="text-gray-600">
              {parseFloat(event.price) === 0 ? 'Free' : `$${parseFloat(event.price).toFixed(2)}`}
            </p>
          </div>
          {event.capacity && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Capacity</h3>
              <p className="text-gray-600">{event.capacity} attendees</p>
            </div>
          )}
        </div>

        {/* Other Sessions - added inside the event details card */}
        {event.child_events && event.child_events.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Other Sessions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.child_events.map(childEvent => (
                <ChildEventCard key={childEvent.id} childEvent={childEvent} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsCard;
