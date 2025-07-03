
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, Loader } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      // Get user from context after login to determine role-based redirect
      const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      toast({
        title: 'Success',
        description: 'You have successfully logged in',
      });
      
      // Redirect to role-specific dashboard based on user's actual role
      switch (loggedInUser.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'student':
          navigate('/student');
          break;
        case 'parent':
          navigate('/parent');
          break;
        case 'director':
          navigate('/director');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to login',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes, provide example login credentials
  const fillDemoCredentials = (role: string) => {
    switch (role) {
      case 'admin':
        setEmail('admin@school.edu');
        setPassword('password');
        break;
      case 'teacher':
        setEmail('teacher@school.edu');
        setPassword('password');
        break;
      case 'student':
        setEmail('student@school.edu');
        setPassword('password');
        break;
      case 'parent':
        setEmail('parent@school.edu');
        setPassword('password');
        break;
      case 'director':
        setEmail('director@school.edu');
        setPassword('password');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access your school portal
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 h-11"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 h-11"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link 
                to="/auth/reset-password" 
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>

        {/* Demo Accounts Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Try Demo Accounts
            </h3>
            <p className="text-sm text-gray-600">
              Select a role to auto-fill credentials
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="demo-select" className="text-sm font-medium text-gray-700">
              Choose Demo Account
            </Label>
            <Select onValueChange={fillDemoCredentials}>
              <SelectTrigger id="demo-select" className="h-11">
                <SelectValue placeholder="Select a demo account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">👨‍💼 Admin Account</SelectItem>
                <SelectItem value="director">👑 Director Account</SelectItem>
                <SelectItem value="teacher">👩‍🏫 Teacher Account</SelectItem>
                <SelectItem value="student">🎓 Student Account</SelectItem>
                <SelectItem value="parent">👨‍👩‍👧‍👦 Parent Account</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Need an account? Contact your school administrator
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
