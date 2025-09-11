# Blen Hairs - Premium Afro Kinky Bulk Hair Extensions

A modern e-commerce website for premium human hair extensions, built with React, TypeScript, and Tailwind CSS.

## Features

- **Product Catalog**: Browse premium afro kinky bulk hair extensions
- **Shopping Cart**: Add/remove items with quantity management
- **Secure Payments**: Integrated with Stripe for secure payment processing
- **Responsive Design**: Mobile-first design that works on all devices
- **Product Filtering**: Filter by color, length, and price
- **Customer Reviews**: Display ratings and reviews
- **WhatsApp Integration**: Direct customer support via WhatsApp

## Payment Integration

This application supports multiple payment methods for customer convenience:

### Stripe Integration
- **Test Mode**: Currently configured for testing
- **Supported Cards**: Visa, Mastercard, American Express
- **Security**: PCI DSS compliant, SSL encrypted
- **Test Card**: Use `4242 4242 4242 4242` for testing

### PayPal Integration
- **PayPal Payments**: Full PayPal account payments
- **Pay Later**: PayPal Pay in 4 option
- **Buyer Protection**: Full PayPal buyer protection
- **Test Mode**: Sandbox environment for testing

### Payment Configuration

**Stripe Configuration:**
- **Publishable Key**: `pk_test_HK8VL8YzwlZ24Fw2tRZEVg6h`
- **Environment**: Test mode
- **Currency**: USD

**PayPal Configuration:**
- **Status**: Temporarily disabled (awaiting client access)
- **Environment**: Will be configured when access is provided
- **Currency**: USD
- **Features**: Will include standard payments + Pay Later

### Customer Support
- **WhatsApp**: +33 6 34 54 96 49
- **Email**: anaroyes7@gmail.com
- **Response Time**: Under 5 minutes via WhatsApp

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── ProductPage.tsx # Product details
│   ├── CartPage.tsx    # Shopping cart
│   ├── PaymentModal.tsx # Payment processing
│   └── StripePaymentForm.tsx # Stripe integration
├── config/             # Configuration files
│   └── payment.ts      # Payment configuration
├── context/            # React context
│   └── CartContext.tsx # Shopping cart state
├── data/               # Product data
│   └── products.ts     # Product catalog
└── utils/              # Utility functions
    └── stripeHelpers.ts # Stripe helper functions
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Stripe** - Payment processing
- **Vite** - Build tool

## Payment Testing

### Stripe Test Cards

- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

Use any future expiry date and any 3-digit CVC.

### PayPal Testing

Use PayPal sandbox accounts:
- **Buyer Account**: Create at developer.paypal.com
- **Seller Account**: Configured in PayPal dashboard
- **Test Environment**: Sandbox mode enabled

## Deployment

The application is deployed on Netlify and can be accessed at:
https://delicate-banoffee-384c86.netlify.app

## Support

For customer support, users can:
- Use the WhatsApp integration for instant chat: +1 (786) 628-0163
- Email support through the contact forms
- Browse the comprehensive FAQ section
- Get help with payment issues through multiple channels

## License

This project is proprietary software for Blen Hairs.