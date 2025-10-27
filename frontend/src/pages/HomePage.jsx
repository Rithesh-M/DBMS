import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryGrid from '../components/CategoryGrid';
import ListingCard from '../components/ListingCard';
import { listings, categories } from '../mock';
import { Button } from '../components/ui/button';
import { BookOpen, TrendingUp, Shield } from 'lucide-react';

const HomePage = () => {
  // Prioritize educational books
  const educationalCategories = categories.filter(c => c.isEducational).map(c => c.id);
  const educationalBooks = listings.filter(l => educationalCategories.includes(l.categoryId)).slice(0, 4);
  const recentListings = [...listings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              India's Largest Book Marketplace
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Buy, Sell & Exchange New and Used Books
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/search">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Browse Books
                </Button>
              </Link>
              <Link to="/post-ad">
                <Button size="lg" variant="outline" className="px-8">
                  Post Free Ad
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Vast Collection</h3>
            <p className="text-gray-600">Thousands of books across all categories and subjects</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Prices</h3>
            <p className="text-gray-600">Get the best deals on new and used books</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h3>
            <p className="text-gray-600">Connect directly with verified buyers and sellers</p>
          </div>
        </div>

        {/* Categories */}
        <CategoryGrid />

        {/* Featured Educational Books */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Educational Books</h2>
            <Link to="/search?educational=true">
              <Button variant="link" className="text-blue-600">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {educationalBooks.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>

        {/* Recent Listings */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Listings</h2>
            <Link to="/search">
              <Button variant="link" className="text-blue-600">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;