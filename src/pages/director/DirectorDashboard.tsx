
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, Calendar, TrendingUp, School, Crown } from 'lucide-react';

const DirectorDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'director') {
    return <div>Access denied. Director privileges required.</div>;
  }

  const stats = [
    {
      title: 'Total Teachers',
      value: '45',
      change: '+2 this month',
      icon: GraduationCap,
      color: 'text-blue-600',
    },
    {
      title: 'Total Classes',
      value: '18',
      change: 'Across all grades',
      icon: School,
      color: 'text-green-600',
    },
    {
      title: 'Class Representatives',
      value: '18',
      change: 'All assigned',
      icon: Crown,
      color: 'text-purple-600',
    },
    {
      title: 'Average Attendance',
      value: '94.2%',
      change: '+2.1% from last week',
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ];

  const recentActivities = [
    {
      action: 'Assigned Mrs. Taylor to Grade 10A Biology',
      time: '2 hours ago',
      type: 'assignment',
    },
    {
      action: 'Set Dr. Adams as Grade 9B representative',
      time: '4 hours ago',
      type: 'representative',
    },
    {
      action: 'Reviewed attendance for Grade 11A',
      time: '1 day ago',
      type: 'attendance',
    },
    {
      action: 'Updated teacher qualifications',
      time: '2 days ago',
      type: 'staff',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Director Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Here's an overview of your school management.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest management actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="mt-1">
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common director tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2">
              <button className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm">Assign Teacher to Class</span>
                <GraduationCap className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm">View Class Attendance</span>
                <Calendar className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm">Manage Staff</span>
                <Users className="h-4 w-4" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DirectorDashboard;
