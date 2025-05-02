
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* School Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">HighSchool Portal</span>
            </Link>
            <p className="text-gray-400 mb-6">
              A comprehensive platform connecting students, teachers, parents, and administrators.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/auth/login" className="text-gray-400 hover:text-primary transition-colors">Login</Link></li>
              <li><Link to="/auth/register" className="text-gray-400 hover:text-primary transition-colors">Register</Link></li>
            </ul>
          </div>
          
          {/* Portal Access */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Portal Access</h3>
            <ul className="space-y-2">
              <li><Link to="/admin" className="text-gray-400 hover:text-primary transition-colors">Admin Portal</Link></li>
              <li><Link to="/teacher" className="text-gray-400 hover:text-primary transition-colors">Teacher Portal</Link></li>
              <li><Link to="/student" className="text-gray-400 hover:text-primary transition-colors">Student Portal</Link></li>
              <li><Link to="/parent" className="text-gray-400 hover:text-primary transition-colors">Parent Portal</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400">123 Education Ave, Learning City, ED 12345</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-gray-400">info@highschoolportal.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-800 py-8 mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-semibold text-xl mb-2 text-white">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with the latest news and announcements</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-sm text-center text-gray-500">
            &copy; {currentYear} HighSchool Portal. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-primary transition-colors">Privacy Policy</Link>
            <span className="text-gray-700">|</span>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-primary transition-colors">Terms of Service</Link>
            <span className="text-gray-700">|</span>
            <Link to="/accessibility" className="text-xs text-gray-500 hover:text-primary transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
