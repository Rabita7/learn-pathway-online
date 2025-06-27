
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Users,
  GraduationCap,
  User,
  School,
  Bell,
  Clipboard,
  BarChart2
} from 'lucide-react';

const statCards = [
  { title: 'Total Students', value: '1,234', icon: <Users className="h-8 w-8" />, color: 'bg-blue-100 text-blue-600' },
  { title: 'Total Teachers', value: '78', icon: <GraduationCap className="h-8 w-8" />, color: 'bg-purple-100 text-purple-600' },
  { title: 'Total Parents', value: '892', icon: <User className="h-8 w-8" />, color: 'bg-orange-100 text-orange-600' },
  { title: 'Total Classes', value: '56', icon: <School className="h-8 w-8" />, color: 'bg-green-100 text-green-600' },
];

const recentAnnouncements = [
  { title: 'Parent-Teacher Conference', date: '2025-05-15', content: 'Annual parent-teacher conference scheduled for next month.' },
  { title: 'System Maintenance', date: '2025-05-02', content: 'System will be down for maintenance this weekend.' },
  { title: 'New Curriculum Update', date: '2025-04-25', content: 'New curriculum updates have been released.' },
];

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="text-gray-500">Here's what's happening in your school</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Announcements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Announcements</CardTitle>
              <CardDescription>Latest announcements posted in the system</CardDescription>
            </div>
            <Bell className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement, index) => (
                <div key={index} className="border-l-4 border-primary p-4 bg-muted/50 rounded-r-md">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold">{announcement.title}</h4>
                    <span className="text-xs text-muted-foreground">{announcement.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{announcement.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you may want to perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Manage Students', icon: <Users className="h-8 w-8" />, path: '/admin/manage-students', color: 'bg-blue-100 text-blue-600' },
                { title: 'Manage Teachers', icon: <GraduationCap className="h-8 w-8" />, path: '/admin/manage-teachers', color: 'bg-purple-100 text-purple-600' },
                { title: 'Post Announcement', icon: <Bell className="h-8 w-8" />, path: '/admin/post-announcement', color: 'bg-yellow-100 text-yellow-600' },
                { title: 'View Reports', icon: <BarChart2 className="h-8 w-8" />, path: '/admin/view-reports', color: 'bg-green-100 text-green-600' },
              ].map((action, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center">
                  <div className={`p-3 rounded-full ${action.color} mb-3`}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium">{action.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Activity */}
      <Card>
        <CardHeader>
          <CardTitle>System Activity</CardTitle>
          <CardDescription>Recent activity in the portal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: 'Jane Smith', action: 'updated student grades', time: '2 hours ago', icon: <Clipboard className="h-5 w-5" /> },
              { user: 'Mark Johnson', action: 'posted a new announcement', time: '5 hours ago', icon: <Bell className="h-5 w-5" /> },
              { user: 'Sarah Brown', action: 'created a new class section', time: '1 day ago', icon: <School className="h-5 w-5" /> },
              { user: 'Robert Davis', action: 'added a new student', time: '2 days ago', icon: <User className="h-5 w-5" /> },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-md transition-colors">
                <div className="bg-primary bg-opacity-10 p-2 rounded-full text-primary">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
