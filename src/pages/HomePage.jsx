import React, { memo } from 'react';
import HeroSlider from '../components/home/HeroSlider';
import MarqueeSlider from '../components/home/MarqueeSlider';
import EventsSlider from '../components/home/EventsSlider';
import FeaturedSection from '../components/home/FeaturedSection';
import VisitUsSection from '../components/home/VisitUsSection';
import InMyLifetimeSection from '../components/home/InMyLifetimeSection';
import ThreeMysticalTruthsSection from '../components/home/ThreeMysticalTruthsSection';
import PodcastSection from '../components/home/PodcastSection'; 
import TestimonialsSection from '../components/home/TestimonialsSection'; // Import the new component
import useBanners from '../hooks/useBanner';
import useFreeCourses from '../hooks/useFreeCourses';
import bitSmilesImage from '../assets/BIT-Smiles.png';

/**
 * HomePage Component
 * Manages all sections of the home page, including data fetching
 */
const HomePage = () => {
  // Fetch banners for hero slider
  const { 
    banners, 
    isLoading: bannersLoading, 
    error: bannersError 
  } = useBanners({
    page: 1,
    platform: 'CH',
    status: 'active',
    current: true,
    orderBy: 'display_order',
    orderDir: 'asc'
  });

  // Fetch free courses for featured section using custom hook
  const {
    courses: freeCourses,
    isLoading: courseLoading,
    error: courseError
  } = useFreeCourses({ limit: 4 });

  return (
    <div className="w-full">
      {/* Hero section - Full width and full height */}
      <div className="w-full relative h-screen bg-white">
        <HeroSlider 
          banners={banners} 
          isLoading={bannersLoading} 
          error={bannersError} 
        />
      </div>
      
      {/* CTA Section - Full width white background */}
      <div className="w-full bg-white py-16 cta-area style-2">
        <div className="max-w-4xl mx-auto px-4">
          <div className="section-title">
            <div className="sec-content">
              <p className="title text-gray-800
                text-4xl leading-tight tracking-tighter
                sm:text-5xl sm:leading-snug
                md:text-5xl md:leading-relaxed
                lg:text-6xl lg:leading-tight lg:tracking-tight
                xl:text-center 2xl:text-center">
                  Our Mission is World Peace in Our Lifetime. The Path to World Peace is through You. Finding Inner Peace.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Other sections */}
      <MarqueeSlider />

      {/* Welcome Section */}
      <div className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            {/* Image on left - responsive sizing */}
            <div className="w-full md:w-1/2 lg:w-2/5">
              <img 
                src={bitSmilesImage} 
                alt="Brother Ishmael Tetteh smiling" 
                className="w-full h-auto rounded-lg "
              />
            </div>
            
            {/* Text on right */}
            <div className="w-full md:w-1/2 lg:w-3/5">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                Welcome to Conscious Humanity
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Conscious Humanity has tools, based on the African Mystic, Brother Ishmael Tetteh's indigenous teachings, 
                to guide and show you how to create the life you have longed to live. 
                <span className="block mt-4">
                  We see a World where Everyone is Conscious of their Purpose. Only when you know your Purpose, 
                  can you find Peace.
                </span>

                <span className="block mt-4">
                People at Peace, create a World at Peace.
                </span>

                <span className="block mt-4">
                We are Here to Create that World and glad you have come. We Invite You to this Movement – to Be a Conscious Humanitarian
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <InMyLifetimeSection />
      
      <FeaturedSection 
        featuredItems={freeCourses} 
        isLoading={courseLoading}
        error={courseError}
      />
      
      <EventsSlider />
      
      <ThreeMysticalTruthsSection />
      
      <PodcastSection />
      
      {/* Add the new TestimonialsSection component here */}
      <TestimonialsSection />
      
    </div>
  );
};

export default memo(HomePage);