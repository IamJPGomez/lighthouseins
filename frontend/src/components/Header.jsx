import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { mockData } from '../mock';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/contact', label: 'Contact' }
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center">
              <span className="text-gold text-2xl font-bold">L</span>
            </div>
            <div>
              <div className="text-navy font-bold text-lg leading-tight">Lighthouse</div>
              <div className="text-slate text-xs">Insurance Agency</div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  isActive(link.path) ? 'text-gold' : 'text-navy'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a href={`tel:${mockData.businessInfo.phone.replace(/[^0-9]/g, '')}`} className="flex items-center space-x-2 text-navy hover:text-gold transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-semibold">{mockData.businessInfo.phone}</span>
            </a>
            <Link to="/contact">
              <Button className="bg-gold hover:bg-gold-hover text-navy font-semibold transition-all hover:scale-105">
                Get a Quote
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-navy"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'text-gold' : 'text-navy hover:text-gold'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <a
                href={`tel:${mockData.businessInfo.phone.replace(/[^0-9]/g, '')}`}
                className="flex items-center space-x-2 text-navy hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-semibold">{mockData.businessInfo.phone}</span>
              </a>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gold hover:bg-gold-hover text-navy font-semibold">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
