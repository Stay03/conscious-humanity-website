import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import searchService from '../services/api/searchService';

/**
 * Custom hook for managing search functionality
 * 
 * @param {Object} initialFilters - Initial search filters
 * @returns {Object} - Search state and handlers
 */
const useSearch = (initialFilters = {}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse search params from URL
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';
  
  // State for search
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState({
    courses: [],
    products: [],
    events: [],
  });
  const [category, setCategory] = useState(initialCategory);
  const [totalResults, setTotalResults] = useState(0);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);
  
  // State for filters
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    sortBy: 'relevance',
    dateRange: null,
    ...initialFilters,
  });
  
  // Load recent searches on mount
  useEffect(() => {
    const searches = searchService.getRecentSearches();
    setRecentSearches(searches);
  }, []);
  
  // Update URL when search parameters change
  useEffect(() => {
    if (hasSearched) {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (category !== 'all') params.set('category', category);
      
      const newUrl = `${location.pathname}?${params.toString()}`;
      navigate(newUrl, { replace: true });
    }
  }, [searchQuery, category, hasSearched, navigate, location.pathname]);
  
  // Perform search when query, category or filters change
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
        if (category === 'all' || category === 'courses') {
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
        if (category === 'all' || category === 'products') {
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
        if (category === 'all' || category === 'events') {
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
        const totalCount = courseResults.length + productResults.length + eventResults.length;
        setTotalResults(totalCount);
        
        // Save to recent searches if this is a new search
        if (hasSearched && searchQuery) {
          searchService.saveRecentSearch(searchQuery);
          setRecentSearches(searchService.getRecentSearches());
        }
        
      } catch (err) {
        console.error('Search failed:', err);
        setError('An error occurred while searching. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (searchQuery && hasSearched) {
      performSearch();
    }
  }, [searchQuery, category, filters, hasSearched]);
  
  // Handle search submission
  const handleSearch = useCallback((query) => {
    if (query.trim() !== searchQuery) {
      setSearchQuery(query.trim());
      setHasSearched(true);
    }
  }, [searchQuery]);
  
  // Handle category change
  const handleCategoryChange = useCallback((newCategory) => {
    setCategory(newCategory);
  }, []);
  
  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  
  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults({
      courses: [],
      products: [],
      events: [],
    });
    setTotalResults(0);
    setHasSearched(false);
    navigate(location.pathname, { replace: true });
  }, [navigate, location.pathname]);
  
  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    searchService.clearRecentSearches();
    setRecentSearches([]);
  }, []);
  
  return {
    searchQuery,
    searchResults,
    totalResults,
    category,
    filters,
    recentSearches,
    isLoading,
    error,
    hasSearched,
    handleSearch,
    handleCategoryChange,
    handleFilterChange,
    clearSearch,
    clearRecentSearches,
  };
};

export default useSearch;