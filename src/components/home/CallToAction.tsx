
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#e6f7f8] to-[#f0f9fa]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#0074a1]">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join Bright Future School today and experience a better way to manage education.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild className="bg-[#00a7b0] hover:bg-[#008a92]">
            <Link to="/auth/register">Create Your Account</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-[#00a7b0] text-[#00a7b0] hover:bg-[#e6f7f8]">
            <Link to="/services">Learn About Our Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
