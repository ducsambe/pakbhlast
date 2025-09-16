import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Truck, 
  Shield, 
  RotateCcw, 
  Award,
  Plus,
  Minus,
  Check,
  MessageCircle,
  ArrowLeft
} from 'lucide-react';
import { getProductBySlug, getSimilarProducts, packOptions } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPack, setSelectedPack] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Get product by slug
  const product = id ? getProductBySlug(id) : null;
  const similarProducts = product ? getSimilarProducts(product, 4) : [];

  useEffect(() => {
    if (!product) {
      navigate('/collection/afro-kinky-bulk');
    }
  }, [product, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/collection/afro-kinky-bulk')}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Back to Collection
          </button>
        </div>
      </div>
    );
  }

  // Calculate discount percentage properly
  const calculateDiscountPercentage = (originalPrice: number, currentPrice: number): number => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  // Calculate pack pricing with proper discounts
  const calculatePackPrice = (basePrice: number, packCount: number, packDiscount: number) => {
    const totalPrice = basePrice * packCount;
    const discountAmount = (totalPrice * packDiscount) / 100;
    return totalPrice - discountAmount;
  };

  // Get current pack option
  const currentPackOption = packOptions.find(option => option.count === selectedPack) || packOptions[0];
  
  // Calculate prices
  const basePrice = product.price;
  const originalPackPrice = product.originalPrice ? product.originalPrice * selectedPack : basePrice * selectedPack;
  const currentPackPrice = calculatePackPrice(basePrice, selectedPack, currentPackOption.discount);
  const finalPrice = currentPackPrice * quantity;
  
  // Calculate discount percentages
  const productDiscountPercentage = product.originalPrice 
    ? calculateDiscountPercentage(product.originalPrice, product.price)
    : 0;
  
  const packDiscountPercentage = currentPackOption.discount;
  
  const totalDiscountPercentage = product.originalPrice 
    ? calculateDiscountPercentage(originalPackPrice, currentPackPrice)
    : packDiscountPercentage;

  const handleAddToCart = () => {
    const cartItem = {
      id: Date.now(),
      name: `${product.name} (${selectedPack} Pack${selectedPack > 1 ? 's' : ''})`,
      price: currentPackPrice,
      image: product.image,
      shade: product.color,
      length: product.length,
      quantity: quantity,
      slug: product.slug,
      packSize: selectedPack,
      originalPrice: originalPackPrice,
      discount: totalDiscountPercentage,
      savings: originalPackPrice - currentPackPrice
    };

    addToCart(cartItem);

    // Show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2';
    successDiv.innerHTML = `
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
      </svg>
      <span>Added to cart!</span>
    `;
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleSimilarProductClick = (productSlug: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate(`/product/${productSlug}`);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Home
            </button>
            <span className="text-gray-300">/</span>
            <button
              onClick={() => navigate('/collection/afro-kinky-bulk')}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Afro Kinky Bulk
            </button>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{product.color} - {product.length}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/collection/afro-kinky-bulk')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images[currentImageIndex] || product.image}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-96 md:h-[500px] object-cover"
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Discount Badge */}
              {totalDiscountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                  -{totalDiscountPercentage}% OFF
                </div>
              )}

              {/* Popular Badge */}
              {product.popular && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                  Popular
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Title and Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="space-y-4">
                {/* Pack Selection */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Choose Pack Size</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {packOptions.map((option) => {
                      const packPrice = calculatePackPrice(basePrice, option.count, option.discount);
                      const originalPrice = product.originalPrice ? product.originalPrice * option.count : basePrice * option.count;
                      const packDiscountPercentage = product.originalPrice 
                        ? calculateDiscountPercentage(originalPrice, packPrice)
                        : option.discount;

                      return (
                        <button
                          key={option.count}
                          onClick={() => setSelectedPack(option.count)}
                          className={`relative p-4 border-2 rounded-xl transition-all ${
                            selectedPack === option.count
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 bg-white hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-lg">{option.label}</span>
                                {option.badge && (
                                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                    selectedPack === option.count
                                      ? 'bg-white text-gray-900'
                                      : option.badge === 'Popular'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-green-100 text-green-800'
                                  }`}>
                                    {option.badge}
                                  </span>
                                )}
                              </div>
                              {packDiscountPercentage > 0 && (
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className={`text-sm ${
                                    selectedPack === option.count ? 'text-gray-300' : 'text-gray-500'
                                  }`}>
                                    Save {packDiscountPercentage}%
                                  </span>
                                  {product.originalPrice && (
                                    <span className={`text-sm line-through ${
                                      selectedPack === option.count ? 'text-gray-400' : 'text-gray-400'
                                    }`}>
                                      ${originalPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold">
                                ${packPrice.toFixed(2)}
                              </div>
                              <div className={`text-sm ${
                                selectedPack === option.count ? 'text-gray-300' : 'text-gray-500'
                              }`}>
                                ${(packPrice / option.count).toFixed(2)} per pack
                              </div>
                            </div>
                          </div>
                          
                          {/* Selection Indicator */}
                          <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedPack === option.count
                              ? 'border-white bg-white'
                              : 'border-gray-300'
                          }`}>
                            {selectedPack === option.count && (
                              <Check size={14} className="text-gray-900" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Quantity</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-6 py-3 font-bold text-lg min-w-[4rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-gray-600">
                      <span className="text-sm">Total: </span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${finalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Unit Price:</span>
                      <div className="flex items-center space-x-2">
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="font-bold text-gray-900">
                          ${basePrice.toFixed(2)}
                        </span>
                        {productDiscountPercentage > 0 && (
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">
                            -{productDiscountPercentage}%
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {selectedPack > 1 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pack Price ({selectedPack} packs):</span>
                        <div className="flex items-center space-x-2">
                          {product.originalPrice && (
                            <span className="text-gray-400 line-through">
                              ${originalPackPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="font-bold text-gray-900">
                            ${currentPackPrice.toFixed(2)}
                          </span>
                          {totalDiscountPercentage > 0 && (
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-bold">
                              -{totalDiscountPercentage}%
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {quantity > 1 && (
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="text-gray-600">Total ({quantity} × {selectedPack} pack{selectedPack > 1 ? 's' : ''}):</span>
                        <span className="text-xl font-bold text-gray-900">
                          ${finalPrice.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/* Savings Display */}
                    {totalDiscountPercentage > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-green-800 font-medium">You Save:</span>
                          <div className="text-right">
                            <div className="text-green-600 font-bold">
                              ${((originalPackPrice - currentPackPrice) * quantity).toFixed(2)}
                            </div>
                            <div className="text-green-600 text-sm">
                              ({totalDiscountPercentage}% off)
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-gray-600">Color:</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: product.colorCode }}
                    ></div>
                    <span className="font-semibold">{product.color}</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Length:</span>
                  <p className="font-semibold">{product.length}</p>
                </div>
                <div>
                  <span className="text-gray-600">Weight:</span>
                  <p className="font-semibold">{product.weight}</p>
                </div>
                <div>
                  <span className="text-gray-600">Texture:</span>
                  <p className="font-semibold">{product.texture}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check size={16} className="text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingBag size={20} />
                <span>Add to Cart - ${finalPrice.toFixed(2)}</span>
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold transition-colors ${
                    isWishlisted
                      ? 'bg-red-100 text-red-600 border border-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                </button>

                <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <Truck className="text-green-600 mx-auto mb-2" size={24} />
                <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-600">Worldwide</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <Shield className="text-blue-600 mx-auto mb-2" size={24} />
                <p className="text-sm font-semibold text-gray-900">48h Returns</p>
                <p className="text-xs text-gray-600">Unopened only</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <Award className="text-purple-600 mx-auto mb-2" size={24} />
                <p className="text-sm font-semibold text-gray-900">Premium Quality</p>
                <p className="text-xs text-gray-600">100% Human Hair</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <RotateCcw className="text-orange-600 mx-auto mb-2" size={24} />
                <p className="text-sm font-semibold text-gray-900">Easy Exchange</p>
                <p className="text-xs text-gray-600">Same price range</p>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Need Help Choosing?</h3>
              <p className="text-green-100 mb-4">
                Our hair experts are here to help you find the perfect match for your style.
              </p>
              <a
                href="https://wa.me/+33634549649?text=Hi! I need help with choosing the right Afro Kinky Bulk hair."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Chat with Expert</span>
              </a>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              More in {product.color}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => {
                const similarDiscountPercentage = similarProduct.originalPrice 
                  ? calculateDiscountPercentage(similarProduct.originalPrice, similarProduct.price)
                  : 0;

                return (
                  <div
                    key={similarProduct.id}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleSimilarProductClick(similarProduct.slug)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={similarProduct.image}
                        alt={similarProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {similarDiscountPercentage > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{similarDiscountPercentage}%
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 text-sm leading-tight">
                        {similarProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-900">${similarProduct.price}</span>
                          {similarProduct.originalPrice && (
                            <span className="text-gray-400 line-through text-sm">
                              ${similarProduct.originalPrice}
                            </span>
                          )}
                        </div>
                        {similarDiscountPercentage > 0 && (
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">
                            -{similarDiscountPercentage}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;