import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { categories } from '../mock';
import { Upload, X } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const CreateListingPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    categoryId: '',
    condition: '',
    description: '',
    listingType: '',
    price: '',
    exchangeDetails: '',
    location: user?.location || '',
    images: [],
  });

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...imageUrls] });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    toast({
      title: 'Success!',
      description: 'Your listing has been posted successfully.',
    });
    setTimeout(() => navigate('/dashboard?tab=listings'), 1500);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
      <div>
        <Label htmlFor="title">Book Title *</Label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={formData.title}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Engineering Mathematics by BS Grewal"
        />
      </div>
      <div>
        <Label htmlFor="author">Author</Label>
        <input
          id="author"
          name="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., B.S. Grewal"
        />
      </div>
      <div>
        <Label htmlFor="categoryId">Category *</Label>
        <select
          id="categoryId"
          name="categoryId"
          required
          value={formData.categoryId}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="condition">Condition *</Label>
        <div className="mt-2 space-y-2">
          {['New', 'Like New', 'Good', 'Used'].map((cond) => (
            <label key={cond} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="condition"
                value={cond}
                checked={formData.condition === cond}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">{cond}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description *</Label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the book condition, any markings, missing pages, etc."
        />
      </div>
      <Button
        onClick={() => setStep(2)}
        disabled={!formData.title || !formData.categoryId || !formData.condition || !formData.description}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        Next: Upload Images
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Upload Images</h2>
      <div>
        <Label>Book Images * (Current Condition)</Label>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Click to upload images</p>
            <p className="text-sm text-gray-400 mt-1">Upload multiple photos showing book condition</p>
          </label>
        </div>
        {formData.images.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mt-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} alt={`Upload ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex space-x-4">
        <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
          Back
        </Button>
        <Button
          onClick={() => setStep(3)}
          disabled={formData.images.length === 0}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          Next: Price & Type
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Price & Listing Type</h2>
      <div>
        <Label>Listing Type *</Label>
        <div className="mt-2 space-y-2">
          {['Sell', 'Exchange', 'Both'].map((type) => (
            <label key={type} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="listingType"
                value={type}
                checked={formData.listingType === type}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
      {(formData.listingType === 'Sell' || formData.listingType === 'Both') && (
        <div>
          <Label htmlFor="price">Price (₹) *</Label>
          <input
            id="price"
            name="price"
            type="number"
            required
            value={formData.price}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 500"
          />
        </div>
      )}
      {(formData.listingType === 'Exchange' || formData.listingType === 'Both') && (
        <div>
          <Label htmlFor="exchangeDetails">What would you like in exchange? *</Label>
          <textarea
            id="exchangeDetails"
            name="exchangeDetails"
            required
            value={formData.exchangeDetails}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Looking for Chemistry NCERT or any JEE preparation book"
          />
        </div>
      )}
      <div>
        <Label htmlFor="location">Location *</Label>
        <input
          id="location"
          name="location"
          type="text"
          required
          value={formData.location}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Mumbai, Maharashtra"
        />
      </div>
      <div className="flex space-x-4">
        <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!formData.listingType || !formData.location}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          Post Listing
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Card className="p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CreateListingPage;