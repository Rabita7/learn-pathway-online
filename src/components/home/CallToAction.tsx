
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
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
  );
};

export default CallToAction;
