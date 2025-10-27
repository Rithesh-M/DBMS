import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Book Odyssey</h3>
            <p className="text-sm text-gray-400">
              India's largest marketplace for new and used books. Buy, sell, and exchange educational books, comics, and novels.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/search" className="hover:text-white transition-colors">Browse Books</Link></li>
              <li><Link to="/post-ad" className="hover:text-white transition-colors">Post Free Ad</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">My Account</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/search?category=1" className="hover:text-white transition-colors">Engineering</Link></li>
              <li><Link to="/search?category=2" className="hover:text-white transition-colors">Medical</Link></li>
              <li><Link to="/search?category=3" className="hover:text-white transition-colors">School Books</Link></li>
              <li><Link to="/search?category=5" className="hover:text-white transition-colors">Comics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Book Odyssey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;