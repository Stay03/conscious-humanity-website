import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { blogApi } from '../../services/api/blogService';
import { FolderIcon } from '@heroicons/react/24/outline';

const BlogCategories = ({ className = '' }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  
  const activeCategorySlug = searchParams.get('category');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await blogApi.getCategories();
      if (response.status === 'success') {
        setCategories(response.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FolderIcon className="w-5 h-5" />
            Categories
          </h3>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FolderIcon className="w-5 h-5" />
            Categories
          </h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FolderIcon className="w-5 h-5" />
          Categories
        </h3>
        
        <div className="space-y-2">
          {/* All Categories Link */}
          <Link
            to="/blog"
            className={`block px-4 py-2 rounded-lg transition-colors ${
              !activeCategorySlug
                ? 'bg-green-100 text-green-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>All Categories</span>
            </div>
          </Link>

          {/* Individual Categories */}
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/blog?category=${category.slug}`}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                activeCategorySlug === category.slug
                  ? 'bg-green-100 text-green-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{category.name}</span>
                {category.published_posts_count !== undefined && (
                  <span className="text-sm text-gray-400">
                    ({category.published_posts_count})
                  </span>
                )}
              </div>
              {category.description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {category.description}
                </p>
              )}
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">
            No categories available
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogCategories;