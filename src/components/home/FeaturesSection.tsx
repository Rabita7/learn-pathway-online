
import React from 'react';
import {
  BookOpen,
  Presentation,
  UserCheck,
  CalendarCheck,
  MessageSquare,
} from 'lucide-react';

const features = [
  {
    icon: <Presentation className="feature-icon text-[#e91e63]" />,
    title: 'All-in-one School Management',
    description: 'Manage students, teachers, classes, grades, and attendance in one unified platform.'
  },
  {
    icon: <UserCheck className="feature-icon text-[#ffa000]" />,
    title: 'Role-based Access',
    description: 'Different interfaces for administrators, teachers, students, and parents.'
  },
  {
    icon: <CalendarCheck className="feature-icon text-[#00a7b0]" />,
    title: 'Scheduling',
    description: 'Easy-to-use class scheduling and calendar management for everyone.'
  },
  {
    icon: <MessageSquare className="feature-icon text-[#0074a1]" />,
    title: 'Communication',
    description: 'Streamlined communication between all stakeholders in the education process.'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0074a1]">
          Everything You Need in One Place
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
