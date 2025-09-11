
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Star, Eye, ShoppingBag } from "lucide-react"
import { getAllProducts } from "../data/products"
import { useCart } from "../context/CartContext"

const AfroKinkyCollection = () => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({})
  const [showAllProducts, setShowAllProducts] = useState(false)

  // Get all products without length filtering
  const allProducts = getAllProducts()

  // Show only first 8 products initially, or all if showAllProducts is true
  const displayedProducts = showAllProducts ? allProducts : allProducts.slice(0, 8)

  const handleProductClick = (productId: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setTimeout(() => {
      navigate(`/product/${productId}`)
    }, 100)
  }
const handleAddToCart = (product: any) => {
  addToCart({
    id: Date.now(), // Consider using product.id instead of Date.now()
    name: product.name,
    price: product.price,
    image: product.image,
    shade: product.color,
    length: product.length,
    quantity: 1,
    slug: product.slug // Add this line
  });


    // Show success message
    const successDiv = document.createElement("div")
    successDiv.className =
      "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2"
    successDiv.innerHTML = `
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
      </svg>
      <span>Added to cart!</span>
    `
    document.body.appendChild(successDiv)
    setTimeout(() => successDiv.remove(), 1000)
  }

  const handleMouseEnter = (productId: string) => {
    setHoveredProduct(productId)
    const product = allProducts.find((p) => p.id === productId)
    if (product && product.images.length > 1) {
      let imageIndex = 0
      const interval = setInterval(() => {
        imageIndex = (imageIndex + 1) % product.images.length
        setCurrentImageIndex((prev) => ({ ...prev, [productId]: imageIndex }))
      }, 1000)
      ;(window as any)[`interval_${productId}`] = interval
    }
  }

  const handleMouseLeave = (productId: string) => {
    setHoveredProduct(null)
    const interval = (window as any)[`interval_${productId}`]
    if (interval) {
      clearInterval(interval)
      delete (window as any)[`interval_${productId}`]
    }
    setCurrentImageIndex((prev) => ({ ...prev, [productId]: 0 }))
  }

  const getCurrentImage = (product: any) => {
    const index = currentImageIndex[product.id] || 0
    return product.images[index] || product.image
  }

      const handleSizeGuideClick = () => {
  navigate("/size-guide")
}


  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Afro Kinky Bulk Collection</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Premium 100% human hair extensions perfect for braiding, dreadlocks, and protective styling
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={() => handleMouseLeave(product.id)}
            >
              <div className="relative h-48 md:h-80 overflow-hidden">
                {/* Product Image */}
                <img
                  src={getCurrentImage(product) || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {product.popular && (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">Popular</div>
                  )}
                  {product.originalPrice && (
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save ${product.originalPrice - product.price}
                    </div>
                  )}
                </div>

                {/* Image Indicators for Carousel */}
                {product.images.length > 1 && hoveredProduct === product.id && (
                  <div className="absolute top-4 right-4 flex space-x-1">
                    {product.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === (currentImageIndex[product.id] || 0) ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Quick Actions Overlay - positioned at bottom */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-black/80 transition-all duration-300 ${
                    hoveredProduct === product.id ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  }`}
                >
                  <div className="flex space-x-2 p-4 justify-center">
                    <button
                      onClick={() => handleProductClick(product.id)}
                      className="bg-white text-gray-900 px-3 md:px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-1 md:space-x-2 text-xs md:text-sm"
                    >
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-yellow-500 text-black px-3 md:px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors flex items-center space-x-1 md:space-x-2 text-xs md:text-sm"
                    >
                      <ShoppingBag size={14} />
                      <span className="hidden sm:inline">Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-6">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={`md:w-3.5 md:h-3.5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-xs md:text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Product Name */}
                <h3 
                  className="font-bold text-gray-900 mb-3 text-xs md:text-lg leading-tight line-clamp-2 cursor-pointer hover:text-pink-600 transition-colors"
                  onClick={() => handleProductClick(product.id)}
                >
                  {product.name}
                </h3>

                {/* Color and Length */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: product.colorCode }}
                    ></div>
                    <span className="text-xs md:text-sm text-gray-600">{product.color}</span>
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700">{product.length}</span>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <span className="font-bold text-sm md:text-2xl text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-xs md:text-lg">${product.originalPrice}</span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <div className="bg-red-100 text-red-600 px-1 md:px-2 py-1 rounded-lg text-xs font-bold">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleProductClick(product.id)}
                    className="flex-1 bg-pink-900 text-white py-2 md:py-3 rounded-lg font-semibold text-xs md:text-base hover:bg-pink-800 transition-colors"
                  >
                    <span className="hidden sm:inline">View Product</span>
                    <span className="sm:hidden">View</span>
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-yellow-500 text-black p-2 md:p-3 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    <ShoppingBag size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        {!showAllProducts && allProducts.length > 8 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllProducts(true)}
              className="bg-pink-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-pink-800 transition-colors shadow-lg"
            >
              View All Products ({allProducts.length} total)
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Help Choosing the Perfect Hair?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our hair experts are here to help you find the perfect match for your style and needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/+33634549649?text=Hi! I need help choosing the perfect Afro Kinky Bulk hair for my style."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-colors duration-300"
              >
                Chat on WhatsApp
              </a>
         <button 
                onClick={handleSizeGuideClick}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-bold transition-colors duration-300"
              >
                View Size Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AfroKinkyCollection
