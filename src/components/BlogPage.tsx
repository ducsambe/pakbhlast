import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Protective Hairstyles Perfect for Afro Kinky Hair",
      excerpt: "Discover the best protective styles that will keep your natural hair healthy while looking absolutely stunning.",
      image: "/IMG-20250629-WA0197.jpg",
      author: "Hair Expert Team",
      date: "2024-01-15",
      category: "Styling Tips",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How to Choose the Right Hair Length for Your Face Shape",
      excerpt: "Learn which hair lengths complement different face shapes and enhance your natural beauty.",
      image: "/IMG-20250629-WA0185.jpg",
      author: "Style Consultant",
      date: "2024-01-12",
      category: "Hair Guide",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "The Ultimate Guide to Caring for Your Afro Kinky Extensions",
      excerpt: "Everything you need to know about maintaining your hair extensions for maximum longevity.",
      image: "/IMG-20250629-WA0200.jpg",
      author: "Care Specialist",
      date: "2024-01-10",
      category: "Hair Care",
      readTime: "8 min read"
    },
    {
      id: 4,
      title: "Color Trends 2024: Bold Shades for Natural Hair",
      excerpt: "Explore the hottest color trends and learn how to safely color your natural hair extensions.",
      image: "/20250731-4.jpg",
      author: "Color Expert",
      date: "2024-01-08",
      category: "Color Trends",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "DIY Hair Masks for Healthy, Moisturized Hair",
      excerpt: "Simple homemade hair mask recipes using natural ingredients for gorgeous, healthy hair.",
      image: "/IMG-20250629-WA0189.jpg",
      author: "Natural Hair Guru",
      date: "2024-01-05",
      category: "DIY Care",
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "Installation Tips from Professional Stylists",
      excerpt: "Pro secrets for achieving salon-quality results when installing your own hair extensions.",
      image: "/IMG-20250629-WA0193.jpg",
      author: "Professional Stylist",
      date: "2024-01-03",
      category: "Installation",
      readTime: "10 min read"
    }
  ];

  const categories = ["All", "Styling Tips", "Hair Care", "Color Trends", "DIY Care", "Installation", "Hair Guide"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hair Care Blog</h1>
          <p className="text-xl text-indigo-100">
            Expert tips, tutorials, and inspiration for your hair journey
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 bg-white border border-gray-200 rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-colors font-medium"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-64 lg:h-auto">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  {blogPosts[0].category}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User size={16} />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                  </div>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                  <span>Read More</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Tag size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-500">{post.category}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User size={12} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center space-x-1">
                    <span>Read</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-center text-white mt-16">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with Hair Tips</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest hair care tips, styling tutorials, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;