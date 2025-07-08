
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
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, Calendar, TrendingUp, School, Crown } from 'lucide-react';

const DirectorDashboard = () => {
  const { user } = useAuth();
  const { t } = useLocalization();

  if (!user || user.role !== 'director') {
    return <div>{t('access_denied')}. {t('director')} {t('privileges_required')}.</div>;
  }

  const stats = [
    {
      title: t('total') + ' ' + t('teachers'),
      value: '45',
      change: '+2 ' + t('this_month'),
      icon: GraduationCap,
      color: 'text-blue-600',
    },
    {
      title: t('total') + ' ' + t('classes'),
      value: '18',
      change: t('across_all_grades'),
      icon: School,
      color: 'text-green-600',
    },
    {
      title: t('class_representatives'),
      value: '18',
      change: t('all_assigned'),
      icon: Crown,
      color: 'text-purple-600',
    },
    {
      title: t('average') + ' ' + t('attendance'),
      value: '94.2%',
      change: '+2.1% ' + t('from_last_week'),
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ];

  const recentActivities = [
    {
      action: t('assigned_mrs_taylor_to_grade_10a_biology'),
      time: '2 ' + t('hours_ago'),
      type: 'assignment',
    },
    {
      action: t('set_dr_adams_as_grade_9b_representative'),
      time: '4 ' + t('hours_ago'),
      type: 'representative',
    },
    {
      action: t('reviewed_attendance_for_grade_11a'),
      time: '1 ' + t('day_ago'),
      type: 'attendance',
    },
    {
      action: t('updated_teacher_qualifications'),
      time: '2 ' + t('days_ago'),
      type: 'staff',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('director')} {t('dashboard')}</h1>
        <p className="text-muted-foreground">
          {t('welcome_back')}, {user.name}! {t('heres_overview_of_your_school_management')}.
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
            <CardTitle>{t('recent_activities')}</CardTitle>
            <CardDescription>{t('your_latest_management_actions')}</CardDescription>
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
            <CardTitle>{t('quick_actions')}</CardTitle>
            <CardDescription>{t('common_director_tasks')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2">
              <button className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm">{t('assign_teacher_to_class')}</span>
                <GraduationCap className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm">{t('view_class_attendance')}</span>
                <Calendar className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm">{t('manage_staff')}</span>
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
