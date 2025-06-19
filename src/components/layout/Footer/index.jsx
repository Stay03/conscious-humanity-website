import React, { memo } from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component
 * Flat menu-style footer with all website links
 */
const Footer = () => {
  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Peace', path: '/peace' },
    { name: 'Events', path: '/events' },
    { name: 'Programs', path: '/programs-coaching' },
    { name: 'Courses', path: '/courses' },
    { name: 'Shop', path: '/shop' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Wellness', path: '/wellness-center' },
    { name: 'Donate', path: '/donate' },
    { name: 'Contact', path: '/contact' },
    { name: 'Membership', path: '/membership' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/legal-disclaimer' }
  ];

  return (
    <footer className="bg-[#292929] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main navigation links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6">
          {footerLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-gray-300 hover:text-white transition-colors duration-300 text-base font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Divider line */}
        <div className="h-px bg-gray-700 w-full my-6"></div>
        
        {/* Bottom section with copyright and legal links */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">© 2023 Conscious Humanity. All rights reserved.</p>
          </div>
          
          <div className="flex justify-center md:justify-end gap-x-6">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);