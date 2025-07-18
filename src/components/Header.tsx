import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserRole } from '@/types';
import { 
  LogOut, 
  User, 
  Users, 
  Home,
  Bell,
  Crown
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLocalization } from '@/context/LocalizationContext';

const getRoleColor = (role?: UserRole): string => {
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

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLocalization();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/33647297-d0f6-4d63-a45d-d86289d50d70.png" 
            alt="Bright Future School" 
            className="h-12" 
          />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-[#00a7b0] transition-colors">{t('home')}</Link>
          <Link to="/services" className="text-gray-600 hover:text-[#00a7b0] transition-colors">{t('services')}</Link>
          <Link to="/about" className="text-gray-600 hover:text-[#00a7b0] transition-colors">{t('about')}</Link>
          <Link to="/contact" className="text-gray-600 hover:text-[#00a7b0] transition-colors">{t('contact')}</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                      <AvatarFallback className={getRoleColor(user?.role)}>
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {user?.role && (
                      <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getRoleColor(user.role)} border-2 border-white`}></span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className={`p-1 rounded-full ${getRoleColor(user?.role)}`}>
                      {user?.role === 'director' ? (
                        <Crown className="h-4 w-4 text-white" />
                      ) : (
                        <User className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <span className="text-sm font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/${user?.role}`} className="cursor-pointer">
                      <Home className="w-4 h-4 mr-2" />
                      {t('dashboard')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      {t('my_profile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex space-x-2">
              <Button variant="ghost" asChild className="hover:text-[#00a7b0]">
                <Link to="/auth/login">{t('login')}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
