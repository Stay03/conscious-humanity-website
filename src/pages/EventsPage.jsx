import React, { useState, useMemo } from 'react';
import useEvents from '../hooks/useEvents';
import EventsGrid from '../components/events/EventsGrid';
// import EventsFilters from '../components/events/EventsFilters';
import EventsSorting from '../components/events/EventsSorting';
import EventsPagination from '../components/events/EventsPagination';
import Breadcrumb from '../components/Breadcrumb';
import EventImage from '../assets/events.webp'; // Example image, replace with actual event images
import Maskpair from '../assets/maskpair.png';
import Mask2Image from '../assets/mask2.png';
import RetreatEventImage from '../assets/retreatEvent.webp';

/**
 * EventsPage Component
 * Displays all events with filtering, sorting, and pagination
 */
const EventsPage = () => {
  // State for filters and sorting
  const [filters, setFilters] = useState({
    eventType: 'all', // all, online, in-person
    dateRange: 'all', // all, upcoming, past
    status: 'all', // all, upcoming, past, ongoing
  });
  
  const [sortBy, setSortBy] = useState({
    field: 'start_date',
    direction: 'desc'
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Build query parameters
  const queryParams = useMemo(() => {
    const params = {
      platform: 'CH',
      page: currentPage,
      perPage: 12,
      orderBy: sortBy.field,
      orderDir: sortBy.direction,
    };
    
    // Apply filters
    if (filters.eventType === 'online') {
      params.is_online = 1;
    } else if (filters.eventType === 'in-person') {
      params.is_online = 0;
    }
    
    if (filters.status !== 'all') {
      params.status = filters.status;
    }
    
    if (searchQuery) {
      params.search = searchQuery;
    }
    
    return params;
  }, [filters, sortBy, currentPage, searchQuery]);
  
  // Fetch events using custom hook
  const { events, pagination, isLoading, error } = useEvents(queryParams);

    // Breadcrumb items
    const breadcrumbItems = [
      { label: 'Home', path: '/' },
      { label: 'Events', path: '/events' }
    ];
  
  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  // Handle sort changes
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1); // Reset to first page when sort changes
  };
  
  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search changes
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
        {/* Hero image */}
        <div className="relative w-full h-[600px]">
          <img
            src={EventImage}
            alt="Events"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-4xl font-bold mb-4">Events & Workshops</h1>
              
            </div>
          </div>
        </div>
        

      {/* Hero section */}
        {/* <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Events & Workshops
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Join our community events to learn, grow, and connect with like-minded individuals. 
              From online workshops to in-person retreats, we have something for everyone.
            </p>
          </div>
        </div> */}
        
        {/* Search bar */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-2.5 md:right-[52%]">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            {/* <aside className="w-full lg:w-64 flex-shrink-0">
              <EventsFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </aside> */}
            
            {/* Events grid and sorting */}
            <main className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {!isLoading && (
                    <span>
                      Showing {(currentPage - 1) * pagination.perPage + 1} - {Math.min(currentPage * pagination.perPage, pagination.totalItems)} of {pagination.totalItems} events
                    </span>
                  )}
                </div>
                
                <EventsSorting 
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                />
              </div>
              
              {/* Events grid */}
              <EventsGrid 
                events={events}
                isLoading={isLoading}
                error={error}
              />
              
              {/* Pagination */}
              {!isLoading && events.length > 0 && (
                <EventsPagination 
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </main>
          </div>
        </div>

        {/* Three Mystical Truths Section */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-600 uppercase tracking-wide">
                    ONGOING YEAR-ROUND EVENT
                  </h3>
                  <h2 className="text-4xl font-bold text-gray-900">
                    THE THREE MYSTICAL TRUTHS
                  </h2>
                </div>
                
                <div className="prose prose-lg text-gray-700 space-y-4">
                  <p>
                    Through the Three Mystical Truths (3MT) program you can transcend your pains and discords.
                  </p>
                  
                  <p>
                    Do you find yourself wanting more? More joy? More happiness? More fulfillment? A desire to be greater?
                  </p>
                  
                  <p>
                    The Three Mystical Truths not only reveals all that is within you but it hands you principles, techniques and tools that give access to your innate potentials.
                  </p>
                  
                  <p>
                    The words 'all that you need is within you' will no longer just be words you hear from another Transformational teacher that you never really feel. Instead you will discover your immense power, capacity, and capability to be all that you have come here to be and crave to be. 3MT will show you how to use spiritual energy to clear mental blocks that prevent you from the free expression of your glorious self! It will remind you that your are not to do it alone and show you the fact that you have not done anything alone. Everything is done by the collective power of the entire universe and you are here by the collective power of the entire universe.
                  </p>
                  
                  <p>
                    With this program you will awaken to the nature of your true self as a being that is here by the collective Power, Wisdom, Love, Joy and Order of the entire universe. You will awaken to your purpose and see clearly what life is trying to accomplish through you. You will come into alignment with Life and Nature. This is Nature's Spirituality.
                  </p>
                  
                  <p>
                    The 3 Mystical Truths are simple Truths of Nature that the sages, saints, and mystics have known for millennia. Join the Program and learn the Laws of Nature- the Laws that govern all life.
                  </p>
                  
                  <p className="font-semibold text-gray-900">
                    These 3 simple Truths can lead you to a healthy, happy, fulfilling empowered and prosperous life.
                  </p>
                </div>

                {/* Call to Action Button */}
                <div className="pt-6">
                  <a
                    href="/three-mystical-truths"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    Learn More About 3MT
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Right side - Images */}
              <div className="flex flex-col space-y-6">
                <div className="relative">
                  <img
                    src={Maskpair}
                    alt="Mystical Truth Mask 2"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
            
              </div>
            </div>
          </div>
        </div>

        {/* Ancestral Wisdom Virtual Retreat Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Image */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <img
                    src={RetreatEventImage}
                    alt="Ancestral Wisdom Virtual Retreat"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
              
              {/* Right side - Text content */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-gray-900">
                    Ancestral Wisdom Virtual Retreat
                  </h2>
                  <h3 className="text-2xl font-semibold text-gray-700">
                    with Brother Ishmael Tetteh
                  </h3>
                  <h4 className="text-xl font-medium text-gray-600">
                    Connect to Your Lineage. Reveal Your Soul's Purpose. Build Your Legacy.
                  </h4>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800">
                    Was held on Saturday, October 2 and Saturday, October 9, 2021 
                    <br />
                    9 a.m. to Noon PST (11 a.m. CT / Noon ET / 4 p.m. Ghana)
                  </p>
                </div>
                
                <div className="prose prose-lg text-gray-700 space-y-4">
                  <p>
                    This retreat is sacred and powerful. The information taught is to assist you in navigating and growing through these times we are living in. It is not work to be abused or taken lightly.
                  </p>
                  
                  <p className="font-semibold text-gray-900">
                    You are the answer to your Ancestor's prayers.
                  </p>
                  
                  <p>
                    Seek their assistance in making your dreams come true.
                  </p>
                  
                  <p className="font-semibold text-gray-900">
                    If you are ready to connect with your Ancestors to help transform your life, then click on the link below to sign up for the post recording.
                  </p>
                </div>

                {/* Call to Action Button */}
                <div className="pt-6">
                  <a
                    href="#"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
                  >
                    Access Recording
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
  );
};

export default EventsPage;