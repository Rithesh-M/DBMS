// Mock data for Book Odyssey

export const categories = [
  { id: 1, name: 'Engineering', isEducational: true, icon: '📐' },
  { id: 2, name: 'Medical', isEducational: true, icon: '⚕️' },
  { id: 3, name: 'School (Std 1-12)', isEducational: true, icon: '📚' },
  { id: 4, name: 'Competitive Exams', isEducational: true, icon: '📝' },
  { id: 5, name: 'Comics', isEducational: false, icon: '🦸' },
  { id: 6, name: 'Novels', isEducational: false, icon: '📖' },
  { id: 7, name: 'Management', isEducational: true, icon: '💼' },
  { id: 8, name: 'Law', isEducational: true, icon: '⚖️' },
];

export const users = [
  { id: 1, username: 'rajesh_kumar', email: 'rajesh@example.com', location: 'Mumbai' },
  { id: 2, username: 'priya_sharma', email: 'priya@example.com', location: 'Delhi' },
  { id: 3, username: 'amit_patel', email: 'amit@example.com', location: 'Bangalore' },
  { id: 4, username: 'sneha_gupta', email: 'sneha@example.com', location: 'Pune' },
  { id: 5, username: 'vikram_singh', email: 'vikram@example.com', location: 'Chennai' },
];

export const listings = [
  {
    id: 1,
    userId: 1,
    categoryId: 1,
    title: 'Engineering Mathematics by BS Grewal',
    author: 'B.S. Grewal',
    description: 'Complete engineering mathematics textbook. All chapters covered with solved examples. Perfect for semester exams.',
    condition: 'Good',
    listingType: 'Sell',
    price: 450,
    exchangeDetails: null,
    location: 'Mumbai, Maharashtra',
    status: 'Active',
    images: ['https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500'],
    createdAt: '2024-07-10T10:30:00Z',
  },
  {
    id: 2,
    userId: 2,
    categoryId: 2,
    title: 'Gray\'s Anatomy for Students',
    author: 'Richard Drake',
    description: 'Medical anatomy textbook in excellent condition. Minimal highlighting. Great for MBBS students.',
    condition: 'Like New',
    listingType: 'Sell',
    price: 1200,
    exchangeDetails: null,
    location: 'Delhi, Delhi',
    status: 'Active',
    images: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500'],
    createdAt: '2024-07-12T14:20:00Z',
  },
  {
    id: 3,
    userId: 3,
    categoryId: 3,
    title: 'NCERT Class 12 Physics Textbook',
    author: 'NCERT',
    description: 'Original NCERT Physics textbook for Class 12. All pages intact, no missing content.',
    condition: 'Good',
    listingType: 'Exchange',
    price: null,
    exchangeDetails: 'Looking for Class 12 Chemistry NCERT in exchange',
    location: 'Bangalore, Karnataka',
    status: 'Active',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500'],
    createdAt: '2024-07-13T09:15:00Z',
  },
  {
    id: 4,
    userId: 4,
    categoryId: 4,
    title: 'Objective Physics for JEE Main & Advanced',
    author: 'DC Pandey',
    description: 'Complete set of DC Pandey Physics. All 5 volumes included. Very good condition with minimal markings.',
    condition: 'Like New',
    listingType: 'Both',
    price: 2500,
    exchangeDetails: 'Can exchange for Chemistry or Mathematics JEE books',
    location: 'Pune, Maharashtra',
    status: 'Active',
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500'],
    createdAt: '2024-07-14T16:45:00Z',
  },
  {
    id: 5,
    userId: 5,
    categoryId: 5,
    title: 'Marvel Comics - Spider-Man Collection',
    author: 'Stan Lee',
    description: 'Limited edition Spider-Man comic collection. 10 issues from 1990s. Collector\'s item in pristine condition.',
    condition: 'New',
    listingType: 'Sell',
    price: 3500,
    exchangeDetails: null,
    location: 'Chennai, Tamil Nadu',
    status: 'Active',
    images: ['https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=500'],
    createdAt: '2024-07-15T11:00:00Z',
  },
  {
    id: 6,
    userId: 1,
    categoryId: 6,
    title: 'The Alchemist by Paulo Coelho',
    author: 'Paulo Coelho',
    description: 'Bestselling novel in good condition. A must-read for everyone.',
    condition: 'Good',
    listingType: 'Sell',
    price: 150,
    exchangeDetails: null,
    location: 'Mumbai, Maharashtra',
    status: 'Active',
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500'],
    createdAt: '2024-07-16T08:30:00Z',
  },
  {
    id: 7,
    userId: 3,
    categoryId: 1,
    title: 'Data Structures and Algorithms in Java',
    author: 'Robert Lafore',
    description: 'Comprehensive guide for DSA. Perfect for CS students and interview preparation.',
    condition: 'Like New',
    listingType: 'Sell',
    price: 550,
    exchangeDetails: null,
    location: 'Bangalore, Karnataka',
    status: 'Active',
    images: ['https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500'],
    createdAt: '2024-07-17T13:20:00Z',
  },
  {
    id: 8,
    userId: 2,
    categoryId: 7,
    title: 'Management Accounting by Paresh Shah',
    author: 'Paresh Shah',
    description: 'MBA reference book for management accounting. All topics covered with case studies.',
    condition: 'Good',
    listingType: 'Sell',
    price: 400,
    exchangeDetails: null,
    location: 'Delhi, Delhi',
    status: 'Active',
    images: ['https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500'],
    createdAt: '2024-07-18T10:00:00Z',
  },
];

export const chats = [
  {
    id: 1,
    listingId: 1,
    buyerId: 2,
    sellerId: 1,
    listing: listings[0],
    buyer: users[1],
    seller: users[0],
    messages: [
      { id: 1, senderId: 2, text: 'Hi, is this book still available?', timestamp: '2024-07-11T10:00:00Z' },
      { id: 2, senderId: 1, text: 'Yes, it is available!', timestamp: '2024-07-11T10:05:00Z' },
      { id: 3, senderId: 2, text: 'Can you negotiate on the price?', timestamp: '2024-07-11T10:10:00Z' },
      { id: 4, senderId: 1, text: 'The price is quite reasonable. I can offer ₹430.', timestamp: '2024-07-11T10:15:00Z' },
    ],
  },
  {
    id: 2,
    listingId: 3,
    buyerId: 1,
    sellerId: 3,
    listing: listings[2],
    buyer: users[0],
    seller: users[2],
    messages: [
      { id: 5, senderId: 1, text: 'I have Chemistry NCERT. Can we exchange?', timestamp: '2024-07-14T09:00:00Z' },
      { id: 6, senderId: 3, text: 'Perfect! Where are you located?', timestamp: '2024-07-14T09:10:00Z' },
      { id: 7, senderId: 1, text: 'I am in Mumbai. Can we meet?', timestamp: '2024-07-14T09:20:00Z' },
    ],
  },
];

// Wishlist data (userId -> listingIds)
export const wishlistData = {
  1: [2, 4, 7],
  2: [1, 3],
  3: [5, 6],
  4: [1, 2],
  5: [3, 4],
};

// Current logged-in user (mock)
export let currentUser = null;

export const setCurrentUser = (user) => {
  currentUser = user;
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

export const getCurrentUser = () => {
  if (currentUser) return currentUser;
  const stored = localStorage.getItem('currentUser');
  if (stored) {
    currentUser = JSON.parse(stored);
    return currentUser;
  }
  return null;
};

// Helper functions
export const getListingById = (id) => listings.find(l => l.id === parseInt(id));
export const getUserById = (id) => users.find(u => u.id === parseInt(id));
export const getCategoryById = (id) => categories.find(c => c.id === parseInt(id));
export const getListingsByCategory = (categoryId) => listings.filter(l => l.categoryId === parseInt(categoryId));
export const searchListings = (query, filters = {}) => {
  let results = [...listings];
  
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(l => 
      l.title.toLowerCase().includes(lowerQuery) ||
      l.author.toLowerCase().includes(lowerQuery) ||
      l.description.toLowerCase().includes(lowerQuery)
    );
  }
  
  if (filters.categoryId) {
    results = results.filter(l => l.categoryId === parseInt(filters.categoryId));
  }
  
  if (filters.location) {
    results = results.filter(l => l.location.toLowerCase().includes(filters.location.toLowerCase()));
  }
  
  if (filters.condition) {
    results = results.filter(l => l.condition === filters.condition);
  }
  
  if (filters.listingType) {
    results = results.filter(l => l.listingType === filters.listingType || l.listingType === 'Both');
  }
  
  if (filters.minPrice !== undefined) {
    results = results.filter(l => l.price && l.price >= filters.minPrice);
  }
  
  if (filters.maxPrice !== undefined) {
    results = results.filter(l => l.price && l.price <= filters.maxPrice);
  }
  
  return results;
};