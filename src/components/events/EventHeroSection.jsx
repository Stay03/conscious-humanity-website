import React from 'react';
import EventCountdownBadge from './EventCountdownBadge';

const EventHeroSection = ({ event }) => {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <img
        src={event.thumbnail || '/images/event-placeholder.jpg'}
        alt={event.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>

      {/* Event type and status badges */}
      <div className="absolute mt-20 top-8 right-8 flex space-x-3">
        <span className="px-4 py-2 bg-green-500 text-gray-900 rounded-lg font-semibold capitalize">
          {event.event_type}
        </span>

        {event.status === 'published' && new Date(event.start_date) > new Date() && (
          <EventCountdownBadge startDate={event.start_date} />
        )}
      </div>
    </div>
  );
};

export default EventHeroSection;
