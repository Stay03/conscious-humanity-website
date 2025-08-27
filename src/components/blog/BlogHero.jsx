import React from 'react';
import { useSearchParams } from 'react-router-dom';

const BlogHero = () => {
  const [searchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('search');
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');

  const getTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    }
    if (category) {
      return `Category: ${category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
    }
    if (tag) {
      return `Posts Tagged: ${tag}`;
    }
    return 'Conscious Humanity Blog';
  };

  const getSubtitle = () => {
    if (searchQuery) {
      return 'Discover insights, wisdom, and transformative content';
    }
    if (category || tag) {
      return 'Explore our collection of articles and insights';
    }
    return 'Explore insights, wisdom, and transformative content on consciousness, spirituality, and human potential';
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {getTitle()}
          </h1>
          
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            {getSubtitle()}
          </p>

          {/* Search/Filter Badges */}
          {(searchQuery || category || tag) && (
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {searchQuery && (
                <span className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                  🔍 Search: {searchQuery}
                </span>
              )}
              {category && (
                <span className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                  📁 Category: {category}
                </span>
              )}
              {tag && (
                <span className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                  🏷️ Tag: {tag}
                </span>
              )}
            </div>
          )}

          {/* Call to Action (only for main blog page) */}
          {!searchQuery && !category && !tag && (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#latest-posts"
                className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-full hover:bg-green-50 transition-colors duration-300 shadow-lg"
              >
                Explore Latest Posts
              </a>
              <a
                href="#featured-posts"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-700 transition-colors duration-300"
              >
                Featured Articles
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-8 lg:h-12 text-gray-50"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default BlogHero;