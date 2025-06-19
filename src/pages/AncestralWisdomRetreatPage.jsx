import React from 'react';
import AncestralWisdomRetreatImage from '../assets/ancestral-wisdom.webp';
import IshmaelTettehImage from '../assets/ish.webp';

const AncestralWisdomRetreatPage = () => {
  return (
    <div className="w-full bg-gradient-to-b from-white to-amber-50">
      {/* --- Hero Section with parallax effect --- */}
      <div className="relative w-full h-[650px] overflow-hidden">
        {/* Background image with modern overlay gradient */}
        <div className="absolute inset-0 w-full h-full bg-fixed" 
             style={{
               backgroundImage: `url(${AncestralWisdomRetreatImage})`,
               backgroundPosition: 'center',
               backgroundSize: 'cover',
               backgroundAttachment: 'fixed'
             }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white leading-tight">
                Ancestral Wisdom <span className="text-amber-400">Virtual Retreat</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-white opacity-90 mb-8">
                Connect with Your Ancestors to Transform Your Life
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="course/ancestral-wisdom-virtual-retreat-6OoMC" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105 shadow-lg text-center"
                >
                  Register Now - Full Payment
                </a>
                <a 
                  href="course/ancestral-wisdom-virtual-retreat-with-payment-plan-57pEP" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105 shadow-lg text-center"
                >
                  Register Now - Payment Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Section --- */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Intro with speaker image on right */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="md:w-3/5">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Are you ready to connect with your Ancestors to help transform your life?
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              <strong>The wisdom and attainment of your ancestors is available for your inheritance. You chose that line of incarnation for a definite reason.</strong>
            </p>
            <div className="mt-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                In this two-part Master Class with African Mystic and Teacher of Nature, Bro. Ishmael Tetteh, you will learn how to connect with the rich heritage of your ancestors and tap into their wisdom for sustainability, resilience, and spiritual well-being.
              </p>
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="relative">
              {/* Main image */}
              <img 
                src={IshmaelTettehImage} 
                alt="Bro. Ishmael Tetteh" 
                className="rounded-2xl shadow-2xl z-10 relative mx-auto w-full max-w-md object-cover"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-full h-full bg-amber-400 rounded-2xl -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-amber-600 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Benefits List - redesigned as a modern card grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            What You Will Learn
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Benefit Cards */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-gray-800">
                Connect with the rich heritage of your ancestors and tap into their wisdom for sustainability, resilience, and spiritual well-being.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="text-gray-800">
                Heal the Ancestral rift of shame and guilt between races.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-800">
                Discover your ancestral character and identity and let this help you chart your own course in a more harmonious, supported and less traumatic ways.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-gray-800">
                Forge ahead in life through the harnessing of the accumulated wisdom and spiritual energy of your ancestors.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <p className="text-gray-800">
                Stand on the sacred achievements and failures of your ancestors and use them as a springboard to achieve greater heights.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-gray-800">
                Request protection from your ancestors.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-gray-800">
                Put on the mind of your ancestors and tap into their energy field to reveal and enhance your gifts.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-800">
                Become a better ancestor for future generations.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <p className="text-gray-800 font-medium">
                And more!
              </p>
            </div>
          </div>
        </div>

        {/* Important Notice - redesigned with a modern alert style */}
        <div className="mb-16">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-8 shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-red-800 mb-2">Important Notice</h4>
                <p className="text-lg text-gray-800 leading-relaxed">
                  This retreat is sacred and powerful. The information taught is to assist you in navigating and growing through these times we are living in. It is not work to be abused or taken lightly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inspirational Quotes - redesigned with modern quote styling */}
        <div className="mb-16">
          <div className="relative py-12 px-6 bg-gradient-to-r from-amber-100 to-amber-50 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 text-amber-200 opacity-30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            <div className="relative z-10 space-y-8 text-center">
              <blockquote className="text-xl md:text-2xl font-medium text-amber-800 italic">
                "Life is one organic whole. Connect yourself with your ancestors and save yourself from having to re-invent the wheel. Use this connection to Expand your Life."
              </blockquote>
              
              <blockquote className="text-xl md:text-2xl font-medium text-amber-800 italic">
                "You are the answer to your Ancestor's prayers."
              </blockquote>
              
              <blockquote className="text-xl md:text-2xl font-medium text-amber-800 italic">
                "Seek their assistance in making your dreams come true."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Event Details - redesigned with modern card styling */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t border-gray-100">
            <div className="bg-green-600 py-6">
              <h3 className="text-2xl font-bold text-white text-center">Event Details</h3>
            </div>
            
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* When */}
              <div className="p-8 text-center">
                <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">When</h4>
                <p className="text-gray-800 font-medium mb-3">
                  <span className="block mb-1">Saturday, October 2</span>
                  <span className="block">Saturday, October 9, 2021</span>
                </p>
                <p className="text-gray-600">
                  9 a.m. to Noon PST<br />
                  (11 a.m. CT / Noon ET / 4 p.m. Ghana)
                </p>
              </div>

              {/* Where */}
              <div className="p-8 text-center">
                <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Where</h4>
                <p className="text-gray-800 font-medium mb-3">
                  The Retreat will be streamed live
                </p>
                <p className="text-gray-600">
                  Log-in details to the event will be provided 48 hours prior to the date
                </p>
              </div>

              {/* Investment */}
              <div className="p-8 text-center">
                <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Self-Investment</h4>
                <p className="text-3xl font-bold text-green-600 mb-3">$150 total</p>
                <p className="text-gray-600">
                  Includes both sessions and access to the replay for 30 days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action - redesigned with modern CTA styling */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-12 shadow-xl text-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6">
                Transform Your Life Through Ancestral Connection
              </h3>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join this sacred journey and unlock the wisdom that has been waiting for you across generations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://ancestral-wisdom-virtual-retreat-6OoMC" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-white text-amber-600 text-lg font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-600 transform transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Register - Full Payment
                </a>
                <a 
                  href="https://ancestral-wisdom-virtual-retreat-with-payment-plan-57pEP" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-amber-600 transform transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Register - Payment Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AncestralWisdomRetreatPage;