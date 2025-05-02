import React, { useEffect, useState } from 'react';
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
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';

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

const schoolImages = [
  {
    src: "/lovable-uploads/ad18b617-65cf-4042-bacd-ea5985be7dcd.png",
    alt: "Teacher engaging with classroom of students",
    caption: "Interactive classroom environment with engaged students"
  },
  {
    src: "/lovable-uploads/81944bc0-ae37-4608-afee-4f4ae9d45726.png",
    alt: "Teacher interacting with students raising hands",
    caption: "Active participation in classroom discussions"
  },
  {
    src: "/lovable-uploads/1257f99c-c1a0-45e8-a47b-fa818e4dfe33.png", 
    alt: "School buses in parking lot",
    caption: "Safe and reliable transportation services"
  },
  {
    src: "/lovable-uploads/4171ebc7-9c1f-41c4-98e4-2c8285af94b7.png",
    alt: "Graduates throwing caps in celebration",
    caption: "Celebrating academic achievements and success"
  }
];

const ImageCarousel = () => {
  const [api, setApi] = useState<any>(null);
  
  // Setup autoplay functionality using useEffect
  useEffect(() => {
    if (!api) return;
    
    // Set an interval for autoplay
    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    
    // Clear interval on component unmount
    return () => clearInterval(autoplayInterval);
  }, [api]);

  return (
    <div className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our School Life
        </h2>
        <div className="relative mx-auto max-w-5xl">
          <Carousel 
            className="w-full" 
            opts={{ loop: true, align: "start" }}
            setApi={setApi}
          >
            <CarouselContent>
              {schoolImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-full">
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl">
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full aspect-[16/9] object-cover"
                      />
                      <div className="p-4 bg-gray-50">
                        <p className="text-sm text-gray-600">{image.caption}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -left-12 -right-12 hidden md:flex">
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

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
      <ImageCarousel />
      <FeaturesSection />
      <UserRolesSection />
      <section className="py-16 bg-primary bg-opacity-5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of schools already using our platform to improve education management.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/auth/register">Create Your Account</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">Learn About Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
