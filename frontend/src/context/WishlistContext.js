import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { wishlistData } from '../mock';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      const userWishlist = wishlistData[user.id] || [];
      setWishlist(userWishlist);
    } else {
      setWishlist([]);
    }
  }, [user]);

  const addToWishlist = (listingId) => {
    if (!wishlist.includes(listingId)) {
      const newWishlist = [...wishlist, listingId];
      setWishlist(newWishlist);
      if (user) {
        wishlistData[user.id] = newWishlist;
      }
    }
  };

  const removeFromWishlist = (listingId) => {
    const newWishlist = wishlist.filter(id => id !== listingId);
    setWishlist(newWishlist);
    if (user) {
      wishlistData[user.id] = newWishlist;
    }
  };

  const isInWishlist = (listingId) => {
    return wishlist.includes(listingId);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};