
import type React from "react"
import { useState } from "react"
import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Award,
  Shield,
  Truck,
  Send,
  CheckCircle,
  HelpCircle,
  X,
} from "lucide-react"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showQA, setShowQA] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call - replace with your actual newsletter service
    setTimeout(() => {
      setIsSubscribed(true)
      setEmail("")
      setIsLoading(false)

      // Reset success message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000)
    }, 1000)
  }

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Installation Guide", href: "/installation-guide" },
    { label: "Care Instructions", href: "/care-instructions" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ]

  const supportLinks = [
    { label: "Shipping & Payment", href: "/shipping-payment" },
    { label: "Returns & Exchanges", href: "/returns-exchange" },
    { label: "FAQ", href: "/faq" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Stripe Documentation", href: "/stripe-docs" },
  ]

  const trustBadges = [
    { icon: Award, title: "100%", subtitle: "Human Hair" },
    { icon: Shield, title: "30 Day", subtitle: "Money Back" },
    { icon: Truck, title: "Free", subtitle: "Worldwide Shipping" },
    { icon: Shield, title: "SSL", subtitle: "Secure Checkout" },
  ]

  const socialLinks = [
    { icon: Instagram, color: "hover:text-pink-500", href: "https://instagram.com/yourusername" },
    { icon: Facebook, color: "hover:text-blue-500", href: "https://facebook.com/yourusername" },
    { icon: Youtube, color: "hover:text-red-500", href: "https://youtube.com/yourusername" },
  ]

  const faqs = [
    {
      question: "What is Afro Kinky Bulk Hair?",
      answer:
        "Afro Kinky Bulk Hair is 100% human hair with a natural kinky texture that perfectly mimics African textured hair. It's ideal for braiding, twisting, dreadlocks, and other protective hairstyles.",
    },
    {
      question: "How much hair do I need for a full head?",
      answer:
        "For a full head installation, we recommend 3-4 packs of our Afro Kinky Bulk Hair. The exact amount depends on your desired fullness and the size of your natural head.",
    },
    {
      question: "Can I color or dye the hair?",
      answer:
        "Yes! Since our Afro Kinky Bulk Hair is 100% human hair, it can be colored or dyed. However, we recommend going darker rather than lighter to maintain the hair's integrity.",
    },
    {
      question: "How long does the hair last?",
      answer:
        "With proper care and maintenance, our Afro Kinky Bulk Hair can last 6-12 months or even longer. The longevity depends on how well you care for it.",
    },
  ]

  return (
    <footer className="bg-black text-white">
      {/* Q&A Modal */}
      {showQA && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowQA(false);
            }
          }}
        >
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Q&A - Afro Kinky Bulk</h2>
              <button 
                onClick={() => setShowQA(false)} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/+3364549649?text=Hi! I have questions about Afro Kinky Bulk Hair."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-colors duration-300"
                  >
                    Chat on WhatsApp
                  </a>
                  <a
                    href="mailto:anaroyes7@gmail.com"
                    className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors duration-300"
                  >
                    Email Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated with Blen Hairs</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive offers, hair care tips, and be the first to know about new
              arrivals
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <Mail className="absolute right-3 top-3 text-gray-400" size={20} />
              </div>
              <button
                type="submit"
                disabled={isLoading || isSubscribed}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                ) : isSubscribed ? (
                  <>
                    <CheckCircle size={20} />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-3 text-center">Join 15,000+ subscribers. Unsubscribe anytime.</p>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Blen Hairs</h3>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Premium afro kinky bulk hair extensions for natural styling and protective hairstyles. Quality you can
              trust.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-gray-300 ${social.color} transition-colors p-3 bg-white/10 rounded-lg hover:bg-white/20`}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-xl">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-lg hover:pl-2 duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {/* Q&A Link */}
              <li>
                <button
                  onClick={() => setShowQA(true)}
                  className="text-gray-300 hover:text-white transition-colors text-lg hover:pl-2 duration-300 flex items-center space-x-2"
                >
                  <HelpCircle size={18} />
                  <span>Q&A - Afro Kinky Bulk</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-xl">Customer Support</h4>
            <ul className="space-y-4">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-lg hover:pl-2 duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-6 text-xl">Get in Touch</h4>
            <div className="space-y-6 text-gray-300">
              <div className="flex items-center space-x-4">
                <Phone size={20} className="text-yellow-400" />
                <div>
                  <p className="font-semibold text-white">Call Us</p>
                  <p className="text-lg">+33 6 34 54 96 49</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail size={20} className="text-yellow-400" />
                <div>
  <p className="font-semibold text-white">Email Us</p>
  <a href="mailto:anaroyes7@gmail.com" className="text-lg hover:underline">
    anaroyes7@gmail.com
  </a>
</div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin size={20} className="mt-1 text-yellow-400" />
                <div>
                  <p className="font-semibold text-white">Visit Us</p>
                  <p className="text-lg">
                  Montpellier, France
                    <br />
                    France
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-700 mt-16 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <badge.icon size={28} className="text-black" />
                </div>
                <div className="font-bold text-white text-lg">{badge.title}</div>
                <div className="text-sm text-gray-400">{badge.subtitle}</div>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row  items-center space-y-4 md:space-y-0 border-t border-gray-700 pt-8">
            <div className="text-lg text-gray-400">© {new Date().getFullYear()} PAKBH. All rights reserved.</div>
            
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
