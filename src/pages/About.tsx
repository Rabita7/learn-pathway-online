
import React from 'react';
import { BookOpen, CheckCircle, User, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About HighSchool Portal
            </h1>
            <p className="text-xl text-gray-600">
              A comprehensive platform built to enhance the educational experience for students,
              teachers, parents, and administrators.
            </p>
          </div>
        </div>
      </div>

      {/* Mission section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our mission at HighSchool Portal is to create a seamless connection between all stakeholders in the
                educational process, enabling better communication, more efficient administration, and improved
                learning outcomes.
              </p>
              <p className="text-lg text-gray-700">
                By providing specialized interfaces for administrators, teachers, students, and parents, we ensure
                that everyone has access to the information they need, when they need it, all in one place.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary rounded-full opacity-20"></div>
                <div className="bg-white rounded-lg shadow-xl p-8 relative z-10 border border-gray-100">
                  <BookOpen className="h-16 w-16 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Connecting Education</h3>
                  <p className="text-gray-600">
                    We believe that education flourishes when communication barriers are removed and information
                    flows freely between all parties involved in the educational journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <CheckCircle className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4">Comprehensive Management</h3>
              <p className="text-gray-600">
                From student records and attendance tracking to grade management and communication tools, our
                platform provides all the features needed for modern school administration.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <User className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4">Role-Based Access</h3>
              <p className="text-gray-600">
                Each user type sees a tailored interface designed specifically for their needs, ensuring they have
                access to exactly the information and tools they require.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <Award className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4">Data-Driven Insights</h3>
              <p className="text-gray-600">
                Our reporting tools help administrators and teachers identify trends, track progress, and make
                informed decisions to improve educational outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
            Our team consists of passionate educators, experienced developers, and design experts who understand
            the challenges of modern education and are committed to creating solutions that make a difference.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Education Experts', 'Software Developers', 'UX Designers'].map((team, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{team}</h3>
                <p className="text-gray-600">
                  Working together to create the most effective educational platform possible.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
