
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ImageCarousel from '@/components/home/ImageCarousel';
import FeaturesSection from '@/components/home/FeaturesSection';
import UserRolesSection from '@/components/home/UserRolesSection';
import CallToAction from '@/components/home/CallToAction';

const Index = () => {
  return (
    <div>
      <HeroSection />
      <ImageCarousel />
      <FeaturesSection />
      <UserRolesSection />
      <CallToAction />
    </div>
  );
};

export default Index;
