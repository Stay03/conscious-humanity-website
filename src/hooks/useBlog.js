import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { blogApi } from '../services/api/blogService';

/**
 * Custom hook for managing blog data and state
 * Handles posts fetching, pagination, search, and filtering
 */
export const useBlog = () => {
  const [searchParams] = useSearchParams();
  
  // State management
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postsLoading, setPostsLoading] = useState(false);

  // Get filter parameters from URL
  const getFilters = useCallback(() => {
    return {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      tag: searchParams.get('tag') || '',
      featured: searchParams.get('featured') || '',
      visibility: searchParams.get('visibility') || '',
      orderBy: searchParams.get('orderBy') || 'published_at',
      orderDir: searchParams.get('orderDir') || 'desc',
      perPage: searchParams.get('perPage') || '15',
      page: searchParams.get('page') || '1'
    };
  }, [searchParams]);

  // Fetch blog posts with current filters
  const fetchPosts = useCallback(async () => {
    try {
      setPostsLoading(true);
      setError(null);
      
      const filters = getFilters();
      const params = {
        platform: 'CH',
        page: filters.page,
        perPage: filters.perPage,
        orderBy: filters.orderBy,
        orderDir: filters.orderDir
      };

      // Add optional filters
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category_slug = filters.category;
      if (filters.tag) params.tag = filters.tag;
      if (filters.featured) params.featured = filters.featured;
      if (filters.visibility) params.visibility = filters.visibility;

      const response = await blogApi.getPosts(params);
      
      if (response.status === 'success') {
        setPosts(response.data.data || []);
        setPagination(response.data);
      } else {
        setError('Failed to load blog posts');
        setPosts([]);
        setPagination(null);
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(err.message || 'Failed to load blog posts');
      setPosts([]);
      setPagination(null);
    } finally {
      setPostsLoading(false);
    }
  }, [getFilters]);

  // Fetch blog categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await blogApi.getCategories({ platform: 'CH' });
      if (response.status === 'success') {
        setCategories(response.data || []);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Don't set error for categories as it's not critical
    }
  }, []);

  // Fetch featured posts
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(false);

  const fetchFeaturedPosts = useCallback(async (limit = 5) => {
    try {
      setFeaturedLoading(true);
      const response = await blogApi.getFeaturedPosts(limit);
      if (response.status === 'success') {
        setFeaturedPosts(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching featured posts:', err);
    } finally {
      setFeaturedLoading(false);
    }
  }, []);

  // Search posts
  const searchPosts = useCallback(async (query, additionalFilters = {}) => {
    try {
      setPostsLoading(true);
      setError(null);
      
      const response = await blogApi.searchPosts(query, additionalFilters);
      if (response.status === 'success') {
        setPosts(response.data.data || []);
        setPagination(response.data);
      }
    } catch (err) {
      console.error('Error searching posts:', err);
      setError(err.message || 'Search failed');
    } finally {
      setPostsLoading(false);
    }
  }, []);

  // Get posts by category
  const getPostsByCategory = useCallback(async (categorySlug, additionalParams = {}) => {
    try {
      setPostsLoading(true);
      setError(null);
      
      const response = await blogApi.getPostsByCategory(categorySlug, additionalParams);
      if (response.status === 'success') {
        setPosts(response.data.data || []);
        setPagination(response.data);
      }
    } catch (err) {
      console.error('Error fetching category posts:', err);
      setError(err.message || 'Failed to load category posts');
    } finally {
      setPostsLoading(false);
    }
  }, []);

  // Get posts by tag
  const getPostsByTag = useCallback(async (tag, additionalParams = {}) => {
    try {
      setPostsLoading(true);
      setError(null);
      
      const response = await blogApi.getPostsByTag(tag, additionalParams);
      if (response.status === 'success') {
        setPosts(response.data.data || []);
        setPagination(response.data);
      }
    } catch (err) {
      console.error('Error fetching tag posts:', err);
      setError(err.message || 'Failed to load tagged posts');
    } finally {
      setPostsLoading(false);
    }
  }, []);

  // Initial data loading
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([
        fetchCategories(),
        fetchPosts()
      ]);
      setLoading(false);
    };

    initializeData();
  }, [fetchCategories, fetchPosts]);

  // Refresh data when search params change
  useEffect(() => {
    if (!loading) {
      fetchPosts();
    }
  }, [searchParams, fetchPosts, loading]);

  return {
    // Data
    posts,
    categories,
    pagination,
    featuredPosts,
    
    // Loading states
    loading,
    postsLoading,
    featuredLoading,
    
    // Error state
    error,
    
    // Current filters
    filters: getFilters(),
    
    // Actions
    fetchPosts,
    fetchCategories,
    fetchFeaturedPosts,
    searchPosts,
    getPostsByCategory,
    getPostsByTag,
    
    // Utility functions
    refreshData: () => {
      fetchPosts();
      fetchCategories();
    }
  };
};

/**
 * Hook for managing individual blog post data
 */
export const useBlogPost = (idOrSlug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async () => {
    if (!idOrSlug) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await blogApi.getPost(idOrSlug);
      if (response.status === 'success') {
        setPost(response.data);
      } else {
        setError('Post not found');
        setPost(null);
      }
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setError(err.message || 'Failed to load blog post');
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [idOrSlug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return {
    post,
    loading,
    error,
    refetch: fetchPost
  };
};

export default useBlog;