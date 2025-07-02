
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  User,
  GraduationCap,
  Crown,
  ChevronRight
} from 'lucide-react';

const userRoles = [
  {
    icon: <User className="w-8 h-8 text-red-600" />,
    title: 'Administrators',
    description: 'Manage school operations, users, and get powerful insights.',
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
    link: '/auth/login'
  },
  {
    icon: <Crown className="w-8 h-8 text-purple-600" />,
    title: 'Directors',
    description: 'Oversee staff assignments, class management, and school operations.',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    link: '/auth/director-register'
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
    title: 'Teachers',
    description: 'Manage classes, track student progress, and communicate easily.',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    link: '/auth/login'
  },
  {
    icon: <User className="w-8 h-8 text-green-600" />,
    title: 'Students',
    description: 'Access assignments, track grades, and stay organized.',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    link: '/auth/login'
  },
  {
    icon: <User className="w-8 h-8 text-yellow-600" />,
    title: 'Parents',
    description: 'Monitor your child\'s progress and stay connected with teachers.',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    link: '/auth/login'
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
