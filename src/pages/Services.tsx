
import React from 'react';
import { useLocalization } from '@/context/LocalizationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, BarChart, Calendar, GraduationCap, MessageSquare, FileText, Settings } from 'lucide-react';

const Services = () => {
  const { t } = useLocalization();

  const services = [
    {
      icon: BookOpen,
      title: t('academic_management'),
      description: t('academic_management_description'),
      color: 'text-blue-500'
    },
    {
      icon: Users,
      title: t('student_tracking'),
      description: t('student_tracking_description'),
      color: 'text-green-500'
    },
    {
      icon: BarChart,
      title: t('data_driven_insights'),
      description: t('data_driven_insights_description'),
      color: 'text-purple-500'
    },
    {
      icon: Calendar,
      title: t('attendance_management'),
      description: t('attendance_management_description'),
      color: 'text-orange-500'
    },
    {
      icon: GraduationCap,
      title: t('grade_management'),
      description: t('grade_management_description'),
      color: 'text-red-500'
    },
    {
      icon: MessageSquare,
      title: t('communication_tools'),
      description: t('communication_tools_description'),
      color: 'text-cyan-500'
    },
    {
      icon: FileText,
      title: t('report_generation'),
      description: t('report_generation_description'),
      color: 'text-indigo-500'
    },
    {
      icon: Settings,
      title: t('administrative_tools'),
      description: t('administrative_tools_description'),
      color: 'text-gray-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('our_services')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('comprehensive_school_management_solutions')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <service.icon className={`h-8 w-8 ${service.color}`} />
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6">{t('why_choose_our_platform')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">{t('role_based_access')}</h3>
            <p className="text-muted-foreground">{t('role_based_access_description')}</p>
          </div>
          <div className="space-y-3">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Settings className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">{t('easy_to_use')}</h3>
            <p className="text-muted-foreground">{t('easy_to_use_description')}</p>
          </div>
          <div className="space-y-3">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <BarChart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">{t('comprehensive_reporting')}</h3>
            <p className="text-muted-foreground">{t('comprehensive_reporting_description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
