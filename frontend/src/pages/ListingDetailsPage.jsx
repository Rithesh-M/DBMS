import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { getListingById, getUserById, getCategoryById, chats } from '../mock';
import { Heart, MapPin, User, Calendar, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from '../hooks/use-toast';

const ListingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = React.useState(0);

  const listing = getListingById(id);
  const seller = getUserById(listing?.userId);
  const category = getCategoryById(listing?.categoryId);
  const inWishlist = isInWishlist(parseInt(id));

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Listing not found</h1>
        </div>
      </div>
    );
  }

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (inWishlist) {
      removeFromWishlist(listing.id);
      toast({ description: 'Removed from wishlist' });
    } else {
      addToWishlist(listing.id);
      toast({ description: 'Added to wishlist' });
    }
  };

  const handleChatWithSeller = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user.id === listing.userId) {
      toast({ description: 'This is your own listing' });
      return;
    }
    // Mock: Check if chat exists or create new
    const existingChat = chats.find(
      (c) => c.listingId === listing.id && c.buyerId === user.id
    );
    if (existingChat) {
      navigate(`/dashboard?tab=chats&chatId=${existingChat.id}`);
    } else {
      // Create new chat (mock)
      const newChatId = chats.length + 1;
      navigate(`/dashboard?tab=chats&chatId=${newChatId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] bg-gray-100">
                <img
                  src={listing.images[selectedImage]}
                  alt={listing.title}
                  className="w-full h-full object-contain"
                />
              </div>
              {listing.images.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {listing.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </Card>

            {/* Details */}
            <Card className="mt-6 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500 w-32">Author:</span>
                  <span className="text-gray-900">{listing.author || 'Not specified'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500 w-32">Category:</span>
                  <span className="text-gray-900">{category?.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500 w-32">Condition:</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {listing.condition}
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-sm font-medium text-gray-500 w-32">Location:</span>
                  <span className="text-gray-900">{listing.location}</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
              </div>
              {listing.exchangeDetails && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Exchange Details:</h3>
                  <p className="text-green-700">{listing.exchangeDetails}</p>
                </div>
              )}
            </Card>
          </div>

          {/* Right: Price and Actions */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                {listing.listingType === 'Exchange' ? (
                  <div className="text-2xl font-bold text-green-600">For Exchange</div>
                ) : (
                  <div className="text-3xl font-bold text-gray-900">₹{listing.price}</div>
                )}
                {listing.listingType === 'Both' && (
                  <div className="text-sm text-blue-600 font-medium mt-1">Exchange also available</div>
                )}
              </div>

              {/* Seller Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Seller Information</h3>
                <div className="flex items-center space-x-3 mb-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-900 font-medium">{seller?.username}</span>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">{seller?.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">
                    Posted {formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {user?.id !== listing.userId && (
                  <Button
                    onClick={handleChatWithSeller}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat with Seller
                  </Button>
                )}
                <Button
                  onClick={handleWishlistToggle}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Heart className={`w-5 h-5 mr-2 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                  {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>

              {user?.id === listing.userId && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center text-sm text-blue-700">
                  This is your listing
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListingDetailsPage;