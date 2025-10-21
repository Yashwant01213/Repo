import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Film, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner@2.0.3';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(email, password);
    
    if (success) {
      toast.success('Welcome back! Login successful.');
      navigate('/');
    } else {
      toast.error('Invalid email or password. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full mb-4">
              <Film className="w-8 h-8 text-white" />
            </div>
            <h1 className="mb-2">Welcome Back</h1>
            <p className="text-gray-600">Login to book your favorite movies</p>
          </div>

          {/* Login Form */}
          <Card className="p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Logging in...'
                ) : (
                  <>
                    Login
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-red-600 hover:text-red-700">
                  Sign up
                </Link>
              </p>
            </div>
          </Card>

          {/* Demo Credentials */}
          <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-800 mb-2">Demo Credentials:</p>
            <p className="text-xs text-blue-700">
              Email: demo@icinema.com<br />
              Password: demo123
            </p>
            <Button
              onClick={() => {
                setEmail('demo@icinema.com');
                setPassword('demo123');
              }}
              variant="outline"
              size="sm"
              className="mt-2 w-full border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              Use Demo Credentials
            </Button>
          </Card>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
