# Codebase Documentation

{
  "Extraction Date": "2025-05-21 01:42:17",
  "Include Paths": [
    "src/components/layout/Header/components/DesktopMenu.jsx",
    "src/components/layout/Header/components/MobileMenu.jsx",
    "src/components/layout/Header/data/menuData.js",
    "src/services/api/client.js",
    "src/services/api/endpoints.js",
    "src/services/api/courseService.js",
    "src/services/api/productService.js",
    "src/hooks/useCourses.js",
    "src/hooks/useProducts.js",
    "src/hooks/useEvents.js",
    "src/components/layout/Header/index.jsx"
  ]
}

### src/components/layout/Header/components/DesktopMenu.jsx
```
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { primaryMenuItems, secondaryMenuItems, utilityMenuItems, authLinks } from '../data/menuData';
import Logo from './Logo';

/**
 * Enhanced desktop menu component with primary and secondary navigation areas
 * Renders a more organized navigation structure with dropdown functionality
 */
const DesktopMenu = ({ isScrolled = false, isLoggedIn = false, onLoginClick, onSearchClick }) => {
  // State to track which dropdown is currently open
  const [openDropdown, setOpenDropdown] = useState(null);
  // State to track whether secondary menu is expanded
  const [isSecondaryMenuOpen, setSecondaryMenuOpen] = useState(false);
  
  // Determine which auth link to show based on login state
  const authLink = isLoggedIn ? authLinks.loggedIn : authLinks.loggedOut;
  
  // Handle mouse enter for dropdown
  const handleMouseEnter = (itemName) => {
    setOpenDropdown(itemName);
  };
  
  // Handle mouse leave for dropdown
  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };
  
  // Handle auth link click
  const handleAuthLinkClick = (e) => {
    // If not logged in and login button is clicked, open modal instead
    if (!isLoggedIn && authLink.name === 'Login') {
      e.preventDefault();
      onLoginClick();
    }
  };

  // Toggle secondary menu
  const toggleSecondaryMenu = () => {
    setSecondaryMenuOpen(!isSecondaryMenuOpen);
  };
  
  return (
    <div className={`hidden lg:flex ${!isScrolled ? 'py-6' : ''}`}>
      {/* Logo Area - Left side */}
      <div className={`flex items-center h-20 pl-16 pr-12 ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
        <Logo size="large" />
      </div>
      
      {/* Slanted divider SVG - only visible when not scrolled */}
      {!isScrolled && (
        <div className="relative h-20" style={{ marginRight: "-15px" }}>
          <svg width="93" height="80" viewBox="0 0 93 116" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
            <path fillRule="evenodd" clipRule="evenodd" d="M93 116V0H0C11.604 0.00830078 22.1631 6.70752 27.1128 17.2046L65.5889 98.7954C70.5415 109.299 81.1108 116 92.7231 116H93Z" fill="white"></path>
          </svg>
        </div>
      )}
      
      {/* Navigation Menu - Right side with white background */}
      <div className="flex-1 bg-white h-20">
        <div className="h-full flex flex-col">
          {/* Secondary menu row */}
          <div className="bg-white px-8 flex justify-end items-center h-8 text-sm">
            <ul className="flex space-x-6">
              {secondaryMenuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-indigo-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Primary navigation row */}
          <nav className="flex-1 flex justify-end">
            <ul className="flex items-center pr-8">
              {primaryMenuItems.map((item) => (
                <li 
                  key={item.name} 
                  className="mx-3 relative"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.hasDropdown ? (
                    <div className="flex items-center">
                      <Link
                        to={item.path}
                        className="text-gray-800 hover:text-indigo-400 transition-colors duration-200 font-medium py-2 px-1 text-lg"
                      >
                        {item.name}
                      </Link>
                      <div 
                        className="ml-1 text-gray-800 hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
                        aria-haspopup="true"
                        aria-expanded={openDropdown === item.name}
                      >
                        <svg 
                          className={`w-4 h-4 transform transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-gray-800 hover:text-indigo-400 transition-colors duration-200 font-medium flex items-center py-2 px-1 text-lg"
                    >
                      {item.name}
                    </Link>
                  )}
                  
                  {/* Dropdown Menu - With hover effect for menu items */}
                  {item.hasDropdown && (
                    <div 
                      className={`absolute top-full left-0 bg-white shadow-lg rounded-xl py-4 px-6 min-w-max z-10 transform origin-top ${
                        openDropdown === item.name 
                          ? 'opacity-100 scale-y-100' 
                          : 'opacity-0 scale-y-0 pointer-events-none'
                      }`}
                      style={{ 
                        borderTop: '3px solid #60A5FA',
                        transition: 'opacity 400ms ease, transform 400ms cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                    >
                      {item.submenu && item.submenu.map((subItem, index) => {
                        // Create a separate component for menu items to properly use hooks
                        const SubmenuItem = () => {
                          const [isHovered, setIsHovered] = useState(false);
                          
                          return (
                            <div className="relative block py-2 my-2">
                              <div 
                                className="absolute inset-0 transition-all duration-500"
                                style={{ 
                                  backgroundColor: isHovered ? '#60A5FA' : 'transparent',
                                  borderRadius: isHovered ? '9999px' : '0',
                                  opacity: isHovered ? 1 : 0
                                }}
                              />
                              <Link 
                                to={subItem.path}
                                className="block px-4 whitespace-nowrap relative z-10"
                                style={{ 
                                  color: isHovered ? 'white' : '#374151',
                                  display: 'block',
                                  position: 'relative',
                                  transitionProperty: 'color, transform',
                                  transitionDuration: '500ms',
                                  transitionTimingFunction: 'ease',
                                  transform: isHovered ? 'translateX(10px)' : 'translateX(0)'
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={() => setOpenDropdown(null)}
                              >
                                {subItem.name}
                              </Link>
                            </div>
                          );
                        };
                        
                        return <SubmenuItem key={index} />;
                      })}
                    </div>
                  )}
                </li>
              ))}

              

              {/* Account/Login link */}
              <li className="mx-3 ml-6">
                {isLoggedIn ? (
                  <Link
                    to={authLink.path}
                    className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200 font-medium text-lg"
                  >
                    {authLink.name}
                  </Link>
                ) : (
                  <a
                    href="#"
                    onClick={handleAuthLinkClick}
                    className="text-yellow-500 hover:text-yellow-600 transition-colors duration-200 font-medium text-lg"
                  >
                    {authLink.name}
                  </a>
                )}
              </li>
              {/* Utility items - Cart icon */}
              {utilityMenuItems.map((item) => (
                <li key={item.name} className="mx-3">
                  <Link
                    to={item.path}
                    className="text-yellow-500 hover:text-indigo-400 transition-colors duration-200 font-medium flex items-center"
                    aria-label={item.name}
                  >
                    {item.icon === 'cart' ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ) : (
                      item.name
                    )}
                  </Link>
                </li>
              ))}
              {/* Search button */}
              <li className="ml-6">
                <button 
                  onClick={onSearchClick}
                  className="bg-yellow-500 rounded-full p-3 text-white hover:bg-yellow-600 transition-colors duration-200"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

DesktopMenu.propTypes = {
  isScrolled: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  onLoginClick: PropTypes.func,
  onSearchClick: PropTypes.func.isRequired, // Added prop type
};

export default memo(DesktopMenu);
```

### src/components/layout/Header/components/MobileMenu.jsx
```
import React, { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import SocialIcons from './SocialIcons';
import ContactInfo from './ContactInfo';
import { primaryMenuItems, secondaryMenuItems, utilityMenuItems, authLinks } from '../data/menuData';

/**
 * Mobile menu component with reorganized structure
 */
const MobileMenu = ({ 
  isOpen, 
  isScrolled,
  expandedItems,
  isLoggedIn = false,
  onClose,
  onToggleExpand,
  onMenuItemClick,
  onLoginClick
}) => {
  // Reference to the menu for focus trapping
  const menuRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  // Determine which auth link to show based on login state
  const authLink = isLoggedIn ? authLinks.loggedIn : authLinks.loggedOut;

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      
      // Trap focus within the modal when open
      if (e.key === 'Tab' && isOpen) {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableRef.current) {
            e.preventDefault();
            lastFocusableRef.current?.focus();
          }
        } else {
          if (document.activeElement === lastFocusableRef.current) {
            e.preventDefault();
            firstFocusableRef.current?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus first element when menu opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Handle auth link click
  const handleAuthLinkClick = (e) => {
    // If not logged in and login button is clicked, open modal instead
    if (!isLoggedIn && authLink.name === 'Login') {
      e.preventDefault();
      onClose(); // Close mobile menu
      onLoginClick(); // Open auth modal
    } else {
      onClose(); // Just close the mobile menu
    }
  };

  // Create a combined menu for mobile display
  const allMenuItems = [
    ...primaryMenuItems,
    {
      name: 'More',
      path: '#',
      hasDropdown: true,
      submenu: secondaryMenuItems
    }
  ];

  return (
    <>
      {/* Mobile Menu Drawer */}
      <div 
        ref={menuRef}
        id="mobile-menu"
        className={`lg:hidden fixed right-0 top-0 h-screen w-64 bg-gray-900 text-white z-50 overflow-y-auto transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)' }}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button 
            ref={firstFocusableRef}
            onClick={onClose}
            aria-label="Close Menu"
            className="text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Menu title (for accessibility) */}
        <h2 id="mobile-menu-title" className="sr-only">Mobile Navigation Menu</h2>
        
        {/* Logo */}
        <div className="px-6 py-4 flex items-center">
          <Logo size="small" />
        </div>
        
        {/* Main Menu Items */}
        <nav className="px-4">
          <ul className="space-y-1">
            {allMenuItems.map((item) => (
              <li key={item.name} className="border-b border-gray-700">
                <div className="flex items-center justify-between py-3">
                  <Link
                    to={item.path}
                    className="text-white hover:text-yellow-500 transition-colors font-medium text-base"
                    onClick={() => onMenuItemClick(item.hasDropdown)}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && (
                    <button 
                      onClick={() => onToggleExpand(item.name)}
                      className="text-yellow-500 p-1"
                      aria-expanded={expandedItems[item.name] ? 'true' : 'false'}
                      aria-controls={`submenu-${item.name}`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center border border-yellow-500 rounded-sm">
                        {expandedItems[item.name] ? 
                          <span className="text-lg leading-none mb-1">-</span> : 
                          <span className="text-lg leading-none">+</span>
                        }
                      </div>
                    </button>
                  )}
                </div>
                
                {/* Dropdown content */}
                {item.hasDropdown && (
                  <div 
                    id={`submenu-${item.name}`}
                    className={`pl-4 pb-2 overflow-hidden transition-all duration-300`}
                    style={{ 
                      maxHeight: expandedItems[item.name] ? '200px' : '0',
                      transitionTimingFunction: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)'
                    }}
                  >
                    <ul className="space-y-2">
                      {item.submenu && item.submenu.map((subItem, index) => (
                        <li key={index}>
                          <Link 
                            to={subItem.path}
                            className="text-gray-300 hover:text-yellow-500 block py-1"
                            onClick={onClose}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
            
            {/* Utility Menu Items */}
            {utilityMenuItems.map((item) => (
              <li key={item.name} className="border-b border-gray-700 py-3">
                <Link
                  to={item.path}
                  className="text-white hover:text-yellow-500 transition-colors font-medium flex items-center"
                  onClick={onClose}
                >
                  {item.icon === 'cart' ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {item.name}
                    </>
                  ) : (
                    item.name
                  )}
                </Link>
              </li>
            ))}
            
            {/* Login/Account Link */}
            <li className="border-b border-gray-700 py-3">
              {isLoggedIn ? (
                <Link
                  to={authLink.path}
                  className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium block"
                  onClick={onClose}
                >
                  {authLink.name}
                </Link>
              ) : (
                <a
                  href="#"
                  className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium block"
                  onClick={handleAuthLinkClick}
                >
                  {authLink.name}
                </a>
              )}
            </li>
          </ul>
        </nav>
        
        {/* Contact Info Section */}
        <ContactInfo />
        
        {/* Social Media Icons */}
        <div className="mt-6 px-4">
          <SocialIcons />
        </div>

        {/* Last focusable element (for focus trapping) */}
        <button 
          ref={lastFocusableRef} 
          className="sr-only"
          tabIndex={isOpen ? 0 : -1}
        >
          End of menu
        </button>
      </div>
      
      {/* Dark overlay when mobile menu is open */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black z-40 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        style={{ 
          transition: 'opacity 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86)'
        }}
      ></div>
    </>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isScrolled: PropTypes.bool.isRequired,
  expandedItems: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onToggleExpand: PropTypes.func.isRequired,
  onMenuItemClick: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func
};

export default memo(MobileMenu);
```

### src/components/layout/Header/data/menuData.js
```
// src/components/layout/Header/data/menuData.js

/**
 * Reorganized menu data structure with primary and secondary navigation
 * This separates core navigation from supplementary links while maintaining
 * all existing menu items
 */

// Primary navigation - main site sections
export const primaryMenuItems = [
  { 
    name: 'About', 
    path: '/about', 
    hasDropdown: false
  },
  { 
    name: 'Peace', 
    path: '/peace', 
    hasDropdown: false 
  },
  { 
    name: 'Events', 
    path: '/events', 
    hasDropdown: false 
  },
  { 
    name: 'Programs', 
    path: '/programs-coaching', 
    hasDropdown: false 
  },
  { 
    name: 'Courses', 
    path: '/courses', 
    hasDropdown: false 
  },
  { 
    name: 'Donate', 
    path: '/donate', 
    hasDropdown: true,
    submenu: [
      { name: 'Growing The Empowered Child', path: '/growing-the-empowered-child' },
      { name: 'EM Hospital Complex', path: '/em-hospital-complex' }
    ]
  }
];

// Secondary navigation - supplementary links
export const secondaryMenuItems = [
  {
    name: 'Wellness',
    path: '/wellness-center',
    hasDropdown: false
  },
  {
    name: 'Gallery',
    path: '/gallery',
    hasDropdown: false
  },
  { 
    name: 'Shop', 
    path: '/shop', 
    hasDropdown: false 
  }
];

// Utility navigation - user-specific actions
export const utilityMenuItems = [
  { 
    name: 'Cart', 
    path: '/cart', 
    hasDropdown: false,
    icon: 'cart'
  }
];

// Combined menu items for backward compatibility
export const menuItems = [...primaryMenuItems, ...secondaryMenuItems, ...utilityMenuItems];

// Auth states can be expanded later with actual authentication
export const authLinks = {
  loggedOut: { name: 'Login', path: '/login' },
  loggedIn: { name: 'My Account', path: '/my-items' }
};

// Contact information for mobile menu
export const contactInfo = [
  {
    icon: 'location',
    text: 'P.O. Box 291038 Los Angeles, CA 90027',
    href: null // No link for this item
  },
  {
    icon: 'email',
    text: 'info@conscioushumanity.com',
    href: 'mailto:info@conscioushumanity.com'
  },
  {
    icon: 'phone',
    text: '323-800-2566',
    href: 'tel:+233302230702'
  }
];
```

### src/services/api/client.js
```
/**
 * Base API client for making HTTP requests
 * Centralizes request configuration and error handling
 */

// const API_BASE_URL = 'http://localhost:8000/api';
const API_BASE_URL = 'https://apimagic.xyz/ethereanAPI/api';

/**
 * Creates and returns API request options with proper headers
 * @param {Object} options - Request options
 * @returns {Object} - Configured request options
 */
const createRequestOptions = (options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...options,
  };

  // Add authentication token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  return defaultOptions;
};

/**
 * Builds a URL with query parameters
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @returns {string} - Full URL with query string
 */
const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  
  // Add query parameters
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  
  return url.toString();
};

/**
 * Handles API response
 * @param {Response} response - Fetch API response
 * @returns {Promise} - Resolved with data or rejected with error
 */
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // Create standardized error object
    const error = {
      status: response.status,
      statusText: response.statusText,
      message: data.message || 'An error occurred',
      errors: data.errors || {},
      data: data.data || null,
    };
    
    throw error;
  }
  
  return data;
};

/**
 * Makes a GET request to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @returns {Promise} - Promise that resolves with the response data
 */
const get = async (endpoint, params = {}) => {
  try {
    const url = buildUrl(endpoint, params);
    const options = createRequestOptions({ method: 'GET' });
    
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    console.error(`GET request failed for ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Makes a POST request to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @param {Object} params - Query parameters
 * @returns {Promise} - Promise that resolves with the response data
 */
const post = async (endpoint, data = {}, params = {}) => {
  try {
    const url = buildUrl(endpoint, params);
    const options = createRequestOptions({
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    console.error(`POST request failed for ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Makes a PUT request to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @param {Object} params - Query parameters
 * @returns {Promise} - Promise that resolves with the response data
 */
const put = async (endpoint, data = {}, params = {}) => {
  try {
    const url = buildUrl(endpoint, params);
    const options = createRequestOptions({
      method: 'PUT',
      body: JSON.stringify(data),
    });
    
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    console.error(`PUT request failed for ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Makes a DELETE request to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @returns {Promise} - Promise that resolves with the response data
 */
const del = async (endpoint, params = {}) => {
  try {
    const url = buildUrl(endpoint, params);
    const options = createRequestOptions({ method: 'DELETE' });
    
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    console.error(`DELETE request failed for ${endpoint}:`, error);
    throw error;
  }
};

const apiClient = {
  get,
  post,
  put,
  delete: del,
};

export default apiClient;
```

### src/services/api/endpoints.js
```
/**
 * API endpoints definitions
 * Centralized location for all API endpoints used in the application
 */

const endpoints = {
  // Banner endpoints
  banners: {
    list: '/banners',
    get: (id) => `/banners/${id}`,
  },
  
  // Course endpoints
  courses: {
    list: '/courses',
    get: (id) => `/courses/${id}`,
    getBySlug: (slug) => `/courses/slug/${slug}`,
  },
  
  // Product endpoints
  products: {
    list: '/products',
    get: (id) => `/products/${id}`,
    getBySlug: (slug) => `/products/${slug}`,
  },
  
  // Cart endpoints
  cart: {
    get: '/cart',
    add: '/cart/add',
    update: (itemId) => `/cart/item/${itemId}`,
    remove: (itemId) => `/cart/item/${itemId}`,
    clear: '/cart',
  },
  
  // Collection endpoints
  collections: {
    list: '/collections',
    get: (id) => `/collections/${id}`,
    acquire: (id) => `/collections/${id}/acquire`,
  },
  
  // Progress tracking endpoints
  progress: {
    startLesson: '/progress/start-lesson',
    completeLesson: '/progress/complete-lesson',
    getCourseProgress: (courseId) => `/progress/course/${courseId}`,
  },
  
  // Quiz endpoints
  quiz: {
    startAttempt: '/quiz-attempts',
    submitAnswer: '/quiz-answers',
    getProgress: (quizId) => `/quizzes/${quizId}/progress`,
  },
  
  // Add more endpoint categories as needed
  events: {
    list: '/events',
    get: (id) => `/events/${id}`,
  },
  
  // Authentication endpoints
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh-token',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  
  // User endpoints
  user: {
    profile: '/user/profile',
    updateProfile: '/user/profile',
  },

    // Address endpoints (new)
    addresses: {
      get: '/addresses',
      create: '/addresses',
      update: (addressId) => `/addresses/${addressId}`,
      delete: (addressId) => `/addresses/${addressId}`,
      setDefault: (addressId) => `/addresses/${addressId}/default`
    },
  
    // Order endpoints (new)
    orders: {
      create: '/orders',
      get: (orderId) => `/orders/${orderId}`,
      list: '/orders',
      cancel: (orderId) => `/orders/${orderId}/cancel`
    },

    // Search endpoints
    search: {
      unified: '/search',
      suggestions: '/search/suggestions',
    },
};

export default endpoints;
```

### src/services/api/courseService.js
```
/**
 * Course Service
 * Centralizes all course-related API calls
 */

import apiClient from './client';
import endpoints from './endpoints';

/**
 * Get a list of courses with optional filtering
 * 
 * @param {Object} params - Filter parameters
 * @param {string} params.platform - Filter by platform (el, ch, el,ch)
 * @param {boolean} params.is_online - Filter by online status
 * @param {string} params.display_page - Type of display
 * @param {string} params.search - Search term
 * @param {string} params.sort_by - Sort order
 * @param {number} params.per_page - Number of results per page
 * @param {number} params.page - Page number
 * @param {number} params.price - Filter by price (0 for free courses)
 * @returns {Promise} - Promise resolving to course data
 */
const getCourses = (params = {}) => {
  return apiClient.get(endpoints.courses.list, params);
};

/**
 * Get a specific course by ID
 * 
 * @param {number} id - Course ID
 * @returns {Promise} - Promise resolving to course data
 */
const getCourseById = (id) => {
  return apiClient.get(endpoints.courses.get(id));
};

/**
 * Get a specific course by slug
 * 
 * @param {string} slug - Course slug
 * @param {boolean} detailed - Whether to include detailed course data
 * @returns {Promise} - Promise resolving to course data
 */
const getCourseBySlug = (slug, detailed = false) => {
  return apiClient.get(endpoints.courses.getBySlug(slug), { detailed });
};

/**
 * Get free courses (price = 0)
 * 
 * @param {Object} params - Additional filter parameters
 * @param {number} params.limit - Number of courses to fetch (default: 4)
 * @returns {Promise} - Promise resolving to free courses
 */
const getFreeCourses = (params = {}) => {
  const defaultParams = {
    price: 0,
    per_page: params.limit || 4,
    page: 1,
    is_online: true,
    visibility: 1,
    platform: 'ch',
    sort_by: 'price-desc'
  };
  
  return apiClient.get(endpoints.courses.list, { ...defaultParams, ...params });
};

/**
 * Create a new course (protected endpoint)
 * 
 * @param {Object} data - Course data
 * @returns {Promise} - Promise resolving to created course
 */
const createCourse = (data) => {
  return apiClient.post(endpoints.courses.list, data);
};

/**
 * Update an existing course (protected endpoint)
 * 
 * @param {number} id - Course ID
 * @param {Object} data - Updated course data
 * @returns {Promise} - Promise resolving to updated course
 */
const updateCourse = (id, data) => {
  return apiClient.put(endpoints.courses.get(id), data);
};

/**
 * Delete a course (protected endpoint)
 * 
 * @param {number} id - Course ID
 * @returns {Promise} - Promise resolving to success message
 */
const deleteCourse = (id) => {
  return apiClient.delete(endpoints.courses.get(id));
};

const courseService = {
  getCourses,
  getCourseById,
  getCourseBySlug,
  getFreeCourses, // New method for free courses
  createCourse,
  updateCourse,
  deleteCourse,
};

export default courseService;
```

### src/services/api/productService.js
```
/**
 * Product Service
 * Centralizes all product-related API calls
 */

import apiClient from './client';
import endpoints from './endpoints';

/**
 * Get a list of products with optional filtering
 * 
 * @param {Object} params - Filter parameters
 * @param {string} params.platform - Filter by platform (EL, CH, EL,CH)
 * @param {string} params.type - Filter by product type (physical, digital)
 * @param {boolean} params.is_online - Filter by online status
 * @param {string} params.visibility - Visibility status
 * @param {string} params.sort - Sort order (newest, price_asc, price_desc)
 * @param {number} params.min_price - Minimum price filter
 * @param {number} params.max_price - Maximum price filter
 * @param {string} params.search - Search term
 * @param {number} params.per_page - Number of results per page
 * @param {number} params.page - Page number
 * @returns {Promise} - Promise resolving to product data
 */
const getProducts = (params = {}) => {
  return apiClient.get(endpoints.products.list, params);
};

/**
 * Get a specific product by ID
 * 
 * @param {number} id - Product ID
 * @returns {Promise} - Promise resolving to product data
 */
const getProductById = (id) => {
  return apiClient.get(endpoints.products.get(id));
};

/**
 * Get a specific product by slug
 * 
 * @param {string} slug - Product slug
 * @returns {Promise} - Promise resolving to product data
 */
const getProductBySlug = (slug) => {
  return apiClient.get(endpoints.products.getBySlug(slug));
};

const productService = {
  getProducts,
  getProductById,
  getProductBySlug
};

export default productService;
```

### src/hooks/useCourses.js
```
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api/client';
import endpoints from '../services/api/endpoints';

/**
 * Custom hook to fetch and manage courses data
 * 
 * @param {Object} filters - Object containing filter parameters
 * @returns {Object} - Object containing courses data, loading state, error state, and refetch function
 */
const useCourses = (filters = {}) => {
  const [courses, setCourses] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch courses from API
  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(endpoints.courses.list, filters);
      
      // Check if response has the expected structure
      if (response && response.courses) {
        setCourses(response.courses.data || []);
        
        // Extract pagination data
        const { 
          current_page, 
          first_page_url, 
          last_page, 
          last_page_url,
          next_page_url, 
          prev_page_url, 
          total, 
          per_page 
        } = response.courses;
        
        setPagination({
          current_page,
          first_page_url,
          last_page,
          last_page_url,
          next_page_url,
          prev_page_url,
          total,
          per_page
        });
      } else {
        setCourses([]);
        setPagination(null);
        setError({ message: 'Unexpected API response format' });
      }
    } catch (err) {
      setCourses([]);
      setPagination(null);
      setError(err);
      console.error('Failed to fetch courses:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Fetch courses when filters change
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    pagination,
    isLoading,
    error,
    refetch: fetchCourses
  };
};

export default useCourses;
```

### src/hooks/useProducts.js
```
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api/client';
import endpoints from '../services/api/endpoints';

/**
 * Custom hook to fetch and manage products data
 * 
 * @param {Object} filters - Object containing filter parameters
 * @returns {Object} - Object containing products data, loading state, error state, and refetch function
 */
const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch products from API
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(endpoints.products.list, filters);
      
      // Check if response has the expected structure
      if (response && response.products) {
        setProducts(response.products.data || []);
        
        // Extract pagination data
        const { 
          current_page, 
          first_page_url, 
          last_page, 
          last_page_url,
          next_page_url, 
          prev_page_url, 
          total, 
          per_page 
        } = response.products;
        
        setPagination({
          current_page,
          first_page_url,
          last_page,
          last_page_url,
          next_page_url,
          prev_page_url,
          total,
          per_page
        });
      } else {
        setProducts([]);
        setPagination(null);
        setError({ message: 'Unexpected API response format' });
      }
    } catch (err) {
      setProducts([]);
      setPagination(null);
      setError(err);
      console.error('Failed to fetch products:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    pagination,
    isLoading,
    error,
    refetch: fetchProducts
  };
};

export default useProducts;
```

### src/hooks/useEvents.js
```
import { useState, useEffect } from 'react';
import apiClient from '../services/api/client';
import endpoints from '../services/api/endpoints';

/**
 * Custom hook for fetching events
 * @param {Object} params - Query parameters for events API
 * @returns {Object} - Events data, loading state, and error state
 */
const useEvents = (params = {}) => {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        
        // Default parameters for events
        const defaultParams = {
          platform: 'CH',
          is_online: 1,
          perPage: 10,
          status: 'published',
          orderBy: 'start_date',
          orderDir: 'asc',
          event_level: 'main',
        };
        
        // Merge with custom parameters
        const queryParams = {
          ...defaultParams,
          ...params,
        };
        
        const response = await apiClient.get(endpoints.events.list, queryParams);
        
        if (response.status === 'success' && response.data) {
          setEvents(response.data.data || []);
          setPagination({
            currentPage: response.data.current_page,
            totalPages: response.data.last_page,
            totalItems: response.data.total,
            perPage: response.data.per_page,
          });
          setError(null);
        } else {
          throw new Error('Invalid response format from events API');
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError(err.message || 'Failed to fetch events');
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [JSON.stringify(params)]); // Dependency on stringified params to prevent infinite loops

  return {
    events,
    pagination,
    isLoading,
    error
  };
};

export default useEvents;
```

### src/components/layout/Header/index.jsx
```
import React, { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useScrollPosition from '../../../hooks/useScrollPosition';
import useMenuState from '../../../hooks/useMenuState';
import { useAuth } from '../../../contexts/AuthContext';
import Logo from './components/Logo';
import DesktopMenu from './components/DesktopMenu';
import MobileMenu from './components/MobileMenu';
import AuthModal from '../../auth/AuthModal';

/**
 * Main Header component
 * Combines desktop and mobile navigation
 */
const Header = () => {
  // Use authentication context instead of hardcoded value
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // State for auth modal
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [initialAuthTab, setInitialAuthTab] = useState('login');
  
  // Use custom scroll position hook
  const isScrolled = useScrollPosition(50);
  
  // Use custom menu state hook
  const {
    mobileMenuOpen,
    expandedItems,
    toggleMobileMenu,
    closeMobileMenu,
    toggleExpand,
    handleMobileMenuItemClick
  } = useMenuState();

  // Handler for opening auth modal
  const handleOpenAuthModal = (tab = 'login') => {
    setInitialAuthTab(tab);
    setAuthModalOpen(true);
  };

  // Handler for successful authentication
  const handleAuthSuccess = () => {
    // Refresh page or update state as needed
    closeMobileMenu();
  };

  // Handler for search button click
  const handleSearchClick = () => {
  navigate('/search');
  if (mobileMenuOpen) {
    closeMobileMenu();
  }
};

  // Dynamic classes for the header based on scroll state
  const headerClasses = `w-full z-20 transition-all duration-300 ${
    isScrolled 
      ? 'fixed top-0 bg-white shadow-md' 
      : 'absolute bg-transparent'
  }`;

  return (
    <header className={headerClasses}>
      {/* Desktop Header */}
      <DesktopMenu 
        isScrolled={isScrolled}
        isLoggedIn={isAuthenticated}
        onLoginClick={() => handleOpenAuthModal('login')}
        onSearchClick={handleSearchClick}
      />

      {/* Mobile/Tablet Header */}
      <div className={`lg:hidden flex justify-between items-center h-16 px-12 ${isScrolled ? 'bg-white' : 'bg-transparent'} ${!isScrolled ? 'pt-16' : ''}`}>
        <Logo className="z-10" size={isScrolled ? "default" : "small"} />
        
        <div className="flex items-center z-10">
          <button 
            className={`p-2 mr-2 ${isScrolled || !mobileMenuOpen ? 'text-yellow-500' : 'text-white'}`} // Adjust color if menu is open and not scrolled
            aria-label="Search"
            onClick={handleSearchClick}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <button 
            className={`p-2 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            onClick={toggleMobileMenu}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Drawer) */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        isScrolled={isScrolled}
        expandedItems={expandedItems}
        isLoggedIn={isAuthenticated}
        onClose={closeMobileMenu}
        onToggleExpand={toggleExpand}
        onMenuItemClick={handleMobileMenuItemClick}
        onLoginClick={() => handleOpenAuthModal('login')}
        // onSearchClick prop is not used by MobileMenu component itself for a search icon inside it
        // The main mobile search icon is handled above.
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialTab={initialAuthTab}
      />
    </header>
  );
};

export default memo(Header);
```

