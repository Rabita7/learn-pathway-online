
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  GraduationCap,
  Users,
  School,
  Calendar,
  Bus,
  Shield,
  Settings,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

const services = [
  {
    icon: <School className="h-10 w-10 text-primary mb-4" />,
    title: "Academic Programs",
    description: "Comprehensive curriculum designed to engage and challenge students at all levels, from standard courses to advanced placement and special education services."
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary mb-4" />,
    title: "Scheduling & Attendance",
    description: "Powerful tools for managing class schedules, tracking attendance, and organizing school-wide events and activities."
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-primary mb-4" />,
    title: "Performance Tracking",
    description: "Advanced assessment and grading systems to monitor student progress, identify areas for improvement, and celebrate achievements."
  },
  {
    icon: <Bus className="h-10 w-10 text-primary mb-4" />,
    title: "Transportation Services",
    description: "Safe and reliable transportation with real-time tracking, route optimization, and parent notifications for peace of mind."
  },
  {
    icon: <Shield className="h-10 w-10 text-primary mb-4" />,
    title: "Campus Security",
    description: "Comprehensive security measures including visitor management, emergency protocols, and secure digital access controls."
  },
  {
    icon: <MessageCircle className="h-10 w-10 text-primary mb-4" />,
    title: "Communication Platform",
    description: "Streamlined channels for announcements, direct messaging, and parent-teacher conferences to keep everyone connected."
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our School Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive educational solutions designed to support students, teachers, and parents throughout the academic journey.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">
                Contact Us
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="dashboard-card hover:shadow-lg transition-all">
                {service.icon}
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Image Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Classroom Excellence</h2>
              <p className="text-gray-600 mb-4">
                Our dedicated teachers engage with students through interactive learning methods that foster critical thinking and creativity. Small class sizes ensure every student receives the attention they deserve.
              </p>
              <p className="text-gray-600 mb-6">
                With state-of-the-art facilities and resources, we create an optimal environment for academic growth and development.
              </p>
              <Button variant="outline" asChild>
                <Link to="/about">
                  Learn More About Our Teaching Approach
                </Link>
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/ad18b617-65cf-4042-bacd-ea5985be7dcd.png" 
                alt="Teacher engaging with classroom of students" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transportation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/1257f99c-c1a0-45e8-a47b-fa818e4dfe33.png" 
                alt="School buses in parking lot" 
                className="w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">Safe Transportation</h2>
              <p className="text-gray-600 mb-4">
                Our fleet of well-maintained buses ensures students arrive safely and on time. Experienced drivers follow optimized routes with real-time GPS tracking available to parents.
              </p>
              <p className="text-gray-600 mb-6">
                We maintain strict safety protocols and regular vehicle inspections to provide peace of mind to families who rely on our transportation services.
              </p>
              <Button variant="outline" asChild>
                <Link to="/contact">
                  Inquire About Transportation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Celebrating Student Success</h2>
              <p className="text-gray-600 mb-4">
                We take pride in our graduates who consistently achieve academic excellence and go on to prestigious colleges and universities. Our comprehensive approach to education prepares students for future success.
              </p>
              <p className="text-gray-600 mb-6">
                Through mentorship programs, career counseling, and college preparation services, we help students transition confidently to the next chapter of their academic journey.
              </p>
              <Button variant="outline" asChild>
                <Link to="/about">
                  View Our Success Stories
                </Link>
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/4171ebc7-9c1f-41c4-98e4-2c8285af94b7.png" 
                alt="Graduates throwing caps in celebration" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary bg-opacity-5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Our Services?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our educational community and discover the difference our comprehensive services can make for your child's academic journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/auth/register">Register Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
