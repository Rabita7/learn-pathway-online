
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { Users, BookOpen, CalendarCheck, ClipboardList } from 'lucide-react';

const ManagerDashboard = () => {
  const { user } = useAuth();
  
  // In a real app, these would come from API/database
  const stats = [
    {
      title: 'Teachers',
      value: 48,
      icon: <Users className="h-8 w-8 text-primary" />,
      change: '+2 this month',
      trend: 'positive'
    },
    {
      title: 'Classes',
      value: 124,
      icon: <BookOpen className="h-8 w-8 text-indigo-500" />,
      change: '+4 this week',
      trend: 'positive'
    },
    {
      title: 'Events',
      value: 8,
      icon: <CalendarCheck className="h-8 w-8 text-amber-500" />,
      change: 'Next: Field Trip',
      trend: 'neutral'
    },
    {
      title: 'Tasks',
      value: 16,
      icon: <ClipboardList className="h-8 w-8 text-rose-500" />,
      change: '5 overdue',
      trend: 'negative'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manager Dashboard</h1>
        <p className="text-gray-500">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <Badge variant={
                  stat.trend === 'positive' ? 'default' : 
                  stat.trend === 'negative' ? 'destructive' : 'outline'
                } className="mr-1">
                  {stat.trend === 'positive' ? '↑' : 
                   stat.trend === 'negative' ? '↓' : '→'}
                </Badge>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent management activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Annual Budget Review</p>
                  <p className="text-sm text-gray-500">Yesterday at 2:30 PM</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Staff Meeting</p>
                  <p className="text-sm text-gray-500">Monday at 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Approved Resource Request</p>
                  <p className="text-sm text-gray-500">July 28, 2023</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <div>
                  <p className="font-medium">Review teacher evaluations</p>
                  <p className="text-sm text-gray-500">Due tomorrow</p>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <div>
                  <p className="font-medium">Approve curriculum changes</p>
                  <p className="text-sm text-gray-500">Due in 3 days</p>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <div>
                  <p className="font-medium">Plan back-to-school event</p>
                  <p className="text-sm text-gray-500">Due next week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;
