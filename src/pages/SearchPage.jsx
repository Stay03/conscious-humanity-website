// src/pages/SearchPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../services/api/client';
import endpoints from '../services/api/endpoints';
import SearchResults from '../components/search/SearchResults';
import SearchForm from '../components/search/SearchForm';
import SearchFilters from '../components/search/SearchFilters';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';

/**
 * SearchPage component that provides a unified search experience
 * Allows users to search for courses, products, and events
 */
const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';

  // Component state
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState({
    courses: [],
    products: [],
    events: [],
  });
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    sortBy: 'relevance',
    dateRange: null,
  });

  // Refs
  const searchInputRef = useRef(null);
  const resultsRef = useRef(null);

  // Focus the search input on mount
  useEffect(() => {
    if (searchInputRef.current && !initialQuery) {
      searchInputRef.current.focus();
    }
  }, [initialQuery]);

  // Update URL when search parameters change
  useEffect(() => {
    if (hasSearched) {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (activeCategory !== 'all') params.set('category', activeCategory);
      
      const newUrl = `${location.pathname}?${params.toString()}`;
      navigate(newUrl, { replace: true });
    }
  }, [searchQuery, activeCategory, hasSearched, navigate, location.pathname]);

  // Perform search when query or category changes
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults({
        courses: [],
        products: [],
        events: [],
      });
      setTotalResults(0);
      return;
    }

    const performSearch = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Prepare search results
        let courseResults = [];
        let productResults = [];
        let eventResults = [];

        // Parallel requests for better performance
        const searchPromises = [];

        // Search courses if needed
        if (activeCategory === 'all' || activeCategory === 'courses') {
          const courseParams = {
            platform: 'CH',
            is_online: true,
            display_page: 'search',
            search: searchQuery,
            sort_by: filters.sortBy,
            per_page: 10,
            page: 1,
            min_price: filters.priceRange[0],
            max_price: filters.priceRange[1]
          };
          
          searchPromises.push(
            apiClient.get(endpoints.courses.list, courseParams)
              .then(res => courseResults = res.courses?.data || [])
              .catch(err => {
                console.error('Error searching courses:', err);
                return [];
              })
          );
        }

        // Search products if needed
        if (activeCategory === 'all' || activeCategory === 'products') {
          const productParams = {
            platform: 'CH',
            type: 'physical',
            is_online: true,
            visibility: 1,
            sort: filters.sortBy === 'newest' ? 'newest' : 
                  filters.sortBy === 'price-asc' ? 'price_asc' : 
                  filters.sortBy === 'price-desc' ? 'price_desc' : 'newest',
            search: searchQuery,
            min_price: filters.priceRange[0],
            max_price: filters.priceRange[1]
          };
          
          searchPromises.push(
            apiClient.get(endpoints.products.list, productParams)
              .then(res => productResults = res.products?.data || [])
              .catch(err => {
                console.error('Error searching products:', err);
                return [];
              })
          );
        }

        // Search events if needed
        if (activeCategory === 'all' || activeCategory === 'events') {
          const eventParams = {
            platform: 'CH',
            is_online: 1,
            perPage: 10,
            status: 'published',
            orderBy: 'start_date',
            orderDir: 'asc',
            event_level: 'main',
            search: searchQuery
          };
          
          // Add date filter for events if set
          if (filters.dateRange) {
            eventParams.start_date = filters.dateRange[0];
            eventParams.end_date = filters.dateRange[1];
          }
          
          searchPromises.push(
            apiClient.get(endpoints.events.list, eventParams)
              .then(res => eventResults = res.data?.data || [])
              .catch(err => {
                console.error('Error searching events:', err);
                return [];
              })
          );
        }

        // Wait for all search requests to complete
        await Promise.all(searchPromises);

        // Update search results
        setSearchResults({
          courses: courseResults,
          products: productResults,
          events: eventResults,
        });

        // Calculate total results
        const total = courseResults.length + productResults.length + eventResults.length;
        setTotalResults(total);

        // Scroll to results if we have any
        if (total > 0 && resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

      } catch (err) {
        console.error('Search failed:', err);
        setError('An error occurred while searching. Please try again.');
      } finally {
        setIsLoading(false);
        setHasSearched(true);
      }
    };

    if (searchQuery) {
      performSearch();
    }
  }, [searchQuery, activeCategory, filters]);

  // Handle search submission
  const handleSearch = (query) => {
    if (query.trim() !== searchQuery) {
      setSearchQuery(query);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero search section with large search bar */}
      <section className="relative bg-indigo-700 pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-800"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Find Exactly What You're Looking For
            </h1>
            <p className="text-indigo-100 text-xl">
              Search across our courses, products, and events
            </p>
          </div>

          <SearchForm 
            initialQuery={searchQuery}
            onSearch={handleSearch}
            inputRef={searchInputRef}
            isSearching={isLoading}
          />
        </div>
      </section>

      {/* Results section */}
      <section 
        ref={resultsRef}
        className="container mx-auto px-4 py-12"
      >
        {hasSearched && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {searchQuery ? (
                <>
                  {isLoading ? 'Searching...' : (
                    <>
                      {totalResults === 0 
                        ? 'No results found' 
                        : `${totalResults} ${totalResults === 1 ? 'result' : 'results'} for "${searchQuery}"`
                      }
                    </>
                  )}
                </>
              ) : 'Enter a search term to get started'}
            </h2>
          </div>
        )}

        {/* Filters and results grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar - Only show when we have results or are loading */}
          {(hasSearched && searchQuery) && (
            <div className="lg:w-1/4">
              <SearchFilters 
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}

          {/* Results area */}
          <div className={`${hasSearched && searchQuery ? 'lg:w-3/4' : 'w-full'}`}>
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Spinner size="lg" />
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-800 p-4 rounded-lg">
                <p>{error}</p>
              </div>
            ) : !searchQuery ? (
              <EmptyState 
                icon="search"
                title="Start your search"
                description="Use the search bar above to find courses, products, and events."
              />
            ) : totalResults === 0 ? (
              <EmptyState 
                icon="empty-box"
                title="No results found"
                description={`We couldn't find anything matching "${searchQuery}". Try using different keywords or filters.`}
                actionText="Clear search"
                onAction={() => setSearchQuery('')}
              />
            ) : (
              <SearchResults 
                results={searchResults}
                activeCategory={activeCategory}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;