
import React from 'react';
import { useLocalization } from '@/context/LocalizationContext';
import {
  BookOpen,
  Presentation,
  UserCheck,
  CalendarCheck,
  MessageSquare,
} from 'lucide-react';

const FeaturesSection = () => {
  const { t } = useLocalization();
  
  const features = [
    {
      icon: <Presentation className="feature-icon text-[#e91e63]" />,
      title: t('all_in_one_school_management'),
      description: t('manage_students_teachers_classes_grades_attendance')
    },
    {
      icon: <UserCheck className="feature-icon text-[#ffa000]" />,
      title: t('role_based_access_secure'),
      description: t('different_interfaces_for_roles')
    },
    {
      icon: <CalendarCheck className="feature-icon text-[#00a7b0]" />,
      title: t('scheduling_easy_to_use'),
      description: t('easy_class_scheduling_calendar_management')
    },
    {
      icon: <MessageSquare className="feature-icon text-[#0074a1]" />,
      title: t('communication_streamlined'),
      description: t('streamlined_communication_between_stakeholders')
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0074a1]">
          {t('everything_you_need_in_one_place')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="dashboard-card hover:border-[#00a7b0] transition-all duration-300">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

