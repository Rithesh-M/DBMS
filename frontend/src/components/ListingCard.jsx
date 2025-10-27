import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { getUserById, getCategoryById } from '../mock';
import { Card } from './ui/card';
import { formatDistanceToNow } from 'date-fns';

const ListingCard = ({ listing }) => {
  const { isAuthenticated } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(listing.id);
  const seller = getUserById(listing.userId);
  const category = getCategoryById(listing.categoryId);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please login to add items to wishlist');
      return;
    }
    if (inWishlist) {
      removeFromWishlist(listing.id);
    } else {
      addToWishlist(listing.id);
    }
  };

  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  return (
    <Link to={`/listing/${listing.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          {isAuthenticated && (
            <button
              onClick={handleWishlistToggle}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
            >
              <Heart
                className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
          )}
          {listing.condition === 'New' && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
              NEW
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{category?.name}</div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {listing.title}
          </h3>
          <div className="flex items-center justify-between mb-2">
            {listing.listingType === 'Exchange' ? (
              <span className="text-lg font-bold text-green-600">For Exchange</span>
            ) : (
              <span className="text-xl font-bold text-gray-900">₹{listing.price}</span>
            )}
            {listing.listingType === 'Both' && (
              <span className="text-xs text-blue-600 font-medium">Exchange Available</span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{listing.location}</span>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{formatDate(listing.createdAt)}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ListingCard;