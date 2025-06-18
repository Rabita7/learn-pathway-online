
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
      const loggedInUser = JSON.parse(localStorage.getItem('highschool_portal_user') || '{}');
      
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
        case 'manager':
          navigate('/manager');
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
        setEmail('parent@example.com');
        setPassword('password');
        break;
      case 'manager':
        setEmail('manager@school.edu');
        setPassword('password');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BookOpen className="h-12 w-12 text-primary" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/auth/register" className="font-medium text-primary hover:text-primary-focus">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/auth/reset-password" className="font-medium text-primary hover:text-primary-focus">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick Demo Login</span>
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="demo-account">Select Demo Account</Label>
              <Select onValueChange={fillDemoCredentials}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a demo account to try" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Demo Admin Account</SelectItem>
                  <SelectItem value="teacher">Demo Teacher Account</SelectItem>
                  <SelectItem value="student">Demo Student Account</SelectItem>
                  <SelectItem value="parent">Demo Parent Account</SelectItem>
                  <SelectItem value="manager">Demo Manager Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
