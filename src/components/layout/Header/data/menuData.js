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
    name: 'Blog', 
    path: '/blog', 
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