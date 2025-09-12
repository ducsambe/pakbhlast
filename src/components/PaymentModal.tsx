import React, { useState, useEffect } from 'react';
import { X, CreditCard, Shield, Lock, CheckCircle, Truck, AlertCircle, Loader2, Wallet, Check } from 'lucide-react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PAYMENT_CONFIG } from '../config/payment';
import PostPaymentModal from './PostPaymentModal';
import PayPalButton from './PayPalButton';
import { sendOrderNotificationEmail } from '../utils/emailService';
import { stripePromise } from '../utils/stripeHelpers';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  items: any[];
}

const PaymentFormComponent: React.FC<{
  total: number;
  items: any[];
  formData: any;
  onPaymentResult: (result: any) => void;
}> = ({ total, items, formData, onPaymentResult }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      onPaymentResult({
        type: 'error',
        title: 'Payment System Error',
        message: 'Payment system is loading. Please try again.',
        details: 'The payment system is temporarily unavailable.'
      });
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onPaymentResult({
        type: 'error',
        title: 'Card Error',
        message: 'Please enter your card details.',
        details: 'Card information is required to process payment.'
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Import payment service
      const { createPaymentIntent, confirmPayment } = await import('../utils/paymentService');
      
      // Create payment intent
      const paymentIntentResult = await createPaymentIntent({
        amount: total,
        currency: PAYMENT_CONFIG.stripe.currency,
        customer: {
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone
        },
        items: items.map(item => ({
          id: item.id.toString(),
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          color: item.shade || item.color,
          length: item.length
        })),
        shipping: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: {
            line1: formData.address,
            city: formData.city,
            state: formData.state,
            postal_code: formData.zipCode,
            country: formData.country || 'US'
          }
        }
      });

      if (!paymentIntentResult.success) {
        throw new Error(paymentIntentResult.error || 'Failed to create payment intent');
      }

      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: {
            line1: formData.address,
            city: formData.city,
            state: formData.state,
            postal_code: formData.zipCode,
            country: formData.country || 'US',
          },
        },
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // Confirm payment with Stripe
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        paymentIntentResult.paymentIntent.client_secret,
        {
          payment_method: paymentMethod.id
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Confirm payment on server for email notifications
        await confirmPayment(paymentIntent.id);

        onPaymentResult({
          type: 'success',
          title: 'Payment Successful! 🎉',
          message: 'Your order has been confirmed and will be processed within 24 hours.',
          details: 'You will receive a confirmation email shortly with your order details and tracking information.',
          paymentData: paymentIntent,
          orderData: {
            customerInfo: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
            },
            items: items,
            total: total
          },
        });
      } else {
        throw new Error('Payment was not completed successfully');
      }
    } catch (error) {
      onPaymentResult({
        type: 'error',
        title: 'Payment Failed',
        message: error instanceof Error ? error.message : 'Something went wrong with your payment.',
        details: 'Please check your card details and try again, or contact our support team for assistance.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#9ca3af',
        },
      },
      invalid: {
        color: '#dc2626',
        iconColor: '#dc2626',
      },
      complete: {
        color: '#059669',
        iconColor: '#059669',
      },
    },
    hidePostalCode: false,
  };

  const handleCardChange = (event: any) => {
    setCardComplete(event.complete);
    setCardError(event.error ? event.error.message : '');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Card Element */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Card information
        </label>
        <div className={`border rounded-lg p-4 transition-all duration-200 ${
          cardComplete 
            ? 'border-green-500 bg-green-50' 
            : cardError 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400 focus-within:border-blue-500'
        }`}>
          <CardElement 
            options={cardElementOptions} 
            onChange={handleCardChange}
          />
        </div>
        
        {cardComplete && (
          <div className="flex items-center space-x-2 text-green-600 text-sm">
            <CheckCircle size={14} />
            <span>Card information is complete</span>
          </div>
        )}
        
        {cardError && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle size={14} />
            <span>{cardError}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing || !cardComplete}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : cardComplete
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isProcessing ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Lock size={18} />
            <span>Pay now</span>
          </>
        )}
      </button>
    </form>
  );
};

// Add ChevronDown component for mobile toggle
const ChevronDown = ({ className, size = 20 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, total, items }) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    country: "US"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPostPayment, setShowPostPayment] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const [completedPaymentMethod, setCompletedPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  // Calculate order totals
  const subtotal = total;
  const shipping = 0;
  const finalTotal = subtotal + shipping;

  // Validate form
  useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
    
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handlePaymentResult = (result: any) => {
    if (result.type === 'success') {
      setPaymentResult(result.paymentData);
      setCompletedPaymentMethod('stripe');
      setShowPostPayment(true);
      // Don't close the modal immediately, let PostPaymentModal handle it
    } else {
      // Show error in an alert for now - you can enhance this later
      alert(result.message || 'Payment failed. Please try again.');
    }

    // Send order notification email for successful payments
    if (result.type === 'success') {
      sendOrderNotificationEmail({
        orderId: result.paymentData?.id || `ORD-${Date.now()}`,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        products: items.map(item => ({
          name: item.name,
          color: item.shade,
          length: item.length,
          quantity: item.quantity || 1,
          price: item.price
        })),
        total: finalTotal,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod: 'Credit Card (Stripe)',
        orderDate: new Date().toISOString(),
        transactionId: result.paymentData?.id || 'N/A'
      });
    }
  };

  const handlePayPalSuccess = (details: any) => {
    console.log('PayPal payment successful:', details);
    setPaymentResult(details);
    setCompletedPaymentMethod('paypal');
    setShowPostPayment(true);
    // Don't close the modal immediately, let PostPaymentModal handle it

    // Send order notification email
    sendOrderNotificationEmail({
      orderId: details.id || `ORD-${Date.now()}`,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      products: items.map(item => ({
        name: item.name,
        color: item.shade,
        length: item.length,
        quantity: item.quantity || 1,
        price: item.price
      })),
      total: finalTotal,
      shippingAddress: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      paymentMethod: 'PayPal',
      orderDate: new Date().toISOString(),
      transactionId: details.id || 'N/A'
    });
  };

  const handlePayPalError = (error: any) => {
    console.error('PayPal payment error:', error);
    // Show error in an alert for now - you can enhance this later
    alert('PayPal payment failed. Please try again.');
  };

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'AU', name: 'Australia' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'BE', name: 'Belgium' }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <Lock size={20} className="text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Secure Checkout</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row max-h-[calc(95vh-80px)]">
            {/* Left Side - Form */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Contact Information */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Delivery */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.firstName ? "border-red-500" : "border-gray-300"
                        }`}
                        required
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                        required
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Postal code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.zipCode ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                  </div>
                  
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Shipping Method */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping method</h3>
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                      <div>
                        <span className="text-gray-600">Standard Shipping</span>
                        <p className="text-sm text-gray-600">5-7 business days</p>
                      </div>
                    </div>
                    <span className="text-gray-600">FREE</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment</h3>
                <p className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</p>
                
                {/* Payment Method Tabs */}
                <div className="space-y-3 mb-6">
                  {/* Credit Card Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                      paymentMethod === "card" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === "card" 
                            ? "border-blue-500 bg-blue-500" 
                            : "border-gray-300"
                        }`}>
                          {paymentMethod === "card" && <Check size={12} className="text-white" />}
                        </div>
                        <CreditCard size={20} className="text-gray-600" />
                        <span className="font-medium">Credit Card</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <img src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" alt="Visa" className="h-6" />
                        <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="Mastercard" className="h-6" />
                        <img src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" alt="Amex" className="h-6" />
                        <img src="https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg" alt="Discover" className="h-6" />
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">+2</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 ml-8">Other payment methods</p>
                  </button>

                  {/* Billing Address Checkbox */}
                  {paymentMethod === "card" && (
                    <div className="ml-8 mb-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={true}
                          readOnly
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Use shipping address as billing address</span>
                      </label>
                    </div>
                  )}
                  
                  {/* PayPal Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                      paymentMethod === "paypal" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === "paypal" 
                            ? "border-blue-500 bg-blue-500" 
                            : "border-gray-300"
                        }`}>
                          {paymentMethod === "paypal" && <Check size={12} className="text-white" />}
                        </div>
                        <Wallet size={20} className="text-gray-600" />
                        <span className="font-medium">PayPal</span>
                      </div>
                      <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal" className="h-8" />
                    </div>
                  </button>
                </div>

                {/* Payment Form Content */}
                {paymentMethod === "card" && isFormValid && (
                  <Elements stripe={stripePromise}>
                    <PaymentFormComponent
                      total={finalTotal}
                      items={items}
                      formData={formData}
                      onPaymentResult={handlePaymentResult}
                    />
                  </Elements>
                )}

                {paymentMethod === "paypal" && isFormValid && (
                  <PayPalButton
                    amount={finalTotal}
                    items={items}
                    customerInfo={{
                      name: `${formData.firstName} ${formData.lastName}`,
                      email: formData.email,
                      phone: formData.phone,
                    }}
                    onPaymentSuccess={handlePayPalSuccess}
                    onPaymentError={handlePayPalError}
                  />
                )}

                {!isFormValid && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-600 text-sm">
                      Please complete the delivery information above to continue with payment.
                    </p>
                  </div>
                )}
              </div>

              {/* Security Notice */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Shield size={16} className="text-green-600" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="w-full lg:w-96 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
              {/* Mobile Toggle */}
              <button
                onClick={() => setShowOrderSummary(!showOrderSummary)}
                className="lg:hidden w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg mb-4"
              >
                <span className="font-medium">Order Summary</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">${finalTotal.toFixed(2)}</span>
                  <ChevronDown className={`transform transition-transform ${showOrderSummary ? 'rotate-180' : ''}`} size={20} />
                </div>
              </button>

              <div className={`${showOrderSummary ? 'block' : 'hidden'} lg:block`}>
                {/* Products */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.quantity || 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.shade} • {item.length}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Discount Code */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Discount code"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Order Totals */}
                <div className="space-y-3 pb-4 border-b border-gray-200 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-sm text-gray-600">USD </span>
                    <span className="text-xl font-bold text-gray-900">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center text-xs">
                    <div className="flex flex-col items-center space-y-1">
                      <Shield size={16} className="text-green-600" />
                      <span className="text-gray-600">SSL Secure</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <Truck size={16} className="text-blue-600" />
                      <span className="text-gray-600">Free Shipping</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Payment Modal */}
      <PostPaymentModal
        isOpen={showPostPayment}
        onClose={() => {
          setShowPostPayment(false);
          onClose(); // Close the main payment modal after post-payment modal closes
        }}
        paymentResult={paymentResult}
        orderDetails={{
          items: items,
          total: finalTotal,
          customerInfo: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
          },
          billingAddress: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country
          }
        }}
        paymentMethod={completedPaymentMethod}
      />
    </>
  );
};

export default PaymentModal;