
import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import DashboardHeader from '@/components/DashboardHeader';
import { useToast } from '@/hooks/use-toast';
import { 
  Home, 
  Users, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  BarChart3,
  Settings,
  UserCheck,
  FileText,
  Crown,
  ClipboardList,
  School,
  User,
  LogOut
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Success',
      description: 'You have been logged out successfully',
    });
    navigate('/auth/login');
  };

  const getNavigationItems = () => {
    const basePath = `/${user?.role}`;
    
    switch (user?.role) {
      case 'admin':
        return [
          { path: basePath, label: 'Dashboard', icon: Home },
          { path: `${basePath}/announcements`, label: 'Announcements', icon: MessageSquare },
          { path: `${basePath}/students`, label: 'Students', icon: Users },
          { path: `${basePath}/teachers`, label: 'Teachers', icon: UserCheck },
          { path: `${basePath}/parents`, label: 'Parents', icon: Users },
          { path: `${basePath}/classes`, label: 'Classes', icon: School },
          { path: `${basePath}/reports`, label: 'Reports', icon: BarChart3 },
        ];
      case 'director':
        return [
          { path: basePath, label: 'Dashboard', icon: Home },
          { path: `${basePath}/assign-teachers`, label: 'Assign Teachers', icon: UserCheck },
          { path: `${basePath}/class-attendance`, label: 'Class Attendance', icon: Calendar },
          { path: `${basePath}/manage-staff`, label: 'Manage Staff', icon: Users },
          { path: `${basePath}/write-letters`, label: 'Write Letters', icon: FileText },
        ];
      case 'teacher':
        return [
          { path: basePath, label: 'Dashboard', icon: Home },
          { path: `${basePath}/students`, label: 'Students', icon: Users },
          { path: `${basePath}/grades`, label: 'Grades', icon: BarChart3 },
          { path: `${basePath}/attendance`, label: 'Attendance', icon: Calendar },
          { path: `${basePath}/assignments`, label: 'Assignments', icon: BookOpen },
          { path: `${basePath}/post-assignment`, label: 'Post Assignment', icon: FileText },
          { path: `${basePath}/announcements`, label: 'Announcements', icon: MessageSquare },
        ];
      case 'student':
        return [
          { path: basePath, label: 'Dashboard', icon: Home },
          { path: `${basePath}/grades`, label: 'My Grades', icon: BarChart3 },
          { path: `${basePath}/attendance`, label: 'My Attendance', icon: Calendar },
          { path: `${basePath}/assignments`, label: 'Assignments', icon: BookOpen },
          { path: `${basePath}/schedule`, label: 'Class Schedule', icon: ClipboardList },
          { path: `${basePath}/announcements`, label: 'Announcements', icon: MessageSquare },
          { path: `${basePath}/profile`, label: 'My Profile', icon: Settings },
        ];
      case 'parent':
        return [
          { path: basePath, label: 'Dashboard', icon: Home },
          { path: `${basePath}/child-grades`, label: 'Child Grades', icon: BarChart3 },
          { path: `${basePath}/child-attendance`, label: 'Child Attendance', icon: Calendar },
          { path: `${basePath}/announcements`, label: 'Announcements', icon: MessageSquare },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'director':
        return <Crown className="h-5 w-5" />;
      case 'admin':
        return <Settings className="h-5 w-5" />;
      case 'teacher':
        return <BookOpen className="h-5 w-5" />;
      case 'student':
        return <Users className="h-5 w-5" />;
      case 'parent':
        return <Users className="h-5 w-5" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  const getRoleColor = () => {
    switch (user?.role) {
      case 'director':
        return 'text-purple-600';
      case 'admin':
        return 'text-red-600';
      case 'teacher':
        return 'text-blue-600';
      case 'student':
        return 'text-green-600';
      case 'parent':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access the dashboard.</p>
          <Link 
            to="/auth/login" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gray-100 ${getRoleColor()}`}>
              {getRoleIcon()}
            </div>
            <div>
              <h2 className="font-semibold text-lg capitalize text-gray-900">
                {user.role} Panel
              </h2>
              <p className="text-sm text-gray-600 truncate">{user.name}</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-4 flex-1 px-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-4 space-y-2">
          <Link
            to={`/${user.role}/edit-profile`}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <User className="h-5 w-5 mr-3" />
            Edit Profile
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
