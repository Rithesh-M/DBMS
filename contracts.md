# Book Odyssey - API Contracts & Backend Implementation Plan

## Overview
This document outlines the API contracts, mock data replacements, and backend implementation strategy for Book Odyssey.

## 1. API Contracts

### Authentication Endpoints

#### POST /api/auth/register
**Request:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "location": "string"
}
```
**Response:**
```json
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "location": "string"
  },
  "token": "string"
}
```

#### POST /api/auth/login
**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "location": "string"
  },
  "token": "string"
}
```

#### GET /api/auth/me (Protected)
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "location": "string"
  }
}
```

### Listing Endpoints

#### GET /api/listings
**Query Parameters:**
- search (optional): string
- location (optional): string
- category (optional): number
- condition (optional): string
- listingType (optional): "Sell" | "Exchange"
- minPrice (optional): number
- maxPrice (optional): number
- sortBy (optional): "date" | "price"

**Response:**
```json
{
  "listings": [
    {
      "id": "string",
      "userId": "string",
      "categoryId": number,
      "title": "string",
      "author": "string",
      "description": "string",
      "condition": "New" | "Like New" | "Good" | "Used",
      "listingType": "Sell" | "Exchange" | "Both",
      "price": number | null,
      "exchangeDetails": "string" | null,
      "location": "string",
      "status": "Active" | "Sold" | "Expired",
      "images": ["string"],
      "createdAt": "string",
      "seller": {
        "id": "string",
        "username": "string",
        "location": "string"
      }
    }
  ]
}
```

#### GET /api/listings/:id
**Response:**
```json
{
  "listing": {
    "id": "string",
    "userId": "string",
    "categoryId": number,
    "title": "string",
    "author": "string",
    "description": "string",
    "condition": "string",
    "listingType": "string",
    "price": number | null,
    "exchangeDetails": "string" | null,
    "location": "string",
    "status": "string",
    "images": ["string"],
    "createdAt": "string",
    "seller": {
      "id": "string",
      "username": "string",
      "location": "string"
    },
    "category": {
      "id": number,
      "name": "string",
      "isEducational": boolean
    }
  }
}
```

#### POST /api/listings (Protected)
**Headers:** Authorization: Bearer {token}
**Request:** (multipart/form-data)
```json
{
  "title": "string",
  "author": "string",
  "categoryId": number,
  "condition": "string",
  "description": "string",
  "listingType": "string",
  "price": number | null,
  "exchangeDetails": "string" | null,
  "location": "string",
  "images": [File]
}
```
**Response:**
```json
{
  "listing": { ... }
}
```

#### PUT /api/listings/:id (Protected)
**Headers:** Authorization: Bearer {token}
**Request:** Same as POST
**Response:** Same as POST

#### DELETE /api/listings/:id (Protected)
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "message": "Listing deleted successfully"
}
```

#### PATCH /api/listings/:id/status (Protected)
**Headers:** Authorization: Bearer {token}
**Request:**
```json
{
  "status": "Sold" | "Active"
}
```
**Response:**
```json
{
  "listing": { ... }
}
```

### Category Endpoints

#### GET /api/categories
**Response:**
```json
{
  "categories": [
    {
      "id": number,
      "name": "string",
      "isEducational": boolean
    }
  ]
}
```

### Wishlist Endpoints

#### GET /api/wishlist (Protected)
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "wishlist": [
    {
      "id": "string",
      "listingId": "string",
      "listing": { ... }
    }
  ]
}
```

#### POST /api/wishlist (Protected)
**Headers:** Authorization: Bearer {token}
**Request:**
```json
{
  "listingId": "string"
}
```
**Response:**
```json
{
  "message": "Added to wishlist"
}
```

#### DELETE /api/wishlist/:listingId (Protected)
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "message": "Removed from wishlist"
}
```

### Chat Endpoints

#### GET /api/chats (Protected)
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "chats": [
    {
      "id": "string",
      "listingId": "string",
      "buyerId": "string",
      "sellerId": "string",
      "listing": { ... },
      "buyer": { ... },
      "seller": { ... },
      "lastMessage": {
        "text": "string",
        "timestamp": "string"
      }
    }
  ]
}
```

#### POST /api/chats/initiate (Protected)
**Headers:** Authorization: Bearer {token}
**Request:**
```json
{
  "listingId": "string"
}
```
**Response:**
```json
{
  "chat": {
    "id": "string",
    "listingId": "string",
    "buyerId": "string",
    "sellerId": "string"
  }
}
```

#### GET /api/chats/:chatId/messages (Protected)
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "messages": [
    {
      "id": "string",
      "chatId": "string",
      "senderId": "string",
      "text": "string",
      "timestamp": "string"
    }
  ]
}
```

#### POST /api/chats/:chatId/messages (Protected)
**Headers:** Authorization: Bearer {token}
**Request:**
```json
{
  "text": "string"
}
```
**Response:**
```json
{
  "message": {
    "id": "string",
    "chatId": "string",
    "senderId": "string",
    "text": "string",
    "timestamp": "string"
  }
}
```

## 2. Mock Data Replacements

### Current Mock Data (in /app/frontend/src/mock.js)

1. **Categories** - Static data (will remain as is, can be seeded into DB)
2. **Users** - Mock users with quick login (replace with real auth)
3. **Listings** - Mock book listings (replace with API calls)
4. **Chats** - Mock chat conversations (replace with API calls)
5. **Wishlist** - Local state management (replace with API calls)

### Files to Update for Backend Integration

1. **AuthContext** (`/app/frontend/src/context/AuthContext.js`)
   - Replace mock login/logout with API calls
   - Implement JWT token storage
   - Add token refresh logic

2. **WishlistContext** (`/app/frontend/src/context/WishlistContext.js`)
   - Replace local state with API calls
   - Fetch wishlist from backend
   - Add/remove items via API

3. **HomePage** (`/app/frontend/src/pages/HomePage.jsx`)
   - Replace `listings` import with API call to GET /api/listings
   - Filter educational books using API query params

4. **ListingDetailsPage** (`/app/frontend/src/pages/ListingDetailsPage.jsx`)
   - Replace `getListingById` with API call to GET /api/listings/:id
   - Implement chat initiation via POST /api/chats/initiate

5. **CreateListingPage** (`/app/frontend/src/pages/CreateListingPage.jsx`)
   - Replace mock submission with API call to POST /api/listings
   - Implement image upload using FormData

6. **SearchPage** (`/app/frontend/src/pages/SearchPage.jsx`)
   - Replace `searchListings` with API call to GET /api/listings with query params

7. **DashboardPage** (`/app/frontend/src/pages/DashboardPage.jsx`)
   - Fetch user listings via GET /api/listings?userId={currentUserId}
   - Fetch wishlist via GET /api/wishlist
   - Fetch chats via GET /api/chats
   - Implement delete/update actions

8. **ChatWindow** (`/app/frontend/src/components/ChatWindow.jsx`)
   - Replace mock messages with API calls
   - Implement message sending via POST /api/chats/:chatId/messages
   - Add polling or WebSocket for real-time updates (future)

## 3. Backend Implementation (MongoDB + FastAPI)

### Database Collections

1. **users**
   - _id: ObjectId
   - username: string (unique)
   - email: string (unique)
   - password_hash: string
   - location: string
   - created_at: datetime

2. **categories**
   - _id: ObjectId
   - name: string
   - is_educational: boolean

3. **listings**
   - _id: ObjectId
   - user_id: ObjectId (ref: users)
   - category_id: int
   - title: string
   - author: string
   - description: string
   - condition: enum
   - listing_type: enum
   - price: float (nullable)
   - exchange_details: string (nullable)
   - location: string
   - status: enum (default: "Active")
   - images: array[string]
   - created_at: datetime

4. **wishlists**
   - _id: ObjectId
   - user_id: ObjectId (ref: users)
   - listing_id: ObjectId (ref: listings)
   - created_at: datetime
   - unique_constraint: [user_id, listing_id]

5. **chats**
   - _id: ObjectId
   - listing_id: ObjectId (ref: listings)
   - buyer_id: ObjectId (ref: users)
   - seller_id: ObjectId (ref: users)
   - created_at: datetime
   - unique_constraint: [listing_id, buyer_id]

6. **messages**
   - _id: ObjectId
   - chat_id: ObjectId (ref: chats)
   - sender_id: ObjectId (ref: users)
   - text: string
   - timestamp: datetime

### Backend Routes Structure

```
/app/backend/
├── models/
│   ├── user.py
│   ├── listing.py
│   ├── category.py
│   ├── wishlist.py
│   ├── chat.py
│   └── message.py
├── routes/
│   ├── auth.py
│   ├── listings.py
│   ├── categories.py
│   ├── wishlist.py
│   └── chats.py
├── utils/
│   ├── auth.py (JWT helpers)
│   └── file_upload.py
└── server.py
```

## 4. Frontend Integration Steps

1. **Create API service file** (`/app/frontend/src/services/api.js`)
   - Centralized axios instance with base URL
   - Token injection interceptor
   - Error handling interceptor

2. **Update contexts to use API**
   - AuthContext: JWT-based authentication
   - WishlistContext: Backend-synced wishlist

3. **Update pages to fetch from API**
   - Replace all mock data imports with API calls
   - Add loading states
   - Add error handling

4. **Image Upload**
   - Use FormData for multipart uploads
   - Store images in /app/backend/uploads/ or cloud storage
   - Return image URLs in API responses

## 5. Testing Plan

1. Test authentication flow (register, login, logout)
2. Test listing CRUD operations
3. Test search and filters
4. Test wishlist add/remove
5. Test chat initiation and messaging
6. Test image upload
7. Test protected routes
8. Test error scenarios

## Notes

- All data is currently mocked in `/app/frontend/src/mock.js`
- Backend will use MongoDB instead of MySQL (as per platform requirements)
- REST-based messaging instead of WebSockets for MVP
- Images stored locally in `/app/backend/uploads/` for MVP
- JWT tokens for authentication
- No email verification for MVP (can be added later)
