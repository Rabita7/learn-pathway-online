
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  BookOpen,
  Presentation,
  UserCheck,
  CalendarCheck,
  MessageSquare,
  GraduationCap,
  User,
  Briefcase,
  ChevronRight
} from 'lucide-react';

const features = [
  {
    icon: <Presentation className="feature-icon" />,
    title: 'All-in-one School Management',
    description: 'Manage students, teachers, classes, grades, and attendance in one unified platform.'
  },
  {
    icon: <UserCheck className="feature-icon" />,
    title: 'Role-based Access',
    description: 'Different interfaces for administrators, teachers, students, and parents.'
  },
  {
    icon: <CalendarCheck className="feature-icon" />,
    title: 'Scheduling',
    description: 'Easy-to-use class scheduling and calendar management for everyone.'
  },
  {
    icon: <MessageSquare className="feature-icon" />,
    title: 'Communication',
    description: 'Streamlined communication between all stakeholders in the education process.'
  }
];

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
  }
];

const HeroSection = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to the HighSchool Portal
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A comprehensive platform connecting students, teachers, parents, and administrators for a seamless educational experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link to={`/${user?.role}`}>
                  Go to Dashboard
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/auth/login">
                    Sign In
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/auth/register">Create Account</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need in One Place
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="dashboard-card">
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

const UserRolesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Designed for Everyone
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

const Index = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <UserRolesSection />
      
      <section className="py-16 bg-primary bg-opacity-5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of schools already using our platform to improve education management.
          </p>
          <Button size="lg" asChild>
            <Link to="/auth/register">Create Your Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
