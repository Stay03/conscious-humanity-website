import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PaystackPop from '@paystack/inline-js';
import apiClient from '../services/api/client';
import endpoints from '../services/api/endpoints';
import paymentService from '../services/api/paymentService';
import EventHeroSection from '../components/events/EventHeroSection';
import EventDetailsCard from '../components/events/EventDetailsCard';
import AuthModal from '../components/auth/AuthModal';

// New Success Modal Component
const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for registering! You will receive an email with your event and ticket information shortly.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const EventDetailPage = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registering, setRegistering] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // New state for success modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/events/${slug}`);

        if (response.status === 'success' && response.data) {
          setEvent(response.data);
          setError(null);
        } else {
          throw new Error('Failed to fetch event details');
        }
      } catch (err) {
        console.error('Failed to fetch event details:', err);
        setError(err.message || 'Failed to fetch event details');
        setEvent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
    
    // Check authentication status when component mounts
    checkUserAuth();
  }, [slug]);

  // Check if user is logged in
  const checkUserAuth = async () => {
    try {
      const authResponse = await apiClient.post('/checkLogin');
      const isLoggedIn = authResponse.status === 'success' && authResponse.logged_in === true;
      setIsAuthenticated(isLoggedIn);
      return isLoggedIn;
    } catch (err) {
      setIsAuthenticated(false);
      return false;
    }
  };

  // Handle event registration
  const handleRegister = async () => {
    try {
      setRegistering(true);
      
      // Check if user is logged in
      const isLoggedIn = await checkUserAuth();
      
      if (!isLoggedIn) {
        // Show auth modal if user is not logged in
        setRegistering(false);
        setIsAuthModalOpen(true);
        return;
      }
      
      // User is logged in, proceed with payment
      initiatePayment();
    } catch (err) {
      console.error('Failed to register for event:', err);
      alert(err.message || 'Failed to register for this event. Please try again.');
      setRegistering(false);
    }
  };
  
  // Initiate payment with Paystack
  const initiatePayment = async () => {
    try {
      // User is logged in, initialize payment
      const paymentResponse = await paymentService.initializeEventPayment(event.id);
      
      if (paymentResponse.status === 'success' && paymentResponse.data) {
        const { access_code, reference } = paymentResponse.data;
        // Initialize Paystack popup
        const popup = new PaystackPop();
        popup.resumeTransaction(access_code, {
          onLoad: (response) => {
            // Transaction has loaded
            console.log('Paystack transaction loaded:', response);
          },
          onSuccess: (transaction) => {
            // Payment completed successfully
            console.log('Payment successful:', transaction);
            
            // Verify payment with backend
            paymentService.verifyPayment(transaction.reference || reference)
              .then(verificationResponse => {
                console.log('Payment verification:', verificationResponse);
                // Show success modal after verification
                setRegistering(false);
                setIsSuccessModalOpen(true);
              })
              .catch(error => {
                console.error('Payment verification failed:', error);
                setRegistering(false);
                alert('Payment was successful, but verification failed. Please contact support.');
              });
          },
          onCancel: () => {
            // User cancelled the transaction
            console.log('Payment cancelled by user');
            setRegistering(false);
          },
          onError: (error) => {
            // Error during payment
            console.error('Paystack error:', error);
            setRegistering(false);
            alert('Payment failed. Please try again or contact support.');
          },
          onElementsMount: (elements) => {
            // Elements (like Apple Pay) mounted
            if (elements) {
              console.log('Paystack elements mounted:', elements);
            }
          }
        });
      } else {
        throw new Error(paymentResponse.message || 'Payment initialization failed');
      }
    } catch (err) {
      console.error('Failed to initialize payment:', err);
      alert(err.message || 'Failed to initiate payment. Please try again.');
      setRegistering(false);
    }
  };

  // Handle successful authentication
  const handleAuthSuccess = async () => {
    // Close the auth modal
    setIsAuthModalOpen(false);
    
    // Check if the user is now authenticated
    const isLoggedIn = await checkUserAuth();
    
    if (isLoggedIn) {
      // Wait a moment to ensure auth state is updated in the backend
      setTimeout(() => {
        // Proceed with payment
        initiatePayment();
      }, 500);
    }
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Calculate event duration
  const calculateDuration = () => {
    if (!event?.start_date || !event?.end_date) return '';

    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    const durationMs = endDate - startDate;
    const durationHours = Math.round(durationMs / (1000 * 60 * 60));

    if (durationHours < 24) {
      return `${durationHours} hour${durationHours !== 1 ? 's' : ''}`;
    } else {
      const durationDays = Math.round(durationHours / 24);
      return `${durationDays} day${durationDays !== 1 ? 's' : ''}`;
    }
  };

  // Check if event has already happened
  const isEventPast = () => {
    if (!event?.start_date) return false;
    const eventDate = new Date(event.start_date);
    return eventDate < new Date();
  };

  // Handle success modal close
  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Failed to load event</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/events"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-green-500 text-gray-900 font-semibold hover:bg-green-600 transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  // No event found
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
          <Link
            to="/events"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-green-500 text-gray-900 font-semibold hover:bg-green-600 transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with image */}
      <EventHeroSection event={event} />

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Event title and quick info */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

          <div className="flex flex-wrap gap-6 text-gray-600">
            {/* Date and time */}
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDateTime(event.start_date)}</span>
            </div>

            {/* Duration */}
            {event.end_date && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{calculateDuration()}</span>
              </div>
            )}

            {/* Location */}
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        {/* Register button - Prominent placement above details card */}
        <div className="mb-6">
          <button
            onClick={handleRegister}
            disabled={isEventPast() || registering}
            className={`w-full py-4 rounded-lg text-lg font-bold text-center transition-colors ${
              isEventPast()
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {registering ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : isEventPast() ? (
              'Event Has Ended'
            ) : (
              'Register for Event'
            )}
          </button>
        </div>

        {/* Event details card */}
        <EventDetailsCard event={event} formatDateTime={formatDateTime} calculateDuration={calculateDuration} />

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Register button - repeated at bottom for convenience */}
          <button
            onClick={handleRegister}
            disabled={isEventPast() || registering}
            className={`px-8 py-4 rounded-lg font-semibold text-center transition-colors sm:flex-1 ${
              isEventPast()
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {registering ? 'Registering...' : isEventPast() ? 'Event Has Ended' : 'Register for Event'}
          </button>

          <Link
            to="/events"
            className="px-8 py-4 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors text-center sm:flex-1"
          >
            Back to Events
          </Link>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        redirectPath={`/events/${slug}`}
      />

      {/* Success Modal */}
      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
      />
    </div>
  );
};

export default EventDetailPage;