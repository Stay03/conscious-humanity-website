
// src/components/events/EventCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Event card component for displaying an event in the search results
 */
const EventCard = ({ event }) => {
  // Default image if event image is missing
  const defaultImage = 'https://placehold.co/600x400';
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return '';
    
    return timeString;
  };
  
  // Check if event is past
  const isPastEvent = () => {
    if (!event.end_date) return false;
    
    const now = new Date();
    const endDate = new Date(event.end_date);
    return endDate < now;
  };
  
  // Get event status badge
  const getStatusBadge = () => {
    if (isPastEvent()) {
      return (
        <div className="absolute top-4 right-4 bg-gray-600 text-white text-sm font-bold px-3 py-1 rounded-full">
          Past Event
        </div>
      );
    }
    
    if (event.registration_status === 'full' || event.seats_available === 0) {
      return (
        <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
          Sold Out
        </div>
      );
    }
    
    if (event.registration_status === 'closing_soon' || (event.seats_available && event.seats_available < 10)) {
      return (
        <div className="absolute top-4 right-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
          Almost Full
        </div>
      );
    }
    
    // return (
    //   <div className="absolute top-4 right-4 bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full">
    //     Registration Open
    //   </div>
    // );
  };
  
  // Get location display
  const getLocationDisplay = () => {
    if (event.is_online) {
      return 'Online Event';
    }
    
    return event.location || 'Location TBD';
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
      {/* Event Image */}
      <div className="relative">
        <img 
          src={event.thumbnail || defaultImage} 
          alt={event.title || event.name} 
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.src = defaultImage; }}
        />
        
        {/* Status Badge */}
        {getStatusBadge()}
      </div>
      
      {/* Event Content */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Date and Time */}
        <div className="bg-indigo-50 rounded-lg p-3 mb-4 flex items-center">
          <div className="bg-indigo-100 rounded-md h-12 w-12 flex flex-col items-center justify-center mr-3">
            <span className="text-xs text-indigo-800 font-medium">
              {event.start_date ? new Date(event.start_date).toLocaleString('en-US', { month: 'short' }) : 'TBD'}
            </span>
            <span className="text-lg text-indigo-800 font-bold">
              {event.start_date ? new Date(event.start_date).getDate() : '--'}
            </span>
          </div>
          <div>
            <div className="text-indigo-800 font-medium">
              {formatDate(event.start_date)}
              {event.start_date !== event.end_date && event.end_date && ` - ${formatDate(event.end_date)}`}
            </div>
            <div className="text-indigo-600 text-sm">
              {formatTime(event.start_time)}
              {event.start_time && event.end_time && ` - ${formatTime(event.end_time)}`}
            </div>
          </div>
        </div>
        
        {/* Event Title */}
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {event.title || event.name}
        </h3>
        
        {/* Event Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {event.short_description || event.description || 'No description available'}
        </p>
        
        {/* Event Meta */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location}</span>
          </div>
        </div>
        
        {/* Action Button */}
        <Link 
          to={`/events/${event.slug || event.id}`}
          className={`block text-center text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
            isPastEvent() 
              ? 'bg-gray-500 hover:bg-gray-600' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isPastEvent() ? 'View Details' : 'View'}
        </Link>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    short_description: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    is_online: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    location: PropTypes.string,
    registration_status: PropTypes.string,
    seats_available: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
};

export default EventCard;