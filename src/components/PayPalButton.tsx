import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Shield, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface PayPalButtonProps {
  amount: number;
  items: any[];
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  onPaymentSuccess: (details: any) => void;
  onPaymentError: (error: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ 
  amount, 
  items,
  customerInfo,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get PayPal Client ID
  const paypalClientId = "AQzOhyCC1nOzwCaF2ElixgnO7m4A_KfuRbR31eMe7xDjpvmVNFNpts0dbOSMsIrwoHaITvwm_vQaNyXP_t";
  
  // Check if PayPal is properly configured
  const isPayPalConfigured = !!paypalClientId && paypalClientId !== "YOUR_PAYPAL_CLIENT_ID";

  // PayPal integration options - removed Pay Later
  const paypalOptions = {
    "client-id": paypalClientId,
    currency: "USD",
    intent: "capture",
    "enable-funding": "card,venmo",
    "disable-funding": "paylater,venmo", // Disabled Pay Later as requested
    "data-sdk-integration-source": "button-factory"
  };

  // Format items for PayPal (limit name and description length)
  const formatItemsForPayPal = (items: any[]) => {
    return items.map(item => ({
      name: item.name.substring(0, 127), // PayPal has 127 char limit for item names
      unit_amount: {
        currency_code: "USD",
        value: item.price.toFixed(2)
      },
      quantity: (item.quantity || 1).toString(),
      description: `${item.shade || ''} • ${item.length || ''}`.substring(0, 127),
      sku: item.id || `item-${Math.random().toString(36).substr(2, 9)}`
    }));
  };

  // Handle payment creation
  const createOrder = (data: any, actions: any) => {
    console.log('Creating PayPal order with amount:', amount);
    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: amount.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: amount.toFixed(2)
            }
          }
        },
        items: formatItemsForPayPal(items),
        description: "Premium Afro Kinky Bulk Hair Extensions - PAKBH",
        soft_descriptor: "PAKBH HAIR EXT", // Shows on customer's statement
        custom_id: `order_${Date.now()}`
      }],
      payer: customerInfo.email ? {
        email_address: customerInfo.email,
        name: customerInfo.name ? {
          given_name: customerInfo.name.split(' ')[0] || '',
          surname: customerInfo.name.split(' ').slice(1).join(' ') || ''
        } : undefined,
      } : undefined,
      application_context: {
        shipping_preference: "NO_SHIPPING", // We handle shipping separately
        user_action: "PAY_NOW",
        brand_name: "PAKBH Hair Extensions",
        return_url: `${window.location.origin}/payment-success`,
        cancel_url: `${window.location.origin}/cart`
      }
    });
  };

  // Handle payment approval
  const onApprove = async (data: any, actions: any) => {
    console.log('PayPal payment approved:', data);
    setIsProcessing(true);
    try {
      const details = await actions.order.capture();
      console.log('PayPal payment successful:', details);
      
      // Process payment on server
      const serverResponse = await fetch(`${import.meta.env.DEV ? 'http://localhost:3001' : 'https://serveforpakbh.onrender.com'}/api/process-paypal-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: details.id,
          payerID: details.payer.payer_id,
          amount: amount,
          customer: customerInfo,
          items: items
        }),
      });

      if (!serverResponse.ok) {
        throw new Error('Server processing failed');
      }

      onPaymentSuccess(details);
    } catch (error) {
      console.error('PayPal capture error:', error);
      onPaymentError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle payment errors
  const onError = (err: any) => {
    console.error('PayPal error:', err);
    onPaymentError(err);
  };

  if (!isPayPalConfigured) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle size={16} className="text-red-600" />
          <h4 className="font-medium text-red-800">Payment Configuration Error</h4>
        </div>
        <p className="text-red-700 text-sm">
          PayPal is not properly configured. Please contact support if this issue persists.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center">
            <Loader2 size={32} className="animate-spin text-blue-600 mb-3" />
            <p className="text-gray-700 font-medium">Processing your payment...</p>
            <p className="text-gray-500 text-sm mt-1">Please don't close this window</p>
          </div>
        </div>
      )}

      {/* PayPal Buttons */}
      <PayPalScriptProvider options={paypalOptions}>
        <div className={isProcessing ? "opacity-50 pointer-events-none" : ""}>
          <PayPalButtons
            style={{ 
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "paypal",
              height: 55,
              tagline: false
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            onCancel={() => {
              console.log('PayPal payment cancelled by user');
            }}
            fundingSource={undefined} // Let user choose funding source
          />
        </div>
      </PayPalScriptProvider>
      
      {/* Security Notice */}
      <div className="text-center pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-2">
          <CheckCircle size={16} className="text-green-600" />
          <span>Protected by PayPal Buyer Protection</span>
        </div>
        <p className="text-xs text-gray-500">
          Your payment is secure and encrypted. You may be eligible for PayPal's Purchase Protection program.
        </p>
      </div>
    </div>
  );
};

export default PayPalButton;