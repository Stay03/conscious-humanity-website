// src/services/api/searchService.js
import apiClient from './client';
import endpoints from './endpoints';

/**
 * Search Service
 * Centralizes all search-related API calls
 */

/**
 * Perform a unified search across multiple content types
 * 
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @param {string} options.category - Content category ('all', 'courses', 'products', 'events')
 * @param {Array} options.priceRange - Min and max price range [min, max]
 * @param {string} options.sortBy - Sort order ('relevance', 'newest', 'price-asc', 'price-desc')
 * @param {Array} options.dateRange - Date range for events [startDate, endDate]
 * @returns {Promise} - Promise resolving to search results
 */
const search = async (query, options = {}) => {
  try {
    const { category = 'all', priceRange, sortBy, dateRange } = options;
    
    // Base search parameters
    const searchParams = {
      search: query,
      platform: 'CH', // Using the CH platform as default
    };
    
    // Add price range if provided
    if (priceRange && priceRange.length === 2) {
      searchParams.min_price = priceRange[0];
      searchParams.max_price = priceRange[1];
    }
    
    // Add sort parameter if provided
    if (sortBy) {
      searchParams.sort_by = sortBy;
    }
    
    // Create empty result structure
    const results = {
      courses: [],
      products: [],
      events: [],
    };
    
    // Array to hold API requests
    const requests = [];
    
    // Add appropriate requests based on category
    if (category === 'all' || category === 'courses') {
      requests.push(
        apiClient.get(endpoints.courses.list, searchParams)
          .then(res => {
            results.courses = res.courses?.data || [];
          })
          .catch(err => {
            console.error('Error searching courses:', err);
          })
      );
    }
    
    if (category === 'all' || category === 'products') {
      // Specific product search parameters
      const productParams = {
        platform: 'CH',
        type: 'physical',
        is_online: true,
        visibility: 1,
        sort: sortBy === 'newest' ? 'newest' : 
              sortBy === 'price-asc' ? 'price_asc' : 
              sortBy === 'price-desc' ? 'price_desc' : 'newest',
        search: query,
        min_price: priceRange ? priceRange[0] : '',
        max_price: priceRange ? priceRange[1] : ''
      };
      
      requests.push(
        apiClient.get(endpoints.products.list, productParams)
          .then(res => {
            results.products = res.products?.data || [];
          })
          .catch(err => {
            console.error('Error searching products:', err);
          })
      );
    }
    
    if (category === 'all' || category === 'events') {
      // Add date range for events if provided
      const eventParams = { ...searchParams };
      if (dateRange && dateRange.length === 2) {
        eventParams.start_date = dateRange[0];
        eventParams.end_date = dateRange[1];
      }
      
      requests.push(
        apiClient.get(endpoints.events.list, eventParams)
          .then(res => {
            results.events = res.data?.data || [];
          })
          .catch(err => {
            console.error('Error searching events:', err);
          })
      );
    }
    
    // Wait for all search requests to complete
    await Promise.all(requests);
    
    // Calculate total results across all types
    const totalResults = 
      results.courses.length + 
      results.products.length + 
      results.events.length;
    
    return {
      results,
      totalResults,
      query,
      category,
    };
    
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
};

/**
 * Get recent search suggestions based on previous searches
 * @returns {Array} - Array of recent search terms
 */
const getRecentSearches = () => {
  try {
    const recentSearches = localStorage.getItem('recentSearches');
    return recentSearches ? JSON.parse(recentSearches) : [];
  } catch (error) {
    console.error('Failed to load recent searches:', error);
    return [];
  }
};

/**
 * Save a search term to recent searches
 * @param {string} term - Search term to save
 * @param {number} limit - Maximum number of recent searches to keep
 */
const saveRecentSearch = (term, limit = 5) => {
  try {
    const recentSearches = getRecentSearches();
    
    // Add the new term and remove duplicates
    const updatedSearches = [
      term,
      ...recentSearches.filter(item => item !== term)
    ].slice(0, limit);
    
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  } catch (error) {
    console.error('Failed to save recent search:', error);
  }
};

/**
 * Clear all recent searches
 */
const clearRecentSearches = () => {
  try {
    localStorage.removeItem('recentSearches');
  } catch (error) {
    console.error('Failed to clear recent searches:', error);
  }
};

const searchService = {
  search,
  getRecentSearches,
  saveRecentSearch,
  clearRecentSearches,
};

export default searchService;