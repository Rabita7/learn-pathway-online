
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User, Crown, Settings } from 'lucide-react';

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
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-4 hover:bg-gray-50">
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
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white">
            <DropdownMenuItem asChild>
              <button 
                onClick={() => navigate(`/${user.role}/edit-profile`)}
                className="w-full flex items-center px-2 py-2 text-left"
              >
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-2 py-2 text-left text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
