import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, Users, School, Globe } from 'lucide-react';

// Import images
import HeroImage from '../assets/image3-scaled.jpg';
import ChildrenImage from '../assets/image2-scaled.jpg';
import SchoolImage from '../assets/image-scaled.jpg';

const GrowingEmpoweredChildPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [donationAmount, setDonationAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState(false);

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

  // Progress bar data
  const goalAmount = 2000000;
  const raisedAmount = 750000; // Example amount for demonstration
  const progressPercentage = Math.min((raisedAmount / goalAmount) * 100, 100);

  // Impact statistics
  const impactStats = [
    { icon: <Users className="h-8 w-8 text-green-600" />, value: "500+", label: "Children Empowered" },
    { icon: <School className="h-8 w-8 text-green-600" />, value: "$2M", label: "Fundraising Goal" },
    { icon: <Globe className="h-8 w-8 text-green-600" />, value: "1", label: "Model School" }
  ];

  // Donation amount options
  const donationOptions = [50, 100, 250, 500, 1000];

  // Handle donation amount selection
  const handleDonationSelect = (amount) => {
    setCustomAmount(false);
    setDonationAmount(amount);
  };

  // Handle custom donation amount
  const handleCustomDonationChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setDonationAmount(value);
    } else {
      setDonationAmount(0);
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-screen max-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={HeroImage} 
            alt="Empowered children smiling" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Growing the Empowered Child School
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Building a foundation for the next generation of empowered, confident, and creative leaders
            </p>
            <a 
              href="#donate-section" 
              className="inline-block px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-md hover:bg-green-700 transition-colors duration-300 shadow-lg"
            >
              Donate Now
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Vision Section */}
        <div 
          id="vision-section" 
          className="animate-on-scroll transition-opacity duration-1000 opacity-0 max-w-4xl mx-auto text-center mb-20"
          style={{ opacity: isVisible['vision-section'] ? 1 : 0 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Vision</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            We see a world of Children free of anger, greed, doubt, and fear who know their value and worth because they honor and celebrate their uniqueness! Empowered children are confident, creative, happy, responsible, have a drive for excellence, all while knowing they are here for the betterment of humanity.
          </p>
          <div className="flex justify-center">
            <div className="w-20 h-1 bg-green-600 rounded"></div>
          </div>
        </div>

        {/* Impact Stats */}
        <div 
          id="impact-section" 
          className="animate-on-scroll transition-all duration-1000 mb-20 opacity-0 transform translate-y-10"
          style={{ 
            opacity: isVisible['impact-section'] ? 1 : 0,
            transform: isVisible['impact-section'] ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* About the Project */}
        <div 
          id="about-section" 
          className="animate-on-scroll transition-all duration-1000 mb-20 opacity-0 transform translate-y-10"
          style={{ 
            opacity: isVisible['about-section'] ? 1 : 0,
            transform: isVisible['about-section'] ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Project</h2>
              <p className="text-lg text-gray-700 mb-6">
                The school will run the GEC curriculum with age/grade specific modules, processes, and empowerment games. Essential Life Education (ELED), Bro. Ishmael's master course for self, life, and relationship mastery will be at the core of the curriculum. ELED lays the foundation for the creation of a human-centered society.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Raising empowered children for the future is our goal. Empowered Children become dependable, caring, confident, resourceful Adults and are the key to World Peace and a world that works for everyone.
              </p>
              <p className="text-lg font-semibold text-green-700">
                We know we can grow these children because the Growing the Empowered Child (GEC) Program has been running for many decades through Etherean Mission, Ghana. We have grown 100's of children from impoverished and marginalized backgrounds into Empowered Adults who have become doctors, lawyers, CEO's, business owners, etc.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={ChildrenImage} 
                alt="Children learning together" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* The School Project */}
        <div 
          id="school-section" 
          className="animate-on-scroll transition-all duration-1000 mb-20 opacity-0 transform translate-y-10"
          style={{ 
            opacity: isVisible['school-section'] ? 1 : 0,
            transform: isVisible['school-section'] ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={SchoolImage} 
                alt="School building site" 
                className="w-full h-auto"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The School Project</h2>
              <p className="text-lg text-gray-700 mb-6">
                <span className="text-2xl font-bold text-green-700 block mb-4">It's time to turn this program into a School!</span>
                The Growing the Empowered Child School will cultivate liberated, courageous, self-assured youth, to create a world of healthy, happy, dedicated, dependable adults who work to make an inclusive world where everyone is nurtured and supported to live their best self and life!
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Etherean Mission, in Ghana, Africa has acquired the land to build the school. The cost of building, classroom furniture & equipment, school supplies, etc., is estimated to be $2,000,000.00. With these funds we will build a model school that can be replicated in other regions and countries.
              </p>
              <div className="text-2xl font-bold text-center text-green-700 mt-8">
                Will you help us?
              </div>
            </div>
          </div>
        </div>


        {/* Donation Form */}
        <div 
          id="donate-section" 
          className="animate-on-scroll transition-all duration-1000 opacity-0 transform translate-y-10"
          style={{ 
            opacity: isVisible['donate-section'] ? 1 : 0,
            transform: isVisible['donate-section'] ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Make Your Donation</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Select Amount</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                {donationOptions.map((amount) => (
                  <button
                    key={amount}
                    className={`py-3 px-4 rounded-md border font-medium transition-all duration-200 ${
                      donationAmount === amount && !customAmount 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                    }`}
                    onClick={() => handleDonationSelect(amount)}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  id="custom-amount"
                  type="checkbox"
                  checked={customAmount}
                  onChange={() => setCustomAmount(!customAmount)}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label htmlFor="custom-amount" className="ml-2 text-gray-700">
                  Custom Amount
                </label>
              </div>
              
              {customAmount && (
                <div className="mb-6">
                  <label htmlFor="donation-amount" className="block text-gray-700 mb-2">
                    Enter Amount (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      id="donation-amount"
                      value={donationAmount === 0 ? '' : donationAmount}
                      onChange={handleCustomDonationChange}
                      className="pl-8 pr-4 py-3 block w-full border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter amount"
                      min="1"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-center">
              <a 
                href={`donate?project=growing-the-empowered-child-school&amount=${donationAmount}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-md hover:bg-green-700 transition-colors duration-300 shadow-lg"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </a>
            </div>
            
            {/* <p className="text-center text-gray-600 mt-6">
              Your donation is tax-deductible to the extent allowed by law.
            </p> */}
          </div>
        </div>
      </div>

   
    </div>
  );
};

export default GrowingEmpoweredChildPage;