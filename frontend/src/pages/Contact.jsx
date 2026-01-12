import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { mockData } from '../mock';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    insuranceType: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API_URL}/contact/quote`, formData);
      toast.success('Quote request submitted! Check your email for confirmation.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        insuranceType: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast.error('Failed to submit quote request. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-beige to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-navy mb-6">Get Your Free Quote</h1>
          <p className="text-xl text-slate max-w-3xl mx-auto leading-relaxed">
            Fill out the form below or give us a call. We're here to help you find the perfect coverage.
          </p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-navy mb-6">Request a Quote</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-navy font-semibold mb-2">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-navy font-semibold mb-2">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-navy font-semibold mb-2">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="insuranceType" className="text-navy font-semibold mb-2">Insurance Type *</Label>
                    <select
                      id="insuranceType"
                      name="insuranceType"
                      required
                      value={formData.insuranceType}
                      onChange={handleChange}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    >
                      <option value="">Select insurance type</option>
                      <option value="personal-auto">Personal Auto Insurance</option>
                      <option value="commercial-auto">Commercial Auto Insurance</option>
                      <option value="homeowners">Homeowners Insurance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-navy font-semibold mb-2">Additional Information</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Tell us more about your insurance needs..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold-hover text-navy font-semibold py-6 text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Your Free Quote'}
                    {!isSubmitting && <Send className="ml-2 w-5 h-5" />}
                  </Button>
                </form>
              </Card>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-navy mb-6">Contact Information</h2>
                <p className="text-slate leading-relaxed mb-8">
                  Prefer to speak directly? We're here to help! Reach out through any of the methods below.
                </p>
              </div>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">Phone</h3>
                    <a href={`tel:${mockData.businessInfo.phone.replace(/[^0-9]/g, '')}`} className="text-slate hover:text-gold transition-colors">
                      {mockData.businessInfo.phone}
                    </a>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">Email</h3>
                    <a href={`mailto:${mockData.businessInfo.email}`} className="text-slate hover:text-gold transition-colors">
                      {mockData.businessInfo.email}
                    </a>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">Address</h3>
                    <p className="text-slate">{mockData.businessInfo.address}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">Business Hours</h3>
                    <p className="text-slate">{mockData.businessInfo.hours}</p>
                  </div>
                </div>
              </Card>
              
              {/* Google Map */}
              <Card className="p-0 overflow-hidden">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Lighthouse+Insurance+Agency+10242+NW+47th+St+Suite+10+Sunrise+FL+33331"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.5!2d-80.2547!3d26.2089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzMyLjAiTiA4MMKwMTUnMTcuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lighthouse Insurance Agency Location"
                    className="pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gold text-navy px-6 py-3 rounded-lg font-semibold shadow-lg">
                      View on Google Maps
                    </div>
                  </div>
                </a>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-navy">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Have Questions? We Have Answers.
          </h2>
          <p className="text-xl text-gray-light mb-8">
            Our team is standing by to help you understand your insurance options.
          </p>
          <a href={`tel:${mockData.businessInfo.phone.replace(/[^0-9]/g, '')}`}>
            <Button className="bg-gold hover:bg-gold-hover text-navy font-semibold px-8 py-4 text-lg transition-all hover:scale-105">
              Call Us Now: {mockData.businessInfo.phone}
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};
