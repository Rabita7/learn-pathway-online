
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  User,
  GraduationCap,
  Briefcase,
  ChevronRight
} from 'lucide-react';

const userRoles = [
  {
    icon: <User className="w-8 h-8 text-admin" />,
    title: 'Administrators',
    description: 'Manage school operations, users, and get powerful insights.',
    bgColor: 'bg-admin bg-opacity-10',
    textColor: 'text-admin',
    link: '/auth/login'
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-teacher" />,
    title: 'Teachers',
    description: 'Manage classes, track student progress, and communicate easily.',
    bgColor: 'bg-teacher bg-opacity-10',
    textColor: 'text-teacher',
    link: '/auth/login'
  },
  {
    icon: <Briefcase className="w-8 h-8 text-student" />,
    title: 'Students',
    description: 'Access assignments, track grades, and stay organized.',
    bgColor: 'bg-student bg-opacity-10',
    textColor: 'text-student',
    link: '/auth/login'
  },
  {
    icon: <User className="w-8 h-8 text-parent" />,
    title: 'Parents',
    description: 'Monitor your child\'s progress and stay connected with teachers.',
    bgColor: 'bg-parent bg-opacity-10',
    textColor: 'text-parent',
    link: '/auth/login'
  },
  {
    icon: <Briefcase className="w-8 h-8 text-purple-600" />,
    title: 'Managers',
    description: 'Oversee staff, resources, and school operations efficiently.',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    link: '/auth/manager-register'
  }
];

const UserRolesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Designed for Everyone
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userRoles.map((role, index) => (
            <div 
              key={index} 
              className={`dashboard-card flex items-start space-x-4 ${role.bgColor} border-l-4 ${role.textColor.replace('text', 'border')}`}
            >
              <div className={`p-3 rounded-lg ${role.bgColor}`}>
                {role.icon}
              </div>
              <div>
                <h3 className={`text-xl font-semibold mb-2 ${role.textColor}`}>{role.title}</h3>
                <p className="text-gray-600 mb-4">{role.description}</p>
                <Button variant="link" className={role.textColor} asChild>
                  <Link to={role.link}>
                    Get started
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserRolesSection;
