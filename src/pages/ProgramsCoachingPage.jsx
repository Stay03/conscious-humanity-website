import React, { useState, useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/auth/AuthModal';
import MailingListModal from '../components/common/MailingListModal';
import MarryMcPherson from '../assets/image6-300x400.webp';

const ProgramsCoachingPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMailingListModalOpen, setIsMailingListModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Animation for elements when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  // --- CTA Handlers ---
  const handleBecomeMemberClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      console.log("User is already logged in.");
      // navigate('/profile');
    }
  };

  const handleMakeDonationClick = () => {
    navigate('/donate');
  };

  const handleJoinMailingListClick = () => {
    setIsMailingListModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    // navigate('/welcome'); 
  };

  const handleCloseMailingListModal = () => {
    setIsMailingListModalOpen(false);
  };

  // Programs data
  const programs = [
    {
      title: "The 3 Mystical Truths",
      image: "https://apimagic.xyz/ethereanAPI/uploads/e1ea901b-3bc5-485f-be57-5274ab7b46d6.png",
      link: "three-mystical-truths",
      description: "The 3 Mystical Truths are simple Principles of Nature and Practices that radically change your life. These truths bring you in tune with Life's intentions for you. This program is an initiation that will change your life forever."
    },
    {
      title: "Cosmic Emergence",
      image: "https://apimagic.xyz/ethereanAPI/uploads/thumbnails/8a5a854f-6390-42d6-8af7-56dc19b6c436.jpg",
      link: "course/cosmic-emergence-jEAGr",
      description: "You emerged from this great, magnificent universe and you carry the essence of the universe. Just like the wave that emerges from the ocean, carries all the attributes of the ocean."
    },
    {
      title: "Essential Life Education (ELED)",
      image: "https://apimagic.xyz/ethereanAPI/uploads/thumbnails/71571f2b-85cf-4451-af89-924fffbb1c8d.png",
      link: "course/essential-life-education-VAmdp",
      description: "Essential Life Education (ELED) is a self-discovery program. A journey of self-awareness. Life is about relationships. How can we be harmonious with and know others if we aren't fully aware of ourselves?."
    },
    {
      title: "Growing the Empowered Child",
      image: "https://apimagic.xyz/ethereanAPI/uploads/thumbnails/a424807d-a1a7-4c7a-af75-0713192bc25a.png",
      link: "course/growing-the-empowered-child-program-ef2Oh",
      description: "Growing the Empowered Child program is a study of how to raise children who are awakened to and celebrate their innate uniqueness. An Empowered Child is one who has a high degree of self-worth. This child is happy, healthy, responsible and creative."
    },
    {
      title: "Cosmic Emergence Facilitator (CEF)",
      image: "https://apimagic.xyz/ethereanAPI/uploads/thumbnails/93ebd232-8677-4793-a05b-5d4d85c9c1d7.png",
      link: "course/cosmic-emergence-facilitator-cef-7zY5c",
      description: "Cosmic Emergence Facilitator (CEF) program helps assimilate the Cosmic Emergence Program Material to be able to successfully impart it to others and lead others to their own awakening of who and what they are."
    },
    {
      title: "Soul Processing",
      image: "https://apimagic.xyz/ethereanAPI/uploads/thumbnails/f17fb533-c298-45fd-8003-cf113f35123f.png",
      link: "course/soul-processing-L6xLg",
      description: "You don't have anything until you have yourself. Soul Processing is a Master Breakthrough Technology. A special science developed by African Mystic, Brother Ishmael Tetteh. It is matchless in its Power to emancipate you from your negative thinking and inner griefs. Liberate your Soul so that you can shine and know you are worthy!"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      image: "https://apimagic.xyz/ethereanAPI/uploads/89237394-cb20-4a1c-8947-04495792b070.webp",
      quote: "Bro. Ishmael teachings are so simple, powerful, life and energy expanding.",
      author: "Marry McPherson",
      location: "Dana Point, CA"
    },
    {
      image: "https://apimagic.xyz/ethereanAPI/uploads/09c93987-56b1-4c76-9d20-d5fd1da62fbf.webp",
      quote: "Many Teachers will take you to the Door of Enlightenment. Bro. Ishmael's teaching gives you the key",
      author: "Johnathan Khorsandi",
      location: "Business Consultant, San Diego, CA"
    },
    {
      image: "https://apimagic.xyz/ethereanAPI/uploads/c2e90ff0-79df-4d71-856a-6e3350514fbc.webp",
      quote: "Dr. Tetteh's wisdom teachings will support you in untying the knots of doubt, fear, worry and misunderstanding that bind you. As you attune yourself to the evolutionary impulse governing the universe, you will begin to glow with insights, blessings and benedictions. Expect a deep down involution, and an introduction to your next level of evolution. Above all, celebrate with great joy the journey homeward within.",
      author: "Michael Bernard Beckwith",
      location: "Founder of Agape International, Los Angeles, CA"
    },
    {
      image: "https://apimagic.xyz/ethereanAPI/uploads/3d5cbd5c-ba48-43ba-afbc-b0a4ecadf358.webp",
      quote: "The Mystical Explosion Retreat is a life transforming, mind expanding and soul enriching experience.",
      author: "Emmanuel Lartey",
      location: "Professor, Emory University, Atlanta, GA"
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-yellow-800"></div>
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Programs & Coaching</h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Unlock Your Inner Potential and Find Peace
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Intro Text Section */}
        <div 
          id="intro-section" 
          className="animate-on-scroll transition-opacity duration-1000 max-w-4xl mx-auto text-center mb-20"
        >
          <p className="text-xl text-gray-700 leading-relaxed">
            All that you have been seeking... All that you want is already within you. You possess infinite innate potentialities, just waiting for you to activate them. They lie dormant, not fully expressed until you do. Conscious Humanity's programs and soul processing sessions give you strategies to tune into your power and unlock the wealth of resources, capabilities and capacities within you. They are designed for you to realize your life purpose…what life is seeking to do as you… and give you the tools to access and harness all that you discover is already within you. These strategies will guide you to create new habits, practices, and thought patterns. So you can live a life on purpose, in power, that prospers and be at peace.
          </p>
        </div>

        {/* Programs Section */}
        <div 
          id="programs-section" 
          className="animate-on-scroll transition-all duration-1000 mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Transformative Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <a 
                    href={program.link} 
                    className="inline-flex items-center text-green-600 font-medium hover:text-green-700"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div 
          id="testimonials-section" 
          className="animate-on-scroll transition-all duration-1000 mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What People Are Saying</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center"
              >
                <div className="md:w-1/3 flex-shrink-0">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="rounded-lg shadow-md w-full h-auto max-w-xs mx-auto"
                  />
                </div>
                <div className="md:w-2/3">
                  <blockquote className="text-gray-700 italic mb-4">"{testimonial.quote}"</blockquote>
                  <div className="font-medium text-gray-900">– {testimonial.author}</div>
                  <div className="text-gray-600">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Call to Action Section --- */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Begin Your Transformation?</h2>
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">Join the Conscious Humanity Movement!</h3>
            
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto mb-10">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">With your free membership you will receive:</h4>
              <ul className="text-left space-y-3 text-lg text-gray-700 mb-8">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">+</span>
                  <span className="italic">Free Empowerment Download</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">+</span>
                  <span className="italic">Access to our Online Wellness Center</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">+</span>
                  <span className="italic">Brother Ishmael Tetteh's Tour Dates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">+</span>
                  <span className="italic">Inspiration and Transformation Delivered to Your Inbox</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">+</span>
                  <span className="italic">And More</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={handleBecomeMemberClick} 
                className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Become a Member
              </button>
              <button  
                onClick={handleMakeDonationClick}
                className="px-8 py-3 bg-white text-green-600 font-medium rounded-md border border-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Make a Donation
              </button>
              <button  
                onClick={handleJoinMailingListClick}
                className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Join Our Mailing List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Render AuthModal --- */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        onAuthSuccess={handleAuthSuccess}
        initialTab="register"
      />

      {/* --- Render MailingListModal --- */}
      <MailingListModal 
        isOpen={isMailingListModalOpen}
        onClose={handleCloseMailingListModal}
      />
    </div>
  );
};

export default ProgramsCoachingPage;