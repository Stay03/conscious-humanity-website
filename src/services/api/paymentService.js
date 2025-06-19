import apiClient from './client';

/**
 * Initialize a payment transaction
 * 
 * @param {number|string} productId - The ID of the product to purchase
 * @returns {Promise} - Promise resolving to payment initialization data
 */
const initializePayment = async (productId) => {
  try {
    const endpoint = `/paystack/initialize`;
    const response = await apiClient.post(endpoint, { product_id: productId });
    return response;
  } catch (error) {
    console.error('Error initializing payment:', error);
    throw error;
  }
};

/**
 * Initialize payment for an order
 * 
 * @param {number|string} orderId - The ID of the order to pay for
 * @returns {Promise} - Promise resolving to payment initialization data
 */
const initializeOrderPayment = async (orderId) => {
  try {
    const endpoint = `/paystack/initialize-order`;
    const response = await apiClient.post(endpoint, { order_id: orderId });
    return response;
  } catch (error) {
    console.error('Error initializing order payment:', error);
    throw error;
  }
};

/**
 * Initialize payment for an event
 * 
 * @param {number|string} eventId - The ID of the event to pay for
 * @returns {Promise} - Promise resolving to payment initialization data
 */
const initializeEventPayment = async (eventId) => {
  try {
    const endpoint = `/paystack/initialize`;
    const response = await apiClient.post(endpoint, { event_id: eventId, quantity: 1 });
    return response;
  } catch (error) {
    console.error('Error initializing event payment:', error);
    throw error;
  }
};

/**
 * Verify a payment transaction
 * 
 * @param {string} reference - The transaction reference
 * @returns {Promise} - Promise resolving to payment verification data
 */
const verifyPayment = async (reference) => {
  try {
    const endpoint = `/paystack/verify?reference=${reference}`;
    const response = await apiClient.get(endpoint);
    return response;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

const paymentService = {
  initializePayment,
  initializeOrderPayment,
  initializeEventPayment,
  verifyPayment
};

export default paymentService;