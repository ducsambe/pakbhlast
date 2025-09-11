

import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useLocation } from "react-router-dom"
import Header from "./components/Header"
import Hero from "./components/Hero"
import AfroKinkyCollection from "./components/AfroKinkyCollection"
import ProductPage from "./components/ProductPage"
import AboutUs from "./components/AboutUs"
import CartPage from "./components/CartPage"
import ContactPage from "./components/ContactPage"

import Footer from "./components/Footer"
import WhatsAppButton from "./components/WhatsAppButton"
import MainPageContact from "./components/MainPageContact"
import { CartProvider } from "./context/CartContext"
import QASection from "./components/QASection"

// Import all the new pages
import SizeGuidePage from "./components/SizeGuidePage"
import InstallationGuidePage from "./components/InstallationGuidePage"
import CareInstructionsPage from "./components/CareInstructionsPage"
import BlogPage from "./components/BlogPage"
import ShippingPaymentPage from "./components/ShippingPaymentPage"
import ReturnsExchangePage from "./components/ReturnsExchangePage"
import FAQPage from "./components/FAQPage"
import CookiePolicyPage from "./components/CookiePolicyPage"
import StripeDocumentationPage from "./components/StripeDocumentationPage"

// Placeholder components for other pages
const TrackOrderPage = () => <div className="min-h-screen bg-gray-50 flex items-center justify-center"><h1 className="text-3xl font-bold">Track Your Order - Coming Soon</h1></div>
const ReviewsPage = () => <div className="min-h-screen bg-gray-50 flex items-center justify-center"><h1 className="text-3xl font-bold">Customer Reviews - Coming Soon</h1></div>
const WholesalePage = () => <div className="min-h-screen bg-gray-50 flex items-center justify-center"><h1 className="text-3xl font-bold">Wholesale - Coming Soon</h1></div>
const PrivacyPolicyPage = () => <div className="min-h-screen bg-gray-50 flex items-center justify-center"><h1 className="text-3xl font-bold">Privacy Policy - Coming Soon</h1></div>
const TermsOfServicePage = () => <div className="min-h-screen bg-gray-50 flex items-center justify-center"><h1 className="text-3xl font-bold">Terms of Service - Coming Soon</h1></div>

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const HomePage = () => (
  <>
    <Hero />
    <AfroKinkyCollection />
    <AboutUs />
    <MainPageContact />
  </>
)

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collection/afro-kinky-bulk" element={<AfroKinkyCollection />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/cart" element={<CartPage />} />
            <Route path="/size-guide" element={<SizeGuidePage />} />
            <Route path="/installation-guide" element={<InstallationGuidePage />} />
            <Route path="/care-instructions" element={<CareInstructionsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/shipping-payment" element={<ShippingPaymentPage />} />
            <Route path="/returns-exchange" element={<ReturnsExchangePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/stripe-docs" element={<StripeDocumentationPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/wholesale" element={<WholesalePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
