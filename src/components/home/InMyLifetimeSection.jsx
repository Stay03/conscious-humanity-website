import React from 'react';

/**
 * InMyLifetimeSection Component
 * Features a modern, professional design with improved visual hierarchy,
 * subtle animations, and better spacing
 */
const InMyLifetimeSection = () => {
  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
       
        
        {/* Content container with shadow and subtle hover effect */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Text column */}
            <div className="w-full lg:w-1/2 p-6 md:p-10 lg:border-r border-gray-100 flex flex-col justify-center">
              <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center">
            In My Lifetime...
          </h2>
                <p className="text-gray-700 leading-relaxed py-4">
                  I have seen the Berlin wall come down, a dictatorship toppled through social media, apartheid dismantled…all through people coming together to heal segregation and in the celebration of diversity in oneness.
                </p>
                
                <p className="text-gray-700 leading-relaxed mt-4">
                  We can have World Peace. It begins with you…your dedication to finding Inner Peace. Only when you…<span className="font-semibold text-green-700">Unlock your Limitless Potentials and Live your Purpose</span> can you be at Peace. With CHI you can discover the boundless capacities within you and know what you have come here to do.
                </p>
                
                <p className="text-gray-700 leading-relaxed mt-4">
                  Through Peace you gain access to an infinite supply of creative energy; easily finding solutions, pathways and answers for all your life goals and desires. <span className="font-semibold text-green-700">Peace is the Path to Being your Best Self &amp; Living your Best Life!</span>
                </p>
              </div>
              
             
            </div>
            
            {/* Video column with overlay effect */}
            <div className="w-full lg:w-1/2 bg-gray-900">
              <div className="relative aspect-video lg:h-full">
                {/* Video container */}
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/MBnj-rf1Yk4" 
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                
               
              </div>
            </div>
          </div>
        </div>
        
        {/* Visual element - dots pattern (optional) */}
        <div className="hidden md:block absolute right-0 transform translate-x-1/2 -translate-y-1/4">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-green-200"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InMyLifetimeSection;