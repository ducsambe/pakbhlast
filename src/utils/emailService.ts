// EmailJS service for order notifications and contact forms
import emailjs from 'emailjs-com';

// EmailJS Configuration - VERIFY THESE IDs IN YOUR DASHBOARD
const EMAILJS_CONFIG = {
  serviceId: 'service_cr6rl04',     // Your EmailJS service ID
  userId: 'lHkwL21byp84i6HMn',      // Your EmailJS public key
  templates: {
    orderComplete: 'template_g2kczl3',  // Template for business order notifications
    contactForm: 'template_eu505hn',    // Template for contact forms
  }
};

/**
 * Initializes EmailJS with your public key
 * Call this function when your application starts
 */
export const initializeEmailJS = (): void => {
  emailjs.init(EMAILJS_CONFIG.userId);
};

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  products: Array<{
    name: string;
    color: string;
    length: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  orderDate: string;
  transactionId: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

/**
 * Sends order notification email to business
 * @param orderDetails - Complete order information
 * @returns Promise with success status and optional error message
 */
export const sendOrderNotificationEmail = async (
  orderDetails: OrderDetails
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Prepare formatted products list for email
    const productsList = orderDetails.products
      .map(product => 
        `• ${product.quantity}x ${product.name} (${product.color}, ${product.length}) - $${product.price.toFixed(2)}`
      )
      .join('\n');

    // Prepare template parameters for EmailJS
    const templateParams = {
      to_email: 'anaroyes7@gmail.com', // Your business email
      order_id: orderDetails.orderId,
      customer_name: orderDetails.customerName,
      customer_email: orderDetails.customerEmail,
      customer_phone: orderDetails.customerPhone || 'Not provided',
      products_list: productsList,
      total_amount: `$${orderDetails.total.toFixed(2)}`,
      shipping_address: `${orderDetails.shippingAddress.street}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zipCode}, ${orderDetails.shippingAddress.country}`,
      payment_method: orderDetails.paymentMethod,
      transaction_id: orderDetails.transactionId,
      order_date: new Date(orderDetails.orderDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      business_email: 'anaroyes7@gmail.com' // Your business email
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.orderComplete,
      templateParams
    );

    console.log('Order notification email sent successfully:', response);
    return { success: true };

  } catch (error) {
    console.error('Failed to send order notification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
};

/**
 * Sends contact form submission email to business
 * @param formData - Contact form data
 * @returns Promise with success status and optional error message
 */
export const sendContactFormEmail = async (
  formData: ContactFormData
): Promise<{ success: boolean; error?: string }> => {
  try {
    const templateParams = {
      to_email: 'anaroyes7@gmail.com', // Your business email
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject || 'New Contact Form Message',
      message: formData.message,
      reply_to: formData.email,
      business_email: 'anaroyes7@gmail.com', // Your business email
      submission_date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.contactForm,
      templateParams
    );

    console.log('Contact form email sent successfully:', response);
    return { success: true };

  } catch (error) {
    console.error('Failed to send contact form email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
};