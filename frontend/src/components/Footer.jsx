import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { mockData } from '../mock';

export const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_2bb91f8b-019e-485a-ba3d-6f80e8f45f7f/artifacts/ek1q78r2_lighthouse.ai" 
                alt="Lighthouse Insurance Agency Logo" 
                className="h-12 w-auto"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="flex items-center space-x-3" style={{display: 'none'}}>
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                  <span className="text-navy text-xl font-bold">L</span>
                </div>
                <div>
                  <div className="text-white font-bold text-base leading-tight">Lighthouse</div>
                  <div className="text-gray-light text-xs">Insurance Agency</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-light leading-relaxed">
              Your trusted insurance partner in Sunrise, Florida. Providing personalized coverage solutions since day one.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-light hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm text-gray-light hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-sm text-gray-light hover:text-gold transition-colors">Services</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-light hover:text-gold transition-colors">Blog</Link></li>
              <li><Link to="/reviews" className="text-sm text-gray-light hover:text-gold transition-colors">Reviews</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-light hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-gold font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-light">Personal Auto Insurance</li>
              <li className="text-sm text-gray-light">Commercial Auto Insurance</li>
              <li className="text-sm text-gray-light">Homeowners Insurance</li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-gold font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-light">{mockData.businessInfo.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href={`tel:${mockData.businessInfo.phone.replace(/[^0-9]/g, '')}`} className="text-sm text-gray-light hover:text-gold transition-colors">
                  {mockData.businessInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href={`mailto:${mockData.businessInfo.email}`} className="text-sm text-gray-light hover:text-gold transition-colors">
                  {mockData.businessInfo.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-light">{mockData.businessInfo.hours}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-light">
            © {new Date().getFullYear()} Lighthouse Insurance Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
