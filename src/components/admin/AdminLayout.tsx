
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  BarChart3,
  MessageSquare,
  UserPlus,
  User,
} from 'lucide-react';

const adminMenuItems = [
  { title: 'Dashboard', url: '/admin', icon: Home },
  { title: 'Post Announcement', url: '/admin/post-announcement', icon: MessageSquare },
  { title: 'Manage User Accounts', url: '/admin/manage-users', icon: UserPlus },
  { title: 'Manage Teachers', url: '/admin/manage-teachers', icon: GraduationCap },
  { title: 'Manage Students', url: '/admin/manage-students', icon: Users },
  { title: 'Manage Parents', url: '/admin/manage-parents', icon: User },
  { title: 'Manage Classes', url: '/admin/manage-classes', icon: BookOpen },
  { title: 'View Reports', url: '/admin/view-reports', icon: BarChart3 },
];

function AdminSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/admin') {
      return currentPath === '/admin';
    }
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar className="w-60">
      <SidebarHeader className="p-4 border-b">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const AdminLayout = () => {
  const { user, logout } = useAuth();

  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-white flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">School Management System</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Logout
              </button>
            </div>
          </header>
          
          <main className="flex-1 p-6 bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
