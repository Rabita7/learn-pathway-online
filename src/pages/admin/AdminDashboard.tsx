
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocalization } from '@/context/LocalizationContext';
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

const AdminDashboard = () => {
  const { user } = useAuth();
  const { t } = useLocalization();

  if (!user || user.role !== 'admin') {
    return <div>{t('access_denied')}. {t('admin')} {t('privileges_required')}.</div>;
  }

  const statCards = [
    { title: t('total') + ' ' + t('students'), value: '1,234', icon: <Users className="h-8 w-8" />, color: 'bg-blue-100 text-blue-600' },
    { title: t('total') + ' ' + t('teachers'), value: '78', icon: <GraduationCap className="h-8 w-8" />, color: 'bg-purple-100 text-purple-600' },
    { title: t('total') + ' ' + t('parents'), value: '892', icon: <User className="h-8 w-8" />, color: 'bg-orange-100 text-orange-600' },
    { title: t('total') + ' ' + t('classes'), value: '56', icon: <School className="h-8 w-8" />, color: 'bg-green-100 text-green-600' },
  ];

  const recentAnnouncements = [
    { title: t('parent_teacher_conference'), date: '2025-05-15', content: t('annual_parent_teacher_conference_scheduled') },
    { title: t('system_maintenance'), date: '2025-05-02', content: t('system_will_be_down_for_maintenance') },
    { title: t('new_curriculum_update'), date: '2025-04-25', content: t('new_curriculum_updates_have_been_released') },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('welcome')}, {user.name}</h1>
        <p className="text-gray-500">{t('heres_whats_happening_in_your_school')}</p>
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
              <CardTitle>{t('recent_announcements')}</CardTitle>
              <CardDescription>{t('latest_announcements_posted_in_system')}</CardDescription>
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
            <CardTitle>{t('quick_actions')}</CardTitle>
            <CardDescription>{t('common_tasks_you_may_want_to_perform')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Users className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold text-sm">{t('manage_students')}</h3>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <GraduationCap className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold text-sm">{t('manage_teachers')}</h3>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Bell className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold text-sm">{t('post_announcement')}</h3>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <BarChart2 className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold text-sm">{t('view_reports')}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
