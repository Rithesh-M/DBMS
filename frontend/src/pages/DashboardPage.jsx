import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';
import ChatWindow from '../components/ChatWindow';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { listings, chats, getListingById } from '../mock';
import { Trash2, Edit } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { wishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'listings');
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
    const chatId = searchParams.get('chatId');
    if (chatId && tab === 'chats') {
      const chat = chats.find((c) => c.id === parseInt(chatId));
      setSelectedChat(chat);
    }
  }, [searchParams]);

  if (!user) return null;

  const myListings = listings.filter((l) => l.userId === user.id);
  const myWishlistItems = listings.filter((l) => wishlist.includes(l.id));
  const myChats = chats.filter((c) => c.buyerId === user.id || c.sellerId === user.id);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleDeleteListing = (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      toast({ description: 'Listing deleted successfully' });
      // Mock delete
    }
  };

  const handleMarkAsSold = (listingId) => {
    toast({ description: 'Listing marked as sold' });
    // Mock update
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Dashboard</h1>

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-6">
            <TabsTrigger value="listings">My Listings ({myListings.length})</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist ({myWishlistItems.length})</TabsTrigger>
            <TabsTrigger value="chats">Chats ({myChats.length})</TabsTrigger>
          </TabsList>

          {/* My Listings */}
          <TabsContent value="listings">
            {myListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {myListings.map((listing) => (
                  <div key={listing.id} className="relative">
                    <ListingCard listing={listing} />
                    <div className="absolute top-2 left-2 flex space-x-2 z-10">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white shadow-md"
                        onClick={() => navigate(`/listing/${listing.id}`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white shadow-md text-red-600"
                        onClick={() => handleDeleteListing(listing.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {listing.status === 'Active' && (
                      <Button
                        onClick={() => handleMarkAsSold(listing.id)}
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                      >
                        Mark as Sold
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-gray-500 mb-4">You haven't posted any listings yet</p>
                <Button onClick={() => navigate('/post-ad')} className="bg-blue-600 hover:bg-blue-700">
                  Post Your First Ad
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Wishlist */}
          <TabsContent value="wishlist">
            {myWishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {myWishlistItems.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                <Button onClick={() => navigate('/search')} className="bg-blue-600 hover:bg-blue-700">
                  Browse Books
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Chats */}
          <TabsContent value="chats">
            {myChats.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chat List */}
                <div className="lg:col-span-1">
                  <Card className="overflow-hidden">
                    <div className="bg-gray-50 border-b border-gray-200 p-4">
                      <h3 className="font-semibold text-gray-900">Messages</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {myChats.map((chat) => {
                        const otherUser = chat.buyerId === user.id ? chat.seller : chat.buyer;
                        const lastMessage = chat.messages[chat.messages.length - 1];
                        return (
                          <button
                            key={chat.id}
                            onClick={() => {
                              setSelectedChat(chat);
                              setSearchParams({ tab: 'chats', chatId: chat.id });
                            }}
                            className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                              selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                            }`}
                          >
                            <h4 className="font-semibold text-gray-900 mb-1">{otherUser?.username}</h4>
                            <p className="text-sm text-gray-600 truncate mb-1">{chat.listing?.title}</p>
                            <p className="text-xs text-gray-400 truncate">{lastMessage?.text}</p>
                          </button>
                        );
                      })}
                    </div>
                  </Card>
                </div>

                {/* Chat Window */}
                <div className="lg:col-span-2">
                  <Card className="h-[600px]">
                    <ChatWindow chat={selectedChat} />
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-gray-500 mb-4">No chat messages yet</p>
                <Button onClick={() => navigate('/search')} className="bg-blue-600 hover:bg-blue-700">
                  Start Browsing
                </Button>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;