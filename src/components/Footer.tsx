
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">HighSchool Portal</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              A comprehensive platform connecting students, teachers, parents, and administrators.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary text-sm">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-600 hover:text-primary text-sm">FAQ</Link></li>
              <li><Link to="/support" className="text-gray-600 hover:text-primary text-sm">Support</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary text-sm">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-4">
          <p className="text-sm text-center text-gray-600">
            &copy; {new Date().getFullYear()} HighSchool Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
