import React from 'react';
import threeMysticalImg from '../../assets/Artworks_3MT-1.png';
import { Link } from 'react-router-dom';

/**
 * ThreeMysticalTruthsSection Component
 * Displays information about The Three Mystical Truths section
 */
const ThreeMysticalTruthsSection = () => {
  return (
    <div className="w-full bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Image on left */}
          <div className="w-full md:w-1/2">
            <img 
              src={threeMysticalImg} 
              alt="The Three Mystical Truths" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          {/* Content on right */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              The Three Mystical Truths
            </h2>
            
            <p className="text-xl text-gray-700, font-medium mb-8">
              Join the Three Mystical Truths to…
            </p>
            
            <ul className="space-y-4 text-lg text-gray-600">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-800 font-semibold mr-3">
                  1
                </span>
                <span>Get your Daily Dose of Empowerment.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-800 font-semibold mr-3">
                  2
                </span>
                <span>Activate your Healing Powers and Heal Your Life.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-800 font-semibold mr-3">
                  3
                </span>
                <span>Align with the Supreme Purpose of Life.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-800 font-semibold mr-3">
                  4
                </span>
                <span>Awaken your Intuitive Abilities.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-800 font-semibold mr-3">
                  5
                </span>
                <span>Gain access to, and use of the Spiritual Laws of Nature.</span>
              </li>
            </ul>
            
            <div className="mt-10">
              <Link to="/three-mystical-truths">
                <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeMysticalTruthsSection;