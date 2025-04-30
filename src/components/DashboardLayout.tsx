
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  Home,
  Users,
  GraduationCap,
  ClipboardList,
  Book,
  Calendar,
  Bell,
  ChevronRight,
  School,
  UserCog,
  BookOpen,
  User,
} from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
      active
        ? "bg-primary text-white"
        : "text-gray-600 hover:bg-gray-100"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    // Redirect to login if not authenticated
    React.useEffect(() => {
      navigate('/auth/login');
    }, [navigate]);
    return null;
  }

  // Define sidebar links based on user role
  const getSidebarLinks = () => {
    switch (user.role) {
      case 'admin':
        return (
          <>
            <SidebarLink to="/admin" icon={<Home className="w-5 h-5" />} label="Dashboard" />
            <SidebarLink to="/admin/manage-students" icon={<Users className="w-5 h-5" />} label="Manage Students" />
            <SidebarLink to="/admin/manage-teachers" icon={<GraduationCap className="w-5 h-5" />} label="Manage Teachers" />
            <SidebarLink to="/admin/manage-parents" icon={<User className="w-5 h-5" />} label="Manage Parents" />
            <SidebarLink to="/admin/manage-classes" icon={<School className="w-5 h-5" />} label="Manage Classes" />
            <SidebarLink to="/admin/view-reports" icon={<ClipboardList className="w-5 h-5" />} label="View Reports" />
            <SidebarLink to="/admin/post-announcement" icon={<Bell className="w-5 h-5" />} label="Post Announcement" />
          </>
        );
      case 'teacher':
        return (
          <>
            <SidebarLink to="/teacher" icon={<Home className="w-5 h-5" />} label="Dashboard" />
            <SidebarLink to="/teacher/view-students" icon={<Users className="w-5 h-5" />} label="View Students" />
            <SidebarLink to="/teacher/manage-grades" icon={<ClipboardList className="w-5 h-5" />} label="Manage Grades" />
            <SidebarLink to="/teacher/manage-attendance" icon={<Calendar className="w-5 h-5" />} label="Manage Attendance" />
            <SidebarLink to="/teacher/post-assignment" icon={<Book className="w-5 h-5" />} label="Post Assignment" />
            <SidebarLink to="/teacher/announcements" icon={<Bell className="w-5 h-5" />} label="Announcements" />
          </>
        );
      case 'student':
        return (
          <>
            <SidebarLink to="/student" icon={<Home className="w-5 h-5" />} label="Dashboard" />
            <SidebarLink to="/student/view-grades" icon={<ClipboardList className="w-5 h-5" />} label="View Grades" />
            <SidebarLink to="/student/view-attendance" icon={<Calendar className="w-5 h-5" />} label="View Attendance" />
            <SidebarLink to="/student/class-schedule" icon={<Calendar className="w-5 h-5" />} label="Class Schedule" />
            <SidebarLink to="/student/assignments" icon={<Book className="w-5 h-5" />} label="Assignments" />
            <SidebarLink to="/student/announcements" icon={<Bell className="w-5 h-5" />} label="Announcements" />
          </>
        );
      case 'parent':
        return (
          <>
            <SidebarLink to="/parent" icon={<Home className="w-5 h-5" />} label="Dashboard" />
            <SidebarLink to="/parent/view-child-grades" icon={<ClipboardList className="w-5 h-5" />} label="View Child's Grades" />
            <SidebarLink to="/parent/view-child-attendance" icon={<Calendar className="w-5 h-5" />} label="View Child's Attendance" />
            <SidebarLink to="/parent/announcements" icon={<Bell className="w-5 h-5" />} label="Announcements" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">HighSchool Portal</span>
          </Link>
        </div>
        
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full bg-${user.role}`}>
              <UserCog className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500 capitalize">{user.role}</div>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-1">
          {getSidebarLinks()}
        </nav>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold capitalize">{user.role} Dashboard</h1>
            <button 
              onClick={logout}
              className="text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
