
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useLocalization } from '@/context/LocalizationContext';
import { Users, BookOpen, CalendarCheck, ClipboardList } from 'lucide-react';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const { t } = useLocalization();
  
  // In a real app, these would come from API/database
  const stats = [
    {
      title: t('teachers'),
      value: 48,
      icon: <Users className="h-8 w-8 text-primary" />,
      change: '+2 ' + t('this_month'),
      trend: 'positive'
    },
    {
      title: t('classes'),
      value: 124,
      icon: <BookOpen className="h-8 w-8 text-indigo-500" />,
      change: '+4 ' + t('this_week'),
      trend: 'positive'
    },
    {
      title: t('events'),
      value: 8,
      icon: <CalendarCheck className="h-8 w-8 text-amber-500" />,
      change: t('next') + ': ' + t('field_trip'),
      trend: 'neutral'
    },
    {
      title: t('tasks'),
      value: 16,
      icon: <ClipboardList className="h-8 w-8 text-rose-500" />,
      change: '5 ' + t('overdue'),
      trend: 'negative'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('manager')} {t('dashboard')}</h1>
        <p className="text-gray-500">{t('welcome_back')}, {user?.name}!</p>
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
            <CardTitle>{t('recent_activity')}</CardTitle>
            <CardDescription>{t('your_recent_management_activities')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">{t('annual_budget_review')}</p>
                  <p className="text-sm text-gray-500">{t('yesterday_at_2_30_pm')}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">{t('staff_meeting')}</p>
                  <p className="text-sm text-gray-500">{t('monday_at_10_00_am')}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">{t('approved_resource_request')}</p>
                  <p className="text-sm text-gray-500">{t('july_28_2023')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{t('upcoming_tasks')}</CardTitle>
            <CardDescription>{t('tasks_that_need_your_attention')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <div>
                  <p className="font-medium">{t('review_teacher_evaluations')}</p>
                  <p className="text-sm text-gray-500">{t('due_tomorrow')}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <div>
                  <p className="font-medium">{t('approve_curriculum_changes')}</p>
                  <p className="text-sm text-gray-500">{t('due_in_3_days')}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <div>
                  <p className="font-medium">{t('plan_back_to_school_event')}</p>
                  <p className="text-sm text-gray-500">{t('due_next_week')}</p>
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
