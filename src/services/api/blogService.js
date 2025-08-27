/**
 * Blog API Service
 * Handles all blog-related API calls based on BlogDocs.md specifications
 */

import apiClient from './client';

const BLOG_ENDPOINTS = {
  categories: '/blog/categories',
  posts: '/blog/posts',
  post: (idOrSlug) => `/blog/posts/${idOrSlug}`,
  toggleStatus: (id) => `/blog/posts/${id}/toggle-status`,
};

/**
 * Blog Categories API
 */
export const blogCategoriesApi = {
  /**
   * Get all active blog categories
   * @param {Object} params - Query parameters
   * @param {string} params.platform - Filter by platform (EL, CH)
   * @returns {Promise} Categories list
   */
  getCategories: (params = {}) => {
    // Default to CH platform for this site
    const queryParams = {
      platform: 'CH',
      ...params
    };
    return apiClient.get(BLOG_ENDPOINTS.categories, queryParams);
  },

  /**
   * Create a new blog category (Admin only)
   * @param {Object} categoryData - Category data
   * @param {string} categoryData.name - Category name (required)
   * @param {string} categoryData.platform - Platform (required: EL, CH, EL,CH, or CH,EL)
   * @param {string} categoryData.description - Category description (optional)
   * @param {boolean} categoryData.is_active - Is active flag (optional, default: true)
   * @returns {Promise} Created category
   */
  createCategory: (categoryData) => {
    return apiClient.post(BLOG_ENDPOINTS.categories, categoryData);
  }
};

/**
 * Blog Posts API
 */
export const blogPostsApi = {
  /**
   * Get published blog posts with pagination and filtering
   * @param {Object} params - Query parameters
   * @param {string} params.platform - Filter by platform (EL, CH)
   * @param {string} params.status - Filter by status (published, draft, archived) - admin only
   * @param {string} params.visibility - Filter by visibility (public, members_only)
   * @param {number} params.category_id - Filter by category ID
   * @param {string} params.category_slug - Filter by category slug
   * @param {boolean|string} params.featured - Filter featured posts (1 or true)
   * @param {string} params.tag - Filter by tag
   * @param {string} params.search - Search in title, content, and excerpt
   * @param {string} params.orderBy - Order field (default: published_at)
   * @param {string} params.orderDir - Order direction (asc, desc) (default: desc)
   * @param {number} params.perPage - Posts per page (default: 15)
   * @param {boolean} params.include_drafts - Include draft posts (admin only)
   * @returns {Promise} Paginated posts data
   */
  getPosts: (params = {}) => {
    // Default to CH platform for this site
    const queryParams = {
      platform: 'CH',
      ...params
    };
    return apiClient.get(BLOG_ENDPOINTS.posts, queryParams);
  },

  /**
   * Get a single blog post by ID or slug
   * @param {string|number} idOrSlug - Post ID (number) or slug (string)
   * @returns {Promise} Single post data
   */
  getPost: (idOrSlug) => {
    return apiClient.get(BLOG_ENDPOINTS.post(idOrSlug));
  },

  /**
   * Create a new blog post (Admin only)
   * @param {Object} postData - Post data
   * @param {string} postData.title - Post title (required, max 255 chars)
   * @param {string} postData.content - Post content (required)
   * @param {string} postData.platform - Platform (required: EL, CH, EL,CH, or CH,EL)
   * @param {string} postData.excerpt - Post excerpt (optional, max 500 chars)
   * @param {number} postData.category_id - Category ID (optional)
   * @param {string} postData.thumbnail - Base64 image data (optional)
   * @param {string} postData.status - Status (optional: draft, published, archived) default: draft
   * @param {string} postData.visibility - Visibility (optional: public, members_only) default: public
   * @param {boolean} postData.is_featured - Is featured flag (optional) default: false
   * @param {Array<string>} postData.tags - Tags array (optional, max 50 chars each)
   * @param {string} postData.published_at - Publication date (optional, ISO 8601 format)
   * @returns {Promise} Created post data
   */
  createPost: (postData) => {
    return apiClient.post(BLOG_ENDPOINTS.posts, postData);
  },

  /**
   * Update an existing blog post (Admin only)
   * @param {number} id - Post ID
   * @param {Object} postData - Post data (all fields optional for updates)
   * @returns {Promise} Updated post data
   */
  updatePost: (id, postData) => {
    return apiClient.put(BLOG_ENDPOINTS.post(id), postData);
  },

  /**
   * Delete a blog post permanently (Admin only)
   * @param {number} id - Post ID
   * @returns {Promise} Success response
   */
  deletePost: (id) => {
    return apiClient.delete(BLOG_ENDPOINTS.post(id));
  },

  /**
   * Toggle post status between draft and published (Admin only)
   * @param {number} id - Post ID
   * @returns {Promise} Updated post data
   */
  togglePostStatus: (id) => {
    return apiClient.post(BLOG_ENDPOINTS.toggleStatus(id));
  }
};

/**
 * Convenience methods for common blog operations
 */
export const blogApi = {
  // Categories
  ...blogCategoriesApi,
  
  // Posts
  ...blogPostsApi,

  /**
   * Get featured posts
   * @param {number} limit - Number of posts to fetch
   * @returns {Promise} Featured posts
   */
  getFeaturedPosts: (limit = 5) => {
    return blogPostsApi.getPosts({
      featured: 1,
      perPage: limit,
      platform: 'CH'
    });
  },

  /**
   * Search posts
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   * @returns {Promise} Search results
   */
  searchPosts: (query, filters = {}) => {
    return blogPostsApi.getPosts({
      search: query,
      platform: 'CH',
      ...filters
    });
  },

  /**
   * Get posts by category
   * @param {string} categorySlug - Category slug
   * @param {Object} params - Additional parameters
   * @returns {Promise} Category posts
   */
  getPostsByCategory: (categorySlug, params = {}) => {
    return blogPostsApi.getPosts({
      category_slug: categorySlug,
      platform: 'CH',
      ...params
    });
  },

  /**
   * Get posts by tag
   * @param {string} tag - Tag name
   * @param {Object} params - Additional parameters
   * @returns {Promise} Tagged posts
   */
  getPostsByTag: (tag, params = {}) => {
    return blogPostsApi.getPosts({
      tag: tag,
      platform: 'CH',
      ...params
    });
  }
};

export default blogApi;