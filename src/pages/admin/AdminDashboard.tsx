
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalization } from '@/context/LocalizationContext';
import {
  Users,
  UserCheck,
  School,
  MessageSquare,
  BarChart3,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const { t } = useLocalization();

  const quickActions = [
    { icon: Users, label: t('manage_students'), path: '/admin/students', color: 'text-blue-600' },
    { icon: UserCheck, label: t('manage_teachers'), path: '/admin/teachers', color: 'text-green-600' },
    { icon: School, label: t('manage_classes'), path: '/admin/classes', color: 'text-purple-600' },
    { icon: MessageSquare, label: t('post_announcement'), path: '/admin/announcements', color: 'text-orange-600' },
  ];

  const stats = [
    { label: t('total_students'), value: '1,247', icon: Users, trend: '+12', color: 'text-blue-600' },
    { label: t('total_teachers'), value: '85', icon: UserCheck, trend: '+3', color: 'text-green-600' },
    { label: t('total_classes'), value: '42', icon: School, trend: '+2', color: 'text-purple-600' },
    { label: t('announcements'), value: '23', icon: MessageSquare, trend: '+8', color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('welcome_to_admin_dashboard')}</h1>
        <p className="text-muted-foreground">{t('admin_dashboard_description')}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.trend}</span> {t('from_last_week')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('quick_actions')}</CardTitle>
          <CardDescription>{t('common_tasks_you_may_want_to_perform')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button key={index} variant="outline" asChild className="h-20 flex-col gap-2">
                <Link to={action.path}>
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                  <span className="text-sm">{action.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('recent_activity')}</CardTitle>
            <CardDescription>{t('latest_announcements_posted_in_system')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">{t('new_teacher_added')}</p>
                <p className="text-xs text-muted-foreground">2 {t('hours_ago')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">{t('system_maintenance')}</p>
                <p className="text-xs text-muted-foreground">1 {t('day_ago')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">{t('class_schedule_updated')}</p>
                <p className="text-xs text-muted-foreground">3 {t('days_ago')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('system_overview')}</CardTitle>
            <CardDescription>{t('manage_school_system')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">{t('system_health')}</span>
              <span className="text-green-600 text-sm font-medium">{t('excellent')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{t('user_management')}</span>
              <span className="text-blue-600 text-sm font-medium">{t('active')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{t('content_management')}</span>
              <span className="text-green-600 text-sm font-medium">{t('operational')}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

