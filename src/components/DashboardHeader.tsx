
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User, Crown } from 'lucide-react';

const getRoleColor = (role?: string): string => {
  if (!role) return 'bg-gray-500';
  
  switch (role) {
    case 'admin': return 'bg-red-600';
    case 'teacher': return 'bg-blue-600';
    case 'student': return 'bg-green-600';
    case 'parent': return 'bg-yellow-600';
    case 'director': return 'bg-purple-600';
    default: return 'bg-gray-500';
  }
};

const DashboardHeader = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className={getRoleColor(user.role)}>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 capitalize flex items-center">
              {user.role === 'director' ? (
                <Crown className="h-3 w-3 mr-1" />
              ) : (
                <User className="h-3 w-3 mr-1" />
              )}
              {user.role}
            </p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={logout}
          className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
