import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { users } from '../mock';
import { toast } from '../hooks/use-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - find user by email
    const user = users.find((u) => u.email === formData.email);
    if (user) {
      login(user);
      toast({ description: 'Login successful!' });
      navigate('/');
    } else {
      toast({ description: 'Invalid credentials', variant: 'destructive' });
    }
  };

  // Quick login buttons for demo
  const quickLogin = (userEmail) => {
    const user = users.find((u) => u.email === userEmail);
    if (user) {
      login(user);
      toast({ description: `Logged in as ${user.username}` });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-blue-600">
            Book Odyssey
          </Link>
          <p className="text-gray-600 mt-2">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
            Login
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>

        {/* Demo Quick Login */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-3">Quick Login (Demo)</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => quickLogin('rajesh@example.com')}
              variant="outline"
              size="sm"
              type="button"
            >
              Rajesh
            </Button>
            <Button
              onClick={() => quickLogin('priya@example.com')}
              variant="outline"
              size="sm"
              type="button"
            >
              Priya
            </Button>
            <Button
              onClick={() => quickLogin('amit@example.com')}
              variant="outline"
              size="sm"
              type="button"
            >
              Amit
            </Button>
            <Button
              onClick={() => quickLogin('sneha@example.com')}
              variant="outline"
              size="sm"
              type="button"
            >
              Sneha
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;