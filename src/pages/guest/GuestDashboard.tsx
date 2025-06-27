
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, Eye } from 'lucide-react';

const GuestDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to School Management System</h1>
        <p className="text-xl text-muted-foreground">Access your school information and services</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Login</CardTitle>
            <LogIn className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription>
              Sign in to access your personalized dashboard
            </CardDescription>
            <Button 
              onClick={() => navigate('/auth/login')} 
              className="w-full"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Register</CardTitle>
            <UserPlus className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription>
              Create a new account to get started
            </CardDescription>
            <Button 
              onClick={() => navigate('/auth/register')} 
              variant="outline"
              className="w-full"
            >
              Sign Up
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Browse</CardTitle>
            <Eye className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription>
              View public information and announcements
            </CardDescription>
            <Button 
              variant="secondary"
              className="w-full"
              disabled
            >
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuestDashboard;
