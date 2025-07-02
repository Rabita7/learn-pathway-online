
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import DashboardHeader from '@/components/DashboardHeader';
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
  School
} from 'lucide-react';

const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            {getRoleIcon()}
            <div>
              <h2 className="font-semibold text-lg capitalize">{user?.role} Panel</h2>
              <p className="text-sm text-gray-600">{user?.name}</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-4">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                location.pathname === item.path ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-700' : ''
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
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
