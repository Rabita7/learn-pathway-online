
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const ContactInfo = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold mb-4">Contact Information</h3>
    
    <div className="flex items-start space-x-3">
      <Mail className="w-5 h-5 text-primary mt-1" />
      <div>
        <p className="font-medium">Email</p>
        <p className="text-gray-600">info@highschoolportal.edu</p>
      </div>
    </div>
    
    <div className="flex items-start space-x-3">
      <Phone className="w-5 h-5 text-primary mt-1" />
      <div>
        <p className="font-medium">Phone</p>
        <p className="text-gray-600">(123) 456-7890</p>
      </div>
    </div>
    
    <div className="flex items-start space-x-3">
      <MapPin className="w-5 h-5 text-primary mt-1" />
      <div>
        <p className="font-medium">Address</p>
        <p className="text-gray-600">
          123 Education Lane<br />
          Knowledge City, KS 12345
        </p>
      </div>
    </div>
    
    <div className="pt-4">
      <h3 className="text-xl font-bold mb-4">Office Hours</h3>
      <div className="space-y-2">
        <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
        <p className="text-gray-600">Saturday - Sunday: Closed</p>
      </div>
    </div>
  </div>
);

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    
    toast({
      title: 'Message sent',
      description: 'We will get back to you as soon as possible',
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-100 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
        <p className="text-green-700 mb-6">
          Thank you for reaching out. We will get back to you as soon as possible.
        </p>
        <Button onClick={() => setIsSubmitted(false)}>Send another message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Send us a message</h3>
      
      <div>
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Your name" 
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Your email address" 
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input 
          id="subject" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
          placeholder="What is this regarding?" 
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea 
          id="message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="How can we help you?" 
          className="mt-1"
          rows={5}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

const Contact = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600">
              Have a question or need assistance? We're here to help.
            </p>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 h-fit">
                <ContactInfo />
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 h-fit">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map would be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How do I create an account?",
                answer: "You can create an account by clicking on the 'Register' button in the top right corner of the page and filling out the required information."
              },
              {
                question: "Is HighSchool Portal free to use?",
                answer: "HighSchool Portal offers different plans for schools. Please contact us for more information about pricing and features."
              },
              {
                question: "How can I reset my password?",
                answer: "You can reset your password by clicking on the 'Forgot your password?' link on the login page and following the instructions sent to your email."
              },
              {
                question: "How can my school implement HighSchool Portal?",
                answer: "We offer implementation services for schools. Please contact us for more information about getting started with HighSchool Portal."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
