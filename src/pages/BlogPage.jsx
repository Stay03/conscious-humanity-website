import React, { useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import { useBlog, useBlogPost } from '../hooks/useBlog';
import Breadcrumb from '../components/Breadcrumb';
import { CalendarIcon, UserIcon, TagIcon, ArrowLeftIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [searchParams] = useSearchParams();
  const { slug, categorySlug } = useParams();
  
  const isPostView = slug && !categorySlug;
  const isCategoryView = categorySlug;
  
  const blogListData = useBlog();
  const blogPostData = useBlogPost(isPostView ? slug : null);
  
  const {
    posts,
    categories,
    pagination,
    featuredPosts,
    loading,
    postsLoading,
    featuredLoading,
    error,
    filters,
    fetchFeaturedPosts
  } = blogListData;

  const { post, loading: postLoading, error: postError } = blogPostData;

  useEffect(() => {
    if (!isPostView) {
      fetchFeaturedPosts(3);
    }
  }, [fetchFeaturedPosts, isPostView]);

  if (isPostView) {
    return <BlogPostDetail post={post} loading={postLoading} error={postError} />;
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'News & Insights', href: '/blog' }
  ];

  if (filters.search) {
    breadcrumbItems.push({ label: `Search: ${filters.search}` });
  } else if (filters.category || categorySlug) {
    const categoryName = filters.category || categorySlug;
    breadcrumbItems.push({ label: categoryName });
  } else if (filters.tag) {
    breadcrumbItems.push({ label: `Tag: ${filters.tag}` });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center">
            <Spinner size="large" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              News & Insights
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Stay informed with the latest articles, insights, and stories from Conscious Humanity
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        {/* Search and Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12 p-6 bg-gray-50 rounded-xl">
          <SearchBar />
          <CategoriesFilter categories={categories} />
          <SortingFilter />
        </div>

        {/* Featured Articles Section */}
        {!filters.search && !filters.category && !filters.tag && featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Stories</h2>
              <div className="ml-4 h-px bg-gradient-to-r from-green-500 to-transparent flex-1"></div>
            </div>
            
            {featuredLoading ? (
              <FeaturedSkeleton />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Featured Article */}
                <div className="lg:col-span-2">
                  <FeaturedMainArticle post={featuredPosts[0]} />
                </div>
                
                {/* Side Featured Articles */}
                <div className="space-y-6">
                  {featuredPosts.slice(1, 3).map((post) => (
                    <FeaturedSideArticle key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Latest Articles Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {filters.search ? 'Search Results' : 'Latest Articles'}
            </h2>
            <div className="text-sm text-gray-500">
              {pagination && `${pagination.total} articles`}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
              <div className="text-red-700">{error}</div>
            </div>
          )}

          {postsLoading ? (
            <ArticlesSkeleton />
          ) : posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {posts.map((post) => (
                  <NewsArticleCard key={post.id} post={post} />
                ))}
              </div>

              {pagination && pagination.last_page > 1 && (
                <PaginationControls paginationData={pagination} />
              )}
            </>
          ) : (
            <EmptyState
              title="No articles found"
              description="No articles match your current search criteria."
              actionText="Clear Filters"
              actionHref="/blog"
            />
          )}
        </section>
      </div>
    </div>
  );
};

// Search Bar Component
const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get('search') || '');

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (query.trim()) {
      newParams.set('search', query.trim());
    } else {
      newParams.delete('search');
    }
    newParams.delete('page');
    window.location.href = `/blog?${newParams.toString()}`;
  };

  return (
    <form onSubmit={handleSearch} className="flex-1">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
    </form>
  );
};

// Categories Filter Component
const CategoriesFilter = ({ categories }) => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  const handleCategoryChange = (categorySlug) => {
    const newParams = new URLSearchParams(searchParams);
    if (categorySlug) {
      newParams.set('category', categorySlug);
    } else {
      newParams.delete('category');
    }
    newParams.delete('page');
    window.location.href = `/blog?${newParams.toString()}`;
  };

  return (
    <div className="min-w-48">
      <select
        value={currentCategory || ''}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// Sorting Filter Component
const SortingFilter = () => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('orderBy') || 'published_at';
  const currentDir = searchParams.get('orderDir') || 'desc';

  const handleSortChange = (sortValue) => {
    const [orderBy, orderDir] = sortValue.split('-');
    const newParams = new URLSearchParams(searchParams);
    newParams.set('orderBy', orderBy);
    newParams.set('orderDir', orderDir);
    newParams.delete('page');
    window.location.href = `/blog?${newParams.toString()}`;
  };

  return (
    <div className="min-w-48">
      <select
        value={`${currentSort}-${currentDir}`}
        onChange={(e) => handleSortChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <option value="published_at-desc">Latest First</option>
        <option value="published_at-asc">Oldest First</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
      </select>
    </div>
  );
};

// Featured Main Article Component
const FeaturedMainArticle = ({ post }) => {
  if (!post) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-64 md:h-80">
          {post.thumbnail ? (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {post.category && (
              <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                {post.category.name}
              </span>
            )}
            <h3 className="text-2xl md:text-3xl font-bold mb-3 line-clamp-2">
              {post.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-200">
              <span>{post.author?.name}</span>
              <span>•</span>
              <span>{formatDate(post.published_at)}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

// Featured Side Article Component
const FeaturedSideArticle = ({ post }) => {
  if (!post) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex">
          <div className="w-24 h-24 flex-shrink-0">
            {post.thumbnail ? (
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-500"></div>
            )}
          </div>
          <div className="p-4 flex-1">
            <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
              {post.title}
            </h4>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <span>{formatDate(post.published_at)}</span>
              {post.category && (
                <>
                  <span>•</span>
                  <span>{post.category.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

// News Article Card Component
const NewsArticleCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = () => {
    if (post.excerpt) return post.excerpt;
    if (post.content) {
      const plainText = post.content.replace(/<[^>]*>/g, '');
      return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
    }
    return '';
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="h-48 relative">
          {post.thumbnail ? (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
          {post.is_featured && (
            <span className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
              Featured
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-6">
        {post.category && (
          <Link
            to={`/blog?category=${post.category.slug}`}
            className="inline-block text-green-600 hover:text-green-700 text-sm font-medium mb-2"
          >
            {post.category.name}
          </Link>
        )}
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link to={`/blog/${post.slug}`} className="hover:text-green-600 transition-colors">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {getExcerpt()}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            <span>{post.author?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatDate(post.published_at)}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

// Pagination Component
const PaginationControls = ({ paginationData }) => {
  const [searchParams] = useSearchParams();
  const { current_page, last_page, total, from, to } = paginationData;

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    window.location.href = `/blog?${newParams.toString()}`;
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const start = Math.max(1, current_page - delta);
    const end = Math.min(last_page, current_page + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm text-gray-600">
        Showing {from} to {to} of {total} articles
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(current_page - 1)}
          disabled={current_page === 1}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            current_page === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Previous
        </button>
        
        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              page === current_page
                ? 'bg-green-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => handlePageChange(current_page + 1)}
          disabled={current_page === last_page}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            current_page === last_page
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Loading Skeletons
const FeaturedSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2">
      <div className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
    </div>
    <div className="space-y-6">
      <div className="bg-gray-200 rounded-lg h-24 animate-pulse"></div>
      <div className="bg-gray-200 rounded-lg h-24 animate-pulse"></div>
    </div>
  </div>
);

const ArticlesSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-48 bg-gray-200 animate-pulse"></div>
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
      </div>
    ))}
  </div>
);

// BlogPostDetail component for individual post view
const BlogPostDetail = ({ post, loading, error }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'News & Insights', href: '/blog' }
  ];

  if (post) {
    if (post.category) {
      breadcrumbItems.push({ 
        label: post.category.name, 
        href: `/blog?category=${post.category.slug}` 
      });
    }
    breadcrumbItems.push({ label: post.title });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">{error || "The article you're looking for doesn't exist."}</p>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />
        
        <Link
          to="/blog"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-8 font-medium transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to News
        </Link>

        <article>
          {/* Article Header */}
          <header className="mb-8">
            {post.category && (
              <Link
                to={`/blog?category=${post.category.slug}`}
                className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-4 hover:bg-green-200 transition-colors"
              >
                {post.category.name}
              </Link>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm pb-6 border-b">
              {post.author && (
                <div className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  <span className="font-medium">{post.author.name}</span>
                </div>
              )}
              
              {post.published_at && (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{formatDate(post.published_at)}</span>
                </div>
              )}
              
              {post.is_featured && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.thumbnail && (
            <div className="mb-8">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-gray prose-headings:text-gray-900 prose-a:text-green-600 hover:prose-a:text-green-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center gap-3 flex-wrap">
                <TagIcon className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Tags:</span>
                {post.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Back to Blog CTA */}
        <div className="mt-12 text-center border-t pt-8">
          <Link
            to="/blog"
            className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            Explore More Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;