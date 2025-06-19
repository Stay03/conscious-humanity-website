import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Star } from 'lucide-react';
import joyImage from './../assets/joy.jpg'; // Import the image
import coupleImage from './../assets/couple-1030744_1920.jpg'; // Import the new image
import womanWearingImage from './../assets/woman-wearing.jpg'; // Import the new image

const WellnessCenterPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [visibleElements, setVisibleElements] = useState({});
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const heroImages = [
    {
      image: joyImage,
      text: "Find Fulfilling Happiness"
    },
    {
      image: coupleImage,
      text: "Grow Your Relationship"
    },
    {
      image: womanWearingImage,
      text: "Be Inspired"
    }
  ];

  // Animation for elements when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  // Rotate hero image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Courses data
  const courses = [
    {
      title: "Happiness",
      category: "mindfulness",
      image: "https://apimagic.xyz/ethereanAPI/uploads/thumbnails/99e491bd-d997-4552-9849-dd41e90630c2.jpg",
      link: "course/happiness-zXd3T",
      description: "Discover lasting fulfillment through the expression of your innate virtues, moving beyond temporary material satisfaction.",
      longDescription: "Happiness is the quest of life. Everybody is seeking to be happy. Often happiness is sought for externally in material things. This happiness is short lived. When we seek happiness where is can be found it is long lasting. True happiness is not about seeking the good things in life but the good things you will be for life.",
      rating: 4.9
    },
    {
      title: "Finance",
      category: "practical",
      image: "https://apimagic.xyz/ethereanAPI/uploads/thumbnails/5f1943c7-fdf2-4859-8087-7872d6254708.png",
      link: "course/finance-XspRo",
      description: "Heal your relationship with money and success to better serve your purpose and find abundance.",
      longDescription: "The ultimate purpose of everyone is to be in service for the promotion of life. There is an innate drive to be of service. Many people have conflicts with financial progress and success because of their past injuries. This programming makes it difficult to succeed.",
      rating: 4.7
    },
    {
      title: "Relationships",
      category: "connection",
      image: "https://apimagic.xyz/ethereanAPI/uploads/thumbnails/4af49e35-787e-476b-8034-8cec38ae2e86.jpg",
      link: "course/relationships-AAb1g",
      description: "Master relationship dynamics starting with understanding yourself and how you connect with others.",
      longDescription: "Life depends on relationship! All of life grows and flourishes by relationship. From conception through birth through life you are bound to relate. You have no choice…Life is about relating and interconnection. If you don't not have a clear understanding of the anatomy and dynamics of relationship, then it causes pain.",
      rating: 4.8
    },
    {
      title: "Inspiration",
      category: "mindfulness",
      image: "https://apimagic.xyz/ethereanAPI/uploads/thumbnails/42293f22-ca54-4ba6-a363-eda854967de2.jpg",
      link: "course/inspiration-dr756",
      description: "Refresh, recharge and renew your spirit with daily practices that bring you back to balance.",
      longDescription: "Inspiration is The Breath Of Life. Throughout the day we experience negative and positive vibrations that affect us and our energy. At the end of every day it is useful to cleanse your psyche and refresh, recharge and renew.",
      rating: 4.6
    },
    {
      title: "Meditation & Empowerment",
      category: "mindfulness",
      image: "https://apimagic.xyz/ethereanAPI/uploads/thumbnails/a12b99ec-e9ec-48c0-a6c2-f2af0fd0e409.jpg",
      link: "course/meditation-and-empowerment-92h22",
      description: "Access Nature's Wisdom through meditation technologies that deliver precise, predictable results.",
      longDescription: "Meditation is the Key to all Spiritual, Social, Psychological, Physical and the Financial attainments. It is the needed attention you give to any area of your life to contemplate on to find inner solutions.",
      rating: 4.9
    }
  ];

  const filteredCourses = activeTab === 'all'
    ? courses
    : courses.filter(course => course.category === activeTab);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <div className="relative w-full h-screen max-h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-yellow-700 opacity-90"></div>
        <img src={heroImages[currentHeroIndex].image} alt={heroImages[currentHeroIndex].text} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              {heroImages[currentHeroIndex].text}
            </h1>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Intro Text Section */}
        <div
          id="intro-section"
          className={`animate-on-scroll transition-all duration-1000 ease-out transform ${
            visibleElements['intro-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } max-w-4xl mx-auto text-center mb-20`}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to the Wellness Center</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
         


Where you can find the inspiration, motivation, and wellbeing techniques to live a life of Purpose, Power, Prosperity and Peace.
There are limitless innate potentials within you. These resources will help you to access and activate the immense and vast abilities that await your expression!

The Wellness Center supports you to return you to your inner balance so that you are centered in alignment with the universe. The simple tools and techniques you find here will connect you to nature’s healing forces and tap you into the frequencies needed for fortification…evolving to your greatest yet to be.

Here are tools for Healthy & Purpose-filled Living!
          </p>
          <div className="mt-10 inline-block border-b-2 border-green-600 pb-1 text-green-700 font-medium">
            Tools for Healthy & Purpose-filled Living
          </div>
        </div>

        {/* Course Filter Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeTab === 'all'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Programs
            </button>
            <button
              onClick={() => setActiveTab('mindfulness')}
              className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeTab === 'mindfulness'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Mindfulness
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeTab === 'practical'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Practical Skills
            </button>
            <button
              onClick={() => setActiveTab('connection')}
              className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeTab === 'connection'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Connection
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <div
              key={index}
              id={`course-card-${index}`}
              className={`animate-on-scroll transition-all duration-700 delay-${index * 100} transform ${
                visibleElements[`course-card-${index}`]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden group">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 text-yellow-600 px-2 py-1 rounded-md flex items-center text-sm font-medium">
                    <Star className="h-4 w-4 mr-1 fill-yellow-500 stroke-yellow-500" />
                    {course.rating}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{course.description}</p>
                  <a
                    href={course.link}
                    className="inline-flex items-center justify-center w-full bg-green-50 text-green-700 font-medium py-2 px-4 rounded-lg hover:bg-green-100 transition-colors duration-300 mt-auto group"
                  >
                    Explore Course
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <a href="courses" className="inline-flex items-center text-green-700 font-medium hover:text-green-800 transition-colors duration-300">
            View all wellness programs
            <ChevronRight className="ml-1 h-5 w-5" />
          </a>
        </div>
      </div>

    
    </div>
  );
};

export default WellnessCenterPage;
