import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from '../../utils/toastConfig'; // Import the custom toast config
import AuthModal from '../auth/AuthModal';
import freeProductService from '../../services/api/freeProductService';
import paymentService from '../../services/api/paymentService';
import PaystackPop from '@paystack/inline-js';

/**
 * EnrollButton Component
 * Call-to-action button for course purchase with different states
 * Updated to use React Toastify
 * 
 * @param {Object} course - Course object
 * @param {boolean} hasAccess - Whether the user already has access to the course
 * @param {Function} onBuyNow - Function to call when buying now
 */
const EnrollButton = ({ 
  course, 
  hasAccess = false,
  onBuyNow
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, checkAuthStatus } = useAuth();
  
  // Check if course is free
  const isFree = () => {
    if (!course.product_info.price) return false;
    return parseFloat(course.product_info.price) === 0;
  };
  
  // Handle free course acquisition
  const acquireFreeProduct = async () => {
    try {
      setIsLoading(true);
      
      // Call API to acquire free product
      const response = await freeProductService.acquireFreeProduct(course.product_id);
      
      // Show success message
      toast.success('Course added to your account successfully!');
      
      // Redirect to "My Items" page
      navigate('/my-items');
      
      return true;
    } catch (error) {
      // Show error message
      toast.error(error.message || 'Failed to acquire course. Please try again.');
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Paystack payment initialization
  const initializePaystackPayment = async (productId) => {
    try {
      // Initialize payment with the API
      const response = await paymentService.initializePayment(productId);
      
      // Log the full response for debugging
      console.log('Payment initialization response:', response);
      
      // Check if the response is in the expected format
      if (response && response.status === 'success' && response.data) {
        const { access_code, reference } = response.data;
        
        // Initialize Paystack popup with callbacks
        const popup = new PaystackPop();
        popup.resumeTransaction(access_code, {
          onLoad: (response) => {
            // Transaction has loaded
            console.log('Paystack transaction loaded:', response);
          },
          onSuccess: (transaction) => {
            // Payment completed successfully
            console.log('Payment successful:', transaction);
            
            // Show success message
            toast.success('Payment completed successfully!');
            
            // Verify payment with backend (optional)
            paymentService.verifyPayment(transaction.reference || reference)
              .then(verificationResponse => {
                console.log('Payment verification:', verificationResponse);
                // Redirect to "My Items" or course page
                navigate('/my-items');
              })
              .catch(error => {
                console.error('Payment verification failed:', error);
              });
          },
          onCancel: () => {
            // User cancelled the transaction
            console.log('Payment cancelled by user');
            toast.info('Payment was cancelled.');
          },
          onError: (error) => {
            // Error during payment
            console.error('Paystack error:', error);
            toast.error(error.message || 'Payment processing failed. Please try again.');
          },
          onElementsMount: (elements) => {
            // Elements (like Apple Pay) mounted
            if (elements) {
              console.log('Paystack elements mounted:', elements);
            }
          }
        });
        
        // Show loading toast
        toast.info('Payment initialized. Complete the payment in the popup window.');
        
        return true;
      } else {
        console.error('Invalid response format:', response);
        throw new Error('Payment initialization failed - invalid response format');
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error(error.message || 'Payment initialization failed. Please try again.');
      return false;
    }
  };
  
  // Handle button click
  const handleClick = async () => {
    // If user already has access, navigate to the course content
    if (hasAccess) {
      navigate(`/course/${course.product_info.slug}/learn`);
      return;
    }
    
    // If course is not free, use original functionality
    if (!isFree()) {
      // If user is not authenticated, open auth modal
      if (!isAuthenticated) {
        setIsAuthModalOpen(true);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Call buy now callback if provided
        if (onBuyNow) {
          await onBuyNow(course);
        }
        
        // Initialize Paystack payment instead of redirecting to checkout
        await initializePaystackPayment(course.product_id);
      } catch (error) {
        toast.error(error.message || 'Action failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
      
      return;
    }
    
    // Free course handling
    if (!isAuthenticated) {
      // Open auth modal for login/signup
      setIsAuthModalOpen(true);
      return;
    }
    
    // User is authenticated, acquire free product
    await acquireFreeProduct();
  };
  
  // Handle successful authentication
  const handleAuthSuccess = async () => {
    // Verify authentication status
    const isAuthSuccess = await checkAuthStatus();
    
    if (!isAuthSuccess) {
      toast.error('Authentication failed. Please try again.');
      return;
    }
    
    // If it's a free course, acquire it
    if (isFree()) {
      await acquireFreeProduct();
    } else {
      // Buy now with Paystack
      if (onBuyNow) {
        await onBuyNow(course);
      }
      
      // Initialize Paystack payment
      await initializePaystackPayment(course.product_id);
    }
  };
  
  // Button text and icon based on button type, course price, and access status
  const getButtonContent = () => {
    if (isLoading) {
      return (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      );
    }
    
    if (hasAccess) {
      return (
        <span className="flex items-center justify-center">
          <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Go to Course
        </span>
      );
    }
    
    if (isFree()) {
      return (
        <span className="flex items-center justify-center">
          <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Get for Free
        </span>
      );
    } else {
      return (
        <span className="flex items-center justify-center">
          <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Pay Now
        </span>
      );
    }
  };
  
  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        title={hasAccess ? "Access your course" : "Proceed directly to checkout"}
        className={`
          w-full py-3 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
          ${hasAccess 
            ? 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500'
            : 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500'
          }
          ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}
        `}
      >
        {getButtonContent()}
      </button>
      
      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        redirectPath="/my-items"
      />
    </>
  );
};

export default EnrollButton;