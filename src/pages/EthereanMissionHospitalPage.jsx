import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, Activity, PlusCircle, Leaf, Lightbulb } from 'lucide-react';

// Import images
import HeroImage from '../assets/image9.png';
import HolisticImage from '../assets/image10.png';
import HospitalImage from '../assets/image11-1.png';
import StaffImage from '../assets/imageb.png';
import Sakaman from '../assets/sakaman.jpg';

const EthereanMissionHospitalPage = () => {
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
  const goalAmount = 6500000;
  const raisedAmount = 1000000;
  const progressPercentage = Math.min((raisedAmount / goalAmount) * 100, 100);

  // Impact statistics
  const impactStats = [
    { icon: <Activity className="h-8 w-8 text-teal-600" />, value: "3", label: "Specialized Floors" },
    { icon: <PlusCircle className="h-8 w-8 text-teal-600" />, value: "$6.5M", label: "Fundraising Goal" },
    { icon: <Leaf className="h-8 w-8 text-teal-600" />, value: "4", label: "Healing Approaches" }
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
            src={Sakaman} 
            alt="Etherean Mission Hospital Complex" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Etherean Mission Hospital Complex
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Adding Life to Your Years and Years to Your Life
            </p>
            <a 
              href="#donate-section" 
              className="inline-block px-8 py-4 bg-teal-600 text-white font-bold text-lg rounded-md hover:bg-teal-700 transition-colors duration-300 shadow-lg"
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
            We added the word "complex" because we are more than a hospital. EMHC goes beyond just curing diseases but empowering people to live holistically. Each patient's whole life is brought into consideration and every person is empowered through programs and remedies to live holistically, healthfully and in harmony with nature.
          </p>
          <div className="flex justify-center">
            <div className="w-20 h-1 bg-teal-600 rounded"></div>
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

        {/* About the Hospital */}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About EMHC</h2>
              <p className="text-lg text-gray-700 mb-6">
                In approaching health holistically, EMHC has discovered many therapies not implemented in a traditional hospital. EMHC's Naturopathic, Elemental, Herbal and Spiritual Treatments have been active for many years.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We are known throughout Accra, Ghana as being able to heal many illnesses that allopathic medicine has been at a loss to cure. People come from all over Ghana for EMHC's treatments as it has a reputation of being able to help what a regular hospital cannot.
              </p>
              <p className="text-lg font-semibold text-teal-700">
                The person is treated on every level. There are 3 floors in the hospital, the bottom floor is Naturopathic/Herbal Medicine, The middle floor is allopathic, and the top floor is spiritual healing that includes 24-hour prayer.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={HolisticImage} 
                alt="Holistic healing approach" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* The Hospital Complex */}
        <div 
          id="hospital-section" 
          className="animate-on-scroll transition-all duration-1000 mb-20 opacity-0 transform translate-y-10"
          style={{ 
            opacity: isVisible['hospital-section'] ? 1 : 0,
            transform: isVisible['hospital-section'] ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={HospitalImage} 
                alt="Hospital building" 
                className="w-full h-auto"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Holistic Approach</h2>
              <p className="text-lg text-gray-700 mb-6">
                We have a vision of all types of medicines working together holistically. Allopathic may sometimes be the best course while it also will provide the research laboratory to prove the effectiveness of the Natural, Elemental, and Spiritual Medicines.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                When the hospital is fully complete it will be a model of what a hospital should be. A Hospital that treats the whole person. We are all of spirit, mind, feeling and body and people should be empowered to live holistically for optimal health and overall well being.
              </p>
              <div className="text-xl font-bold text-teal-700 mt-8">
                Science has shown that health is more than just physiological. Disease/illness are often caused by our psychology, emotions and psyches, etc. Some illnesses are simply due to our lifestyle choices—physical, mental, emotional, social and even spiritual choices.
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Methods */}
        <div 
          id="treatment-section" 
          className="animate-on-scroll transition-all duration-1000 mb-20 opacity-0 transform translate-y-10"
          style={{ 
            opacity: isVisible['treatment-section'] ? 1 : 0,
            transform: isVisible['treatment-section'] ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Our Comprehensive Treatment Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                EMHC's focus is on: Adding Life to Your Years and Years to Your Life. The solutions, what are called cures must go beyond drugs and surgeries to treat the whole person.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                EMHC combines:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Leaf className="h-6 w-6 text-teal-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-lg">
                    <strong className="text-teal-700">Natural Medicine</strong> - herbal, balms, oils, elixirs, etc.
                  </span>
                </li>
                <li className="flex items-start">
                  <Lightbulb className="h-6 w-6 text-teal-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-lg">
                    <strong className="text-teal-700">Elemental Medicine</strong> - such as solar (Sun) therapy, water therapy, earth therapy, breathing exercises, etc.
                  </span>
                </li>
                <li className="flex items-start">
                  <Heart className="h-6 w-6 text-teal-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-lg">
                    <strong className="text-teal-700">Spiritual Treatments</strong> - such as Soul Processing, light healing, sound healing, prayer, psychic healing, and energy healing.
                  </span>
                </li>
                <li className="flex items-start">
                  <Activity className="h-6 w-6 text-teal-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-lg">
                    <strong className="text-teal-700">Allopathic Medicine</strong> - standard western medicine, such as surgeries and pharmaceuticals, research laboratory, etc.
                  </span>
                </li>
              </ul>
              <p className="text-lg font-medium text-gray-800">
                We have added <span className="text-teal-700 font-bold">Years to your life</span> because your illness will be treated, and we have added <span className="text-teal-700 font-bold">Life to your Years</span> because we added value to your life.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={StaffImage} 
                alt="EMHC medical staff" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Donation Progress */}
        <div 
          id="progress-section" 
          className="animate-on-scroll transition-all duration-1000 mb-16 opacity-0"
          style={{ opacity: isVisible['progress-section'] ? 1 : 0 }}
        >
          <div className="bg-gray-50 rounded-xl p-8 shadow-md">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Fundraising Progress</h2>
            
            <div className="mb-4 flex justify-between text-lg font-medium">
              <span>${(raisedAmount/1000000).toFixed(1)}M Raised</span>
              <span>Goal: ${(goalAmount/1000000).toFixed(1)}M</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-6 mb-6">
              <div 
                className="bg-teal-600 h-6 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="text-center text-gray-700 mb-8">
              <p className="text-lg">
                With your donation we can complete the hospital. The goal is to fully develop the allopathic medicine and research laboratory floor, expand the Naturopathic clinic, acquire all necessary equipment and furnishings and hire more staff.
              </p>
              <p className="text-lg mt-4">
                This will allow the facility to be open daily and better serve an area that does not have a hospital in its region.
              </p>
            </div>
          </div>
        </div>

        {/* Our Impact */}
        <div 
          id="impact-details-section" 
          className="animate-on-scroll transition-all duration-1000 mb-20 opacity-0 transform translate-y-10"
          style={{ 
            opacity: isVisible['impact-details-section'] ? 1 : 0,
            transform: isVisible['impact-details-section'] ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">A Model for Healthcare Worldwide</h2>
          <div className="bg-gray-50 rounded-xl p-8 shadow-md">
            <p className="text-lg text-gray-700 mb-6 text-center">
              We can be THE MODEL for healthcare worldwide:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-teal-600 font-bold text-lg mb-2">Proving Validity</div>
                <p className="text-gray-700">
                  Proving the validity of the herbal, elemental, and spiritual remedies
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-teal-600 font-bold text-lg mb-2">Holistic Treatment</div>
                <p className="text-gray-700">
                  Demonstrating the importance of treating the whole person
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-teal-600 font-bold text-lg mb-2">Lifestyle Medicine</div>
                <p className="text-gray-700">
                  Introducing Lifestyle Medicine for holistic well-being for the future
                </p>
              </div>
            </div>
            <p className="text-lg text-center font-medium text-teal-700">
              Each person who is treated at EMHC leaves knowing they must live a life of value for themselves and their community. Healing is beyond the body and EMHC is here to prove it that with optimal well-being we can have healthy bodies and a healthy world.
            </p>
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
                        ? 'bg-teal-600 text-white border-teal-600' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-teal-500'
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
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
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
                      className="pl-8 pr-4 py-3 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter amount"
                      min="1"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-center">
              <a 
                href={`donate?project=etherean-mission-hospital-complex&amount=${donationAmount}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 text-white font-bold text-lg rounded-md hover:bg-teal-700 transition-colors duration-300 shadow-lg"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </a>
            </div>
{/*             
            <p className="text-center text-gray-600 mt-6">
              Your donation is tax-deductible to the extent allowed by law.
            </p> */}
          </div>
        </div>
      </div>

    </div>
  );
};

export default EthereanMissionHospitalPage;