import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Download, ExternalLink } from 'lucide-react'; // Added Download, ExternalLink
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/auth/AuthModal';

// Assuming images are correctly imported
import PeaceImage from '../assets/Peace.jpg';
import BooksImage from '../assets/Artworks_Books-1-1280x812.png';
import PeaceManual from '../assets/THE-PEACE-MANUAL-300x200-1.webp';
import KeyImage from '../assets/IshT.webp';
import ParallaxImage from '../assets/paralax.png'; // Added parallax image

// Define reusable button styles
const primaryButtonClasses = "inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-300 ease-in-out";
const secondaryButtonClasses = "inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white font-medium rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-colors duration-300 ease-in-out";
const downloadButtonClasses = "inline-flex items-center justify-center px-6 py-3 border border-emerald-600 text-emerald-700 font-medium rounded-lg shadow-sm hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 transition-colors duration-300 ease-in-out"; // Example Tertiary/Download style

const PeacePage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 } // Slightly lower threshold for earlier trigger
    );

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxSection = document.getElementById('section-one');
      
      if (parallaxSection) {
        const rect = parallaxSection.getBoundingClientRect();
        const sectionTop = rect.top + scrolled;
        const sectionHeight = rect.height;
        
        // Only apply parallax when section is in viewport
        if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
          const parallaxSpeed = 0.5; // Adjust this value to control parallax intensity
          const yPos = (scrolled - sectionTop) * parallaxSpeed;
          setParallaxOffset(yPos);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThreeKeysClick = () => {
    navigate('/course/three-keys-to-world-peace-X2lNO');
  };

  const handleDownloadClick = () => {
    // Use a real download link or trigger mechanism
    window.open('http://worldpeaceinourlifetime.com/the-peace-manual/', '_blank'); // Keeping placeholder
  };

  // Call to action handlers
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

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    // navigate('/welcome'); 
  };

  // Reusable animation classes
  const animationClasses = (id) =>
    `transition-all duration-1000 ease-out ${isVisible[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;

  return (
    <div className="w-full bg-white text-slate-700">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] min-h-[400px] overflow-hidden mb-20">
        <img
          src={PeaceImage}
          alt="Abstract representation of peace"
          className="absolute inset-0 w-full h-full object-cover object-left "
        />
        {/* More subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        {/* <div className="absolute inset-0 bg-emerald-900/60"></div> */}
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${animationClasses('hero-text')}`} id="hero-text">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              The Path to Peace
            </h1>
            <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto">
              Discover the profound connection between inner harmony and global tranquility.
            </p>
          </div>
        </div>
      </div>

      {/* Section One: Introduction with Parallax */}
      <section
        id="section-one"
        className="relative py-32 lg:py-40 px-4 sm:px-6 lg:px-8 animate-on-scroll overflow-hidden min-h-screen flex items-center"
      >
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${ParallaxImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed', // This creates the parallax effect
            transform: `translateY(${parallaxOffset}px)`,
          }}
        />
        
        {/* Gray Overlay */}
        <div className="absolute inset-0 bg-gray-900/90"></div>
        
        {/* Content Container */}
        <div className={`relative z-10 max-w-4xl mx-auto w-full ${animationClasses('section-one')}`}>
          {/* Modern Card Container */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20">
            {/* Minimalist Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto mb-6 rounded-full"></div>
              <h2 className="text-4xl lg:text-5xl font-light text-slate-900 mb-4 tracking-tight">
                How Do You Attain 
                <span className="block font-medium text-emerald-700 mt-2">Inner Peace?</span>
              </h2>
            </div>

            {/* Content Grid */}
            <div className="space-y-8">
              {/* Main Content */}
              <div className="text-lg text-slate-600 leading-relaxed space-y-6 font-light">
                <p>
                  Everyone craves Peace. Yet for most of us it is fleeting. You may have moments of feeling at peace but most of the time the hectic nature of life has you in a rush, anxious, feeling like you can't keep up… overwhelmed and unfulfilled. Life seems to be a series of events, demands, conflicts, all seeming to preventing you from being at Peace. Today Peace seems like a rare commodity. Seemingly impossible to obtain. Something you want but seldom experience and you hardly ever come across people who seem to be at Peace. As you listen to the news from around the world you find the possibility of peace more and more remote…How is world Peace Possible?
                </p>
              </div>

              {/* Modern Quote Card */}
              <div className="relative">
                <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-2xl p-8 border-l-4 border-emerald-500 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-light">"</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <blockquote className="text-slate-800 text-xl font-light italic leading-relaxed mb-4">
                        I have the Formula for World Peace! It starts with the Activation of your Inner Potentials!
                      </blockquote>
                      <cite className="text-slate-600 font-medium not-italic text-sm tracking-wide">
                        — Brother Ishmael Tetteh
                      </cite>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Section Two: Inner Peace -> World Peace - News Article Style */}
      <section
        id="section-two"
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 animate-on-scroll bg-gray-50"
      >
        <div className={`max-w-7xl mx-auto ${animationClasses('section-two')}`}>
       

          {/* Article Layout Container */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Article Content */}
            <article className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-lg p-8 lg:p-10">
                {/* Lead Paragraph */}
                <div className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8 font-light">
                  <p className="first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-emerald-600">
                    The Way to Achieve Inner Peace is to Know You. Know Yourself! When you know who and what you are, your attention turns away from the so called rat race.
                  </p>
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p>
                    Knowing You, you feel fulfilled and powerful. You experience harmony in relationships. You have positive influence in life and you realize your purpose. Knowing your purpose awakens your hidden potentials, aligns you with your power, unleashes prosperity and grounds you in Peace.
                  </p>
                  
                  <p>
                    Another key to knowing you in understanding the Laws of Nature that surround you, that are operating daily, even if you aren't consciously aware of them. So learn these laws; be able to observe and use them to create the life of you have always imagined.
                  </p>

                  {/* Pull Quote */}
                  <blockquote className="border-l-4 border-emerald-500 pl-6 my-8 py-4 bg-emerald-50/50 rounded-r-lg">
                    <p className="text-xl text-emerald-900 font-medium italic">
                      "Knowing your purpose awakens your hidden potentials, aligns you with your power, unleashes prosperity and grounds you in Peace."
                    </p>
                  </blockquote>

                  <p>
                    <strong>Essential Life Education</strong> (ELED) will guide you to knowing who and what you are, to be at peace with yourself, your family, your neighbourhood, the world. ELED is the key to life and relationship mastery. The Way Forward will reveal the Principles of Nature and will show you how to live in harmony with yourself and with life.
                  </p>

                  <p>
                    You can find these books in our store. ELED in also a program available online.
                  </p>
                </div>
              </div>
            </article>

            {/* Sidebar - Recommended Resources */}
            <aside className="lg:w-1/3">
              <div className="lg:sticky lg:top-8">
                {/* Recommended Resources Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
             
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Image */}
                    <div className="mb-6">
                      <img
                        src={BooksImage}
                        alt="Essential Life Education resources"
                        className="rounded-lg w-full h-48 object-cover"
                      />
                    </div>
                    
                    {/* ELED Section */}
                    <div className="mb-6 pb-6 border-b border-slate-200">
                      <h4 className="text-lg font-bold text-slate-800 mb-2">
                        Essential Life Education (ELED)
                      </h4>
                      <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                        A comprehensive program guiding you to self-discovery and peace. Master life and relationships through proven principles.
                      </p>
                      <Link
                        to="/product/essential-life-education-jGyIT"
                        className="block w-full text-center px-4 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                      >
                        Access ELED Program
                        <ArrowRight className="inline-block ml-2 h-4 w-4" />
                      </Link>
                    </div>
                    
                    {/* The Way Forward Section */}
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-slate-800 mb-2">
                        The Way Forward
                      </h4>
                      <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                        Discover Nature's Principles and learn how to live in harmony with yourself and life. A transformative guide to peaceful living.
                      </p>
                      <Link
                        to="/store" // Update this to the correct product link when available
                        className="block w-full text-center px-4 py-2.5 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors duration-200"
                      >
                        Get The Way Forward
                        <ArrowRight className="inline-block ml-2 h-4 w-4" />
                      </Link>
                    </div>
                 
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Section Three: Quote Section */}
      <section
        id="section-three"
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 animate-on-scroll bg-white"
      >
        <div className={`max-w-7xl mx-auto ${animationClasses('section-three')}`}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Image */}
            <div className="lg:w-1/3 flex justify-center">
              <img
                src={KeyImage}
                alt="Brother Ishmael Tetteh"
                className="rounded-xl shadow-2xl w-full max-w-sm h-auto transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            
            {/* Quote Content */}
            <div className="lg:w-2/3">
              <div className="relative">
                <div className="absolute -top-4 -left-4 text-8xl text-emerald-200 font-serif">"</div>
                <blockquote className="relative z-10 text-xl md:text-2xl text-slate-700 font-light leading-relaxed italic mb-8 pl-8">
                  In my life time, I have seen the cold war dissolved; I have seen the Berlin wall come down; I have seen Apartheid dismantled; I have seen a man of colour in the White House; and I have seen grassroots movements topple governments through social media. In our lifetime, we can together heal segregation redirect civilization to the celebration of Diversity in Oneness.
                </blockquote>
                <div className="pl-8">
                  <cite className="text-emerald-700 font-semibold text-lg not-italic">
                    — Brother Ishmael Tetteh
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Four: The Peace Manual */}
      <section
        id="section-four"
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 animate-on-scroll bg-slate-50" // Alternating background
      >
        <div className={`max-w-7xl mx-auto ${animationClasses('section-four')}`}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text first on large screens */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                The Peace Manual: A Blueprint
              </h2>
              <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
  <p>
To accomplish anything we have to first believe that it is possible. Once we believe it is possible we must have a vision of what it looks like. Conscious Humanity knows World Peace is Possible! We would like to show you how.  </p>
  <p>
Beyond food, clothing, and shelter the desire of every person is to be at peace. The Peace Manual traces the fundamental barriers, identifies 3 keys, and provides a model to achieve peace. Conscious Humanitarians dedicated to achieving inner peace and world peace.  </p>
  <p>
Based on 45 years of research into understanding the human condition, Brother Ishmael Tetteh, discovered the causes of suffering. His goal is to provide solutions to misery and move the world to peace. The Peace Manual is a guide on how to establish Peace in the world.  </p>

  {/* Download Button */}
  <div className="mt-8">
    <button
      onClick={handleDownloadClick}
      className={downloadButtonClasses} // Use defined style
    >
      <Download className="mr-2 h-5 w-5" />
      Download The Peace Manual
    </button>
  </div>
</div>

            </div>
             {/* Image */}
            <div className="lg:w-1/3 flex justify-center">
              <img
                  src={PeaceManual}
                  alt="The Peace Manual book cover"
                  className="rounded-lg shadow-xl w-full max-w-xs h-auto transform transition-transform duration-300 hover:scale-105" // Added hover effect
                />
            </div>
          </div>
        </div>
      </section>

      {/* Section Five: Three Keys to World Peace - News Article Style */}
      <section
        id="section-five"
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 animate-on-scroll bg-white"
      >
        <div className={`max-w-7xl mx-auto ${animationClasses('section-five')}`}>
          {/* Article Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
              <BookOpen className="mr-2 h-4 w-4" />
              Course Available
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Three Keys to World Peace
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto"></div>
          </div>

          {/* Article Layout Container */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Article Content */}
            <article className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12 border border-slate-100">
                {/* Lead Paragraph */}
                <div className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8 font-light">
                  <p className="first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-emerald-600">
                    To Achieve World Peace we must be in Harmony within ourselves, Harmony with Others and Harmony with Life. To achieve Harmony…. You must first have a Vision for Peace.
                  </p>
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
                  {/* Key 1: Vision for Peace */}
                  <div className="bg-emerald-50/50 rounded-lg p-6 border-l-4 border-emerald-500">
                    <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                      <span className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                      Vision for Peace
                    </h3>
                    <p>
                      And ask what does Peace look like? What is Peace? Define it. Hold a vision of world peace that everyone will say yes to and want to be part of it. You need to have a vision that will enroll everyone. For example, at Etherean Mission (Bro. Ishmael's Ghana and UK centers) their collective peace vision is that of "a unified world in which everyone is a catalyst that is activating and promoting the innate good in one another. Where everyone is promoting each other's highest good. A world in which everyone and everything is flourishing and that is a world that looks like peace". You cannot not bring something to fruition without holding a vision of what it looks like? So what is your vision of World Peace?
                    </p>
                  </div>

                  {/* Key 2: Character for Peace */}
                  <div className="bg-amber-50/50 rounded-lg p-6 border-l-4 border-amber-500">
                    <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
                      <span className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                      Character for Peace
                    </h3>
                    <p>
                      Then you must have a Character for Peace. Your character comes from your innate self, your upbringing, your culture. When you are centered in knowing how you are coded, you settle into your Character then you come to Inner Peace. Knowing your character gives you a sense of identity. Without a sense of identity you are lost and can't feel at Peace. When you have a sense of identity and know your character (what are encoded with) and express these qualities, you are empowered, centered and little disturbs you. You then have a Character for Peace.
                    </p>
                  </div>

                  {/* Key 3: Senses Schooled for Peace */}
                  <div className="bg-blue-50/50 rounded-lg p-6 border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                      <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                      Senses Schooled for Peace
                    </h3>
                    <p>
                      Our five senses of sight, smell, taste touch, and hearing need to be schooled for Peace. The Core Drive within everybody is 'to be more'. We want to achieve. This drive to achieve and be more expresses through our 5 senses. The senses because they are outwardly focused perceive differences and see separation; creating a sense of lack and isolation. They do not experience that all of life's elements are there to complement, work with, and support one another. The senses then delineate life's elements as one being superior to the other. This better than or less than mentality, causes pain, confusion and conflict. The senses have to be schooled to see the oneness that expresses as the infinite multiplicity. So you still see and enjoy the multiplicity, the uniqueness, the individuality, while you see the oneness and the reciprocal support life's elements give to one another. So your language will even change from better than to better with, greater than to greater with, power over to power with…when you stand in Oneness and school the senses for peace, conflict, lack, limitation, separation and confusion banish and Inner Peace dawns.
                    </p>
                  </div>

                  {/* Conclusion */}
                  <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                    <p className="text-slate-700 font-medium">
                      To master these requires both learning and practice, CHI has the teachings and tools to reveal Peace as your very life and essence.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar - Course Information */}
            <aside className="lg:w-1/4">
              <div className="lg:sticky lg:top-8">
                {/* Course Call-to-Action Card */}
                <div className="bg-gradient-to-br from-emerald-500 to-amber-500 rounded-xl shadow-xl overflow-hidden text-white">
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 text-white/90" />
                      <h4 className="text-xl font-bold mb-2">
                        Master the Three Keys
                      </h4>
                      <p className="text-white/90 text-sm leading-relaxed">
                        Join our comprehensive course and learn how to achieve harmony within yourself and with the world.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-white/90">
                        <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Interactive Learning Experience</span>
                      </div>
                      <div className="flex items-center text-sm text-white/90">
                        <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Practical Tools & Techniques</span>
                      </div>
                      <div className="flex items-center text-sm text-white/90">
                        <ArrowRight className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Step-by-Step Guidance</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleThreeKeysClick}
                      className="w-full mt-6 px-6 py-3 bg-white text-emerald-700 font-bold rounded-lg shadow-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-500 transition-all duration-300 transform hover:scale-105"
                    >
                      Start Course Now
                      <ArrowRight className="inline-block ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the Conscious Humanity Movement! And Be at Peace</h2>
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">Sign Up to be a Conscious Humanitarian!</h3>
            
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
            </div>
          </div>
        </div>
      </section>

      {/* Render AuthModal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        onAuthSuccess={handleAuthSuccess}
        initialTab="register"
      />

       {/* Optional Footer Section (Placeholder) */}
      {/*
      <footer className="bg-slate-800 text-slate-300 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} Conscious Humanity. All rights reserved.</p>
          {/* Add navigation, social links, etc. * /}
        </div>
      </footer>
      */}
    </div>
  );
};

export default PeacePage;