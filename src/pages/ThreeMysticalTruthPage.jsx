import React, { useState } from 'react';
import { ScrollText, Users, Calendar, BookOpen, Star, Award, ArrowRight } from 'lucide-react';
import HeaderImage from '../assets/Artworks_3MT-1.png';

// Define plan links for easier management
const planLinks = {
  regular: {
    standard1: 'course/three-mystical-truths-standard-1-yt40s',
    standard2: 'course/three-mystical-truths-regular-standard-1-EeTRe',
    standard3: 'course/three-mystical-truths-regular-standard-3-P5pua',
    standard4: 'course/three-mystical-truths-regular-standard-4-XaGcO',
  },
  advanced: {
    advanced1: 'course/three-mystical-truths-advanced-1-0Ozrf',
    advanced2: 'course/three-mystical-truths-advanced-2-Scy26',
    advanced3: 'course/three-mystical-truths-advanced-3-VLwZj',
    advanced4: 'course/three-mystical-truths-advanced-4-f9b1D',
  },
  patron: {
    patron1: 'course/three-mystical-truths-patron-1-GJfBK',
    patron2: 'course/three-mystical-truths-patron-2-wahdM',
    patron3: 'course/three-mystical-truths-patron-3-69cu5',
    patron4: 'course/three-mystical-truths-patron-4-ibkXm',
  },
};

export default function ThreeMysticalTruthsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubscription, setActiveSubscription] = useState('regular');
  // State to hold the link of the selected plan
  const [selectedPlan, setSelectedPlan] = useState(null); // Initially null

  // Function to handle subscription tab change and reset plan selection
  const handleSubscriptionTabChange = (subscriptionType) => {
    setActiveSubscription(subscriptionType);
    setSelectedPlan(null); // Reset selected plan when changing levels
  };

  // Helper function to generate class names for plan boxes
  const getPlanBoxClasses = (planLink) => {
    const baseClasses = "border rounded-md p-6 text-center cursor-pointer transition-all duration-150 ease-in-out shadow-sm hover:shadow-md";
    const selectedClasses = "border-2 border-green-600 ring-2 ring-green-500 ring-offset-2 bg-green-50 shadow-lg scale-105";
    const unselectedClasses = "border-gray-200 hover:bg-gray-100 hover:border-gray-300";
    return `${baseClasses} ${selectedPlan === planLink ? selectedClasses : unselectedClasses}`;
  };

  // Helper function to generate class names for the subscribe button/link
  const getSubscribeButtonClasses = () => {
    const baseClasses = "inline-block px-8 py-4 bg-green-600 text-white text-lg font-medium rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200";
    const enabledClasses = "hover:bg-green-700 hover:shadow-lg transform hover:scale-105";
    const disabledClasses = "opacity-50 cursor-not-allowed";
    return `${baseClasses} ${selectedPlan ? enabledClasses : disabledClasses}`;
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section - Green Theme */}
      <div className="relative pt-10 w-full h-80 bg-green-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-700 opacity-90"></div>
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
          
        >
        </div>        <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">The Three Mystical Truths</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            An initiation that will change your life forever through simple principles of Nature
            that empower you and bring you in tune with Life's intentions.
          </p>
        </div>
      </div>

      {/* Course Overview Info */}
      <div className="max-w-6xl mx-auto px-0 py-8"> {/* Added px-4 here for consistency */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            {/* Using overflow-x-auto for potentially many tabs on small screens */}
            <nav className="flex overflow-x-auto whitespace-nowrap">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 sm:px-6 py-4 text-sm font-medium flex-shrink-0 ${ // Added flex-shrink-0
                  activeTab === 'overview'
                    ? 'border-b-2 border-green-600 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`px-4 sm:px-6 py-4 text-sm font-medium flex-shrink-0 ${ // Added flex-shrink-0
                  activeTab === 'curriculum'
                    ? 'border-b-2 border-green-600 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Curriculum
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {/* --- MODIFIED PADDING --- */}
          <div className="px-4 py-6 md:p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Original Overview Content */}
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">What is the 3MT Program?</h2>
                    <p className="text-gray-600 mb-4">
                      Through these Mystical Truths, this program connects you to your Higher Source, a Higher Power and a Higher Purpose.
                      You discover you. The power and prosperity of the universe that is within you. We come from a living, creative,
                      intelligence and loving universe. It brought us here from itself, seeking to be more of itself as you.
                    </p>
                    <p className="text-gray-600 mb-4">
                      To touch Source, to touch ultimate reality is to embrace who you are and what you are. When you know who you are
                      as a product of Nature and are nourished by source, your life will become a constant experience of love, health,
                      wealth, and every good.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100 mt-6">
                      <h3 className="font-medium text-green-800 mb-2">Course Format</h3>
                      <p className="text-gray-700">
                        For 3 consecutive months, through ½ hour conference calls, Bro. Ishmael will guide us in one of the 3 Mystical Truths.
                        Every 4th month is a month for us to go deeper with the practices and teachings.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-100">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Join 3MT?</h3>
                      <ul className="space-y-3">
                        <li className="flex">
                          <Star className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">Align yourself with your life purpose</span>
                        </li>
                        <li className="flex">
                          <Star className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">Enhance your evolution for a fulfilling life</span>
                        </li>
                        <li className="flex">
                          <Star className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">Make right choices for a meaningful life</span>
                        </li>
                        <li className="flex">
                          <Star className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">Connect and align with the Natural Law</span>
                        </li>
                        <li className="flex">
                          <Star className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">Activate your Spiritual Software</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* --- Subscription Level Content with Enhanced CTA Buttons --- */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Choose Your Subscription Level & Plan</h2>

                  {/* Enhanced Subscription Tabs (within Overview) - Green Active State */}
                  {/* flex-wrap handles responsiveness automatically here */}
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
                    <button
                      onClick={() => handleSubscriptionTabChange('regular')}
                      className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 shadow-sm ${
                        activeSubscription === 'regular'
                          ? 'bg-green-600 text-white shadow-md transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
                      }`}
                    >
                      Regular <span className="hidden sm:inline">($25-$49/mo)</span>
                      <span className="sm:hidden">($25+)</span>
                    </button>
                    <button
                      onClick={() => handleSubscriptionTabChange('advanced')}
                      className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 shadow-sm ${
                        activeSubscription === 'advanced'
                          ? 'bg-green-600 text-white shadow-md transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
                      }`}
                    >
                      Advanced <span className="hidden sm:inline">($50-$99/mo)</span>
                      <span className="sm:hidden">($50+)</span>
                    </button>
                    <button
                      onClick={() => handleSubscriptionTabChange('patron')}
                      className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 shadow-sm ${
                        activeSubscription === 'patron'
                          ? 'bg-green-600 text-white shadow-md transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
                      }`}
                    >
                      Patron <span className="hidden sm:inline">($100+/mo)</span>
                      <span className="sm:hidden">($100+)</span>
                    </button>
                  </div>

                  {/* Regular Subscription */}
                  {activeSubscription === 'regular' && (
                    <div className="bg-white rounded-xl overflow-hidden yellow">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-6">
                        <h3 className="text-2xl font-bold text-white">Regular Subscription</h3>
                        <p className="text-green-100 text-lg">Minimum Monthly Donation of $25.00 – $49.00</p>
                      </div>
                      <div className="p-6 md:p-8"> {/* Adjusted padding */}
                        <ul className="space-y-4 mb-8 text-base md:text-lg"> {/* Adjusted text size */}
                           <li className="flex items-start"> {/* Changed to items-start */}
                            <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1"> {/* Added flex-shrink-0 */}
                              <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-600"></div>
                            </div>
                            <span>Daily 3MT Conference Calls</span>
                          </li>
                           <li className="flex items-start"> {/* Changed to items-start */}
                            <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1"> {/* Added flex-shrink-0 */}
                              <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-600"></div>
                            </div>
                            <span>Downloadable Recordings for you to keep</span>
                          </li>
                           <li className="flex items-start"> {/* Changed to items-start */}
                            <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1"> {/* Added flex-shrink-0 */}
                              <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-600"></div>
                            </div>
                            <span>Monthly Alignment by Bro. Ishmael and the Inner Circle Mystics</span>
                          </li>
                        </ul>

                        <h4 className="font-semibold text-gray-800 text-xl mb-6 text-center">Select a Plan:</h4>
                        {/* --- RESPONSIVE GRID --- */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {/* Tier 1 */}
                          <div
                            className={getPlanBoxClasses(planLinks.regular.standard1)}
                            onClick={() => setSelectedPlan(planLinks.regular.standard1)}
                          >
                            <p className="font-medium text-gray-800 text-base md:text-lg">Standard 1</p>
                            <p className="text-green-600 font-bold text-xl md:text-2xl mt-2">$25/month</p>
                          </div>
                          {/* Tier 2 */}
                          <div
                            className={getPlanBoxClasses(planLinks.regular.standard2)}
                            onClick={() => setSelectedPlan(planLinks.regular.standard2)}
                          >
                            <p className="font-medium text-gray-800 text-base md:text-lg">Standard 2</p>
                            <p className="text-green-600 font-bold text-xl md:text-2xl mt-2">$35/month</p>
                          </div>
                          {/* Tier 3 */}
                          <div
                            className={getPlanBoxClasses(planLinks.regular.standard3)}
                            onClick={() => setSelectedPlan(planLinks.regular.standard3)}
                          >
                            <p className="font-medium text-gray-800 text-base md:text-lg">Standard 3</p>
                            <p className="text-green-600 font-bold text-xl md:text-2xl mt-2">$40/month</p>
                          </div>
                          {/* Tier 4 */}
                          <div
                            className={getPlanBoxClasses(planLinks.regular.standard4)}
                            onClick={() => setSelectedPlan(planLinks.regular.standard4)}
                          >
                            <p className="font-medium text-gray-800 text-base md:text-lg">Standard 4</p>
                            <p className="text-green-600 font-bold text-xl md:text-2xl mt-2">$45/month</p>
                          </div>
                        </div>

                        <div className="mt-12 text-center">
                          <a
                            href={selectedPlan || '#'}
                            className={getSubscribeButtonClasses()}
                            onClick={(e) => !selectedPlan && e.preventDefault()}
                            aria-disabled={!selectedPlan}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Subscribe Now {selectedPlan && <ArrowRight className="inline h-5 w-5 ml-2" />}
                          </a>
                          {!selectedPlan && <p className="text-sm text-gray-500 mt-3">Please select a plan above</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Advanced Subscription */}
                  {activeSubscription === 'advanced' && (
                    <div className="bg-white rounded-xl overflow-hidden yellow">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-6">
                        <h3 className="text-2xl font-bold text-white">Advanced Subscription</h3>
                        <p className="text-green-100 text-lg">Minimum Monthly Donation of $50.00 – $99.00</p>
                      </div>
                      <div className="p-6 md:p-8"> {/* Adjusted padding */}
                        <p className="text-gray-700 mb-4 text-base md:text-lg"> {/* Adjusted text size */}
                          Includes all Regular benefits, plus:
                        </p>
                        <ul className="space-y-4 mb-8 text-base md:text-lg"> {/* Adjusted text size */}
                           <li className="flex items-start"> {/* Changed to items-start */}
                            <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1"> {/* Added flex-shrink-0 */}
                              <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-600"></div>
                            </div>
                            <span>Personal Mystic Assigned to you to work on you monthly</span>
                          </li>
                           <li className="flex items-start"> {/* Changed to items-start */}
                            <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1"> {/* Added flex-shrink-0 */}
                              <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-600"></div>
                            </div>
                            <span>Mystical Prayer Support for special requests</span>
                          </li>
                        </ul>

                        <h4 className="font-semibold text-gray-800 text-xl mb-6 text-center">Select a Plan:</h4>
                         {/* --- RESPONSIVE GRID --- */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {/* Tier 1 */}
                          <div
                            className={getPlanBoxClasses(planLinks.advanced.advanced1)}
                            onClick={() => setSelectedPlan(planLinks.advanced.advanced1)}
                          >
                            <p className="font-medium text-gray-800 text-base md:text-lg">Advanced 1</p>
                            <p className="text-green-600 font-bold text-xl md:text-2xl mt-2">$50/month</p>
                          </div>
                          {/* Tier 2 */}
                          <div
                            className={getPlanBoxClasses(planLinks.advanced.advanced2)}
                            onClick={() => setSelectedPlan(planLinks.advanced.advanced2)}
                          >
                            <p className="font-medium text-gray-800 text-base md:text-lg">Advanced 2</p>
                            <p className="text-green-600 font-bold text-xl md:text-2xl mt-2">$70/month</p>
                          </div>
                          {/* Tier 3 */}
                          <div
                            className={getPlanBoxClasses(planLinks.advanced.advanced3)}
                            onClick={() => setSelectedPlan(planLinks.advanced.advanced3)}
                          >
                            <p className="font-medium text-gray-800 text-base md:text-lg">Advanced 3</p>
                            <p className="text-green-600 font-bold text-xl md:text-2xl mt-2">$80/month</p>
                          </div>
                          {/* Tier 4 */}
                          <div
                            className={getPlanBoxClasses(planLinks.advanced.advanced4)}
                            onClick={() => setSelectedPlan(planLinks.advanced.advanced4)}
                          >
                            <p className="font-medium text-gray-800 text-base md:text-lg">Advanced 4</p>
                            <p className="text-green-600 font-bold text-xl md:text-2xl mt-2">$90/month</p>
                          </div>
                        </div>

                        <div className="mt-12 text-center">
                          <a
                            href={selectedPlan || '#'}
                            className={getSubscribeButtonClasses()}
                            onClick={(e) => !selectedPlan && e.preventDefault()}
                            aria-disabled={!selectedPlan}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Subscribe Now {selectedPlan && <ArrowRight className="inline h-5 w-5 ml-2" />}
                          </a>
                          {!selectedPlan && <p className="text-sm text-gray-500 mt-3">Please select a plan above</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Patron Subscription */}
                  {activeSubscription === 'patron' && (
                    <div className="bg-white rounded-xl overflow-hidden yellow">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-6">
                        <h3 className="text-2xl font-bold text-white">Patron Subscription</h3>
                        <p className="text-green-100 text-lg">Minimum Monthly Donation of $100.00 – UNLIMITED</p>
                      </div>
                       <div className="p-6 md:p-8"> {/* Adjusted padding */}
                        <p className="text-gray-700 mb-4 text-base md:text-lg"> {/* Adjusted text size */}
                          Includes all Regular & Advanced benefits, plus:
                        </p>
                        <ul className="space-y-4 mb-8 text-base md:text-lg"> {/* Adjusted text size */}
                           <li className="flex items-start"> {/* Changed to items-start */}
                            <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1"> {/* Added flex-shrink-0 */}
                              <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-600"></div>
                            </div>
                            <span>Quarterly private Soul Processing session with Brother Ishmael or one of the Mystics</span>
                          </li>
                           <li className="flex items-start"> {/* Changed to items-start */}
                            <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-1"> {/* Added flex-shrink-0 */}
                              <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-600"></div>
                            </div>
                            <span>Sessions can be held by Phone, Skype, What's App, or in Person (when available)</span>
                          </li>
                        </ul>

                        <h4 className="font-semibold text-gray-800 text-xl mb-6 text-center">Select a Plan:</h4>
                        {/* --- RESPONSIVE GRID --- */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {/* Tier 1 */}
                          <div
                            className={getPlanBoxClasses(planLinks.patron.patron1)}
                            onClick={() => setSelectedPlan(planLinks.patron.patron1)}
                          >
                            <p className="font-medium text-gray-800 text-base md:text-lg">Patron 1</p>
                            <p className="text-green-600 font-bold text-xl md:text-2xl mt-2">$100/month</p>
                          </div>
                          {/* Tier 2 */}
                          <div
                            className={getPlanBoxClasses(planLinks.patron.patron2)}
                            onClick={() => setSelectedPlan(planLinks.patron.patron2)}
                          >
                            <p className="font-medium text-gray-800 text-base md:text-lg">Patron 2</p>
                            <p className="text-green-600 font-bold text-xl md:text-2xl mt-2">$150/month</p>
                          </div>
                          {/* Tier 3 */}
                          <div
                            className={getPlanBoxClasses(planLinks.patron.patron3)}
                            onClick={() => setSelectedPlan(planLinks.patron.patron3)}
                          >
                            <p className="font-medium text-gray-800 text-base md:text-lg">Patron 3</p>
                            <p className="text-green-600 font-bold text-xl md:text-2xl mt-2">$200/month</p>
                          </div>
                          {/* Tier 4 */}
                          <div
                            className={getPlanBoxClasses(planLinks.patron.patron4)}
                            onClick={() => setSelectedPlan(planLinks.patron.patron4)}
                          >
                            <p className="font-medium text-gray-800 text-base md:text-lg">Patron 4</p>
                            <p className="text-green-600 font-bold text-xl md:text-2xl mt-2">$250/month</p>
                          </div>
                        </div>

                        <div className="mt-12 text-center">
                          <a
                            href={selectedPlan || '#'}
                            className={getSubscribeButtonClasses()}
                            onClick={(e) => !selectedPlan && e.preventDefault()}
                            aria-disabled={!selectedPlan}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Subscribe Now {selectedPlan && <ArrowRight className="inline h-5 w-5 ml-2" />}
                          </a>
                          {!selectedPlan && <p className="text-sm text-gray-500 mt-3">Please select a plan above</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* --- End of Enhanced Subscription Content --- */}
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">The Three Mystical Truths Curriculum</h2>

                {/* Curriculum items remain largely the same, responsiveness comes from flex/block defaults */}
                {/* First Truth */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                   <div className="bg-gradient-to-r from-green-600 to-green-800 px-4 sm:px-6 py-4"> {/* Added responsive padding */}
                    <h3 className="text-xl font-semibold text-white">First Mystical Truth</h3>
                  </div>
                   <div className="p-4 sm:p-6"> {/* Added responsive padding */}
                    <p className="text-gray-600 mb-4">
                      "I am here by the Collective Power of the Entire Universe" has five steps, including the Mystic Marriage
                      that enable you to be free from all the restrictive forces and mental viruses that you have allowed to
                      plague your consciousness. This Truth activates your potential and Nature's vision of possibilities for you.
                    </p>
                  </div>
                </div>

                {/* Second Truth */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                   <div className="bg-gradient-to-r from-green-600 to-green-800 px-4 sm:px-6 py-4"> {/* Added responsive padding */}
                    <h3 className="text-xl font-semibold text-white">Second Mystical Truth</h3>
                  </div>
                   <div className="p-4 sm:p-6"> {/* Added responsive padding */}
                    <p className="text-gray-600 mb-4">
                      The Second Mystical Truth enables you to activate your "Five Major Power Centers" These Centers:
                    </p>
                     <ul className="mt-4 space-y-3 text-gray-600"> {/* Adjusted spacing */}
                      <li className="flex items-start"> {/* Changed to items-start */}
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-2">
                          <div className="h-2 w-2 rounded-full bg-green-600"></div>
                        </div>
                        <span>Awaken you to the oneness of life. It is only in this oneness that all things are possible.</span>
                      </li>
                      <li className="flex items-start"> {/* Changed to items-start */}
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-2">
                          <div className="h-2 w-2 rounded-full bg-green-600"></div>
                        </div>
                        <span>Activate your soul's ability to express and experience abundance, growth and wholeness.</span>
                      </li>
                      {/* Removed duplicate points */}
                      <li className="flex items-start"> {/* Changed to items-start */}
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-2">
                          <div className="h-2 w-2 rounded-full bg-green-600"></div>
                        </div>
                        <span>Grow your health, wealth and visions with the knowing "you are here to be more"</span>
                      </li>
                       {/* Add other centers if they were intended to be unique */}
                    </ul>
                  </div>
                </div>

                {/* Third Truth */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                   <div className="bg-gradient-to-r from-green-600 to-green-800 px-4 sm:px-6 py-4"> {/* Added responsive padding */}
                    <h3 className="text-xl font-semibold text-white">Third Mystical Truth</h3>
                  </div>
                   <div className="p-4 sm:p-6"> {/* Added responsive padding */}
                    <p className="text-gray-600 mb-4">
                      "Sacred Life is here as me". It is a two-step process that dissolves the small you, brings you into
                      mystical union with the Creative, Love, Intelligent Universe and instantly lifts up the Essential You,
                      the True You! It merges you with Ultimate Reality, the Mystical Truth, that Sacred Life comes into its
                      fullness as you.
                    </p>
                    <p className="text-gray-600 mb-4">
                      This Truth also introduces Ancestral Work. Bro. Ishmael guides you in indigenous practices that call on
                      and connect you to your Ancestors. Working with the Ancestors brings healing, power, support and powerful
                      transformation to your life.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}