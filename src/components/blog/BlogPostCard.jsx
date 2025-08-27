import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, UserIcon, TagIcon, EyeIcon } from '@heroicons/react/24/outline';

const BlogPostCard = ({ post, showFeaturedBadge = true, className = '' }) => {
  if (!post) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtmlTags = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  const getExcerpt = () => {
    if (post.excerpt) return post.excerpt;
    if (post.content) {
      const plainText = stripHtmlTags(post.content);
      return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
    }
    return '';
  };

  return (
    <article className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      {/* Thumbnail */}
      <div className="relative">
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <EyeIcon className="w-16 h-16 text-white opacity-50" />
          </div>
        )}
        
        {/* Featured Badge */}
        {showFeaturedBadge && post.is_featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          </div>
        )}

        {/* Visibility Badge */}
        {post.visibility === 'members_only' && (
          <div className="absolute top-4 right-4">
            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Members Only
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        {post.category && (
          <div className="mb-3">
            <Link
              to={`/blog/category/${post.category.slug}`}
              className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
            >
              {post.category.name}
            </Link>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link
            to={`/blog/${post.slug}`}
            className="hover:text-green-600 transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {getExcerpt()}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <TagIcon className="w-4 h-4 text-gray-500" />
              {post.tags.slice(0, 3).map((tag, index) => (
                <Link
                  key={index}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
              {post.tags.length > 3 && (
                <span className="text-sm text-gray-400">+{post.tags.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-1">
                <UserIcon className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
            )}

            {/* Published Date */}
            {post.published_at && (
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{formatDate(post.published_at)}</span>
              </div>
            )}
          </div>

          {/* Read More Link */}
          <Link
            to={`/blog/${post.slug}`}
            className="text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;