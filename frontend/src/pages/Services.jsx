import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Truck, Home, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { mockData } from '../mock';

export const Services = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to specific section if hash is present
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);
  
  const serviceDetails = [
    {
      ...mockData.services[0],
      benefits: [
        "Access to multiple carrier options tailored to your needs",
        "Experienced guidance on Florida's unique insurance requirements",
        "Personalized service from local professionals who understand your area",
        "Policy reviews to ensure your coverage evolves with you",
        "Support available when you need it most"
      ]
    },
    {
      ...mockData.services[1],
      benefits: [
        "Access to multiple carrier options tailored to your needs",
        "Experienced guidance on Florida's unique insurance requirements",
        "Personalized service from local professionals who understand your area",
        "Policy reviews to ensure your coverage evolves with you",
        "Support available when you need it most"
      ]
    },
    {
      ...mockData.services[2],
      benefits: [
        "Access to multiple carrier options tailored to your needs",
        "Experienced guidance on Florida's unique insurance requirements",
        "Personalized service from local professionals who understand your area",
        "Policy reviews to ensure your coverage evolves with you",
        "Support available when you need it most"
      ]
    }
  ];
  
  const iconMap = {
    'Car': Car,
    'Truck': Truck,
    'Home': Home
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-beige to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-navy mb-6">Our Insurance Services</h1>
          <p className="text-xl text-slate max-w-3xl mx-auto leading-relaxed">
            Comprehensive insurance solutions tailored to protect what matters most to you and your business.
          </p>
        </div>
      </section>
      
      {/* Services Detail Sections */}
      {serviceDetails.map((service, index) => {
        const IconComponent = iconMap[service.icon];
        const isEven = index % 2 === 0;
        const sectionId = service.title.toLowerCase().replace(/\s+/g, '-');
        
        return (
          <section key={service.id} id={sectionId} className={`py-16 px-4 sm:px-6 lg:px-8 ${isEven ? 'bg-white' : 'bg-beige'}`}>
            <div className="max-w-7xl mx-auto">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                <div className={!isEven ? 'lg:order-2' : ''}>
                  <div className="inline-flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-gold" />
                    </div>
                    <span className="text-sm font-semibold text-gold uppercase tracking-wide">Insurance Service</span>
                  </div>
                  
                  <h2 className="text-4xl font-bold text-navy mb-6">{service.title}</h2>
                  <p className="text-lg text-slate mb-8 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-navy mb-4">Coverage Includes:</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                          <span className="text-slate">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link to="/contact">
                    <Button className="bg-gold hover:bg-gold-hover text-navy font-semibold px-8 py-4 text-lg transition-all hover:scale-105">
                      Get a Quote
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
                
                <div className={!isEven ? 'lg:order-1' : ''}>
                  <Card className="p-8 bg-navy shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-6">Why Choose This Coverage?</h3>
                    <ul className="space-y-4">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-4 h-4 text-navy" />
                          </div>
                          <span className="text-gray-light">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        );
      })}
      
      {/* Compare Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy mb-4">Not Sure Which Coverage You Need?</h2>
            <p className="text-lg text-slate max-w-2xl mx-auto">
              Our team is here to help you understand your options and find the perfect coverage for your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <Car className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Personal Auto</h3>
              <p className="text-slate mb-4">Best for individuals and families protecting their vehicles</p>
              <Link to="/contact">
                <Button variant="outline" className="w-full border-gold text-navy hover:bg-gold hover:text-navy">
                  Learn More
                </Button>
              </Link>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-gold">
              <Truck className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Commercial Auto</h3>
              <p className="text-slate mb-4">Perfect for businesses with company vehicles or fleets</p>
              <Link to="/contact">
                <Button className="w-full bg-gold hover:bg-gold-hover text-navy font-semibold">
                  Get Quote
                </Button>
              </Link>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <Home className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Homeowners</h3>
              <p className="text-slate mb-4">Essential protection for your home and belongings</p>
              <Link to="/contact">
                <Button variant="outline" className="w-full border-gold text-navy hover:bg-gold hover:text-navy">
                  Learn More
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-navy">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Protected?
          </h2>
          <p className="text-xl text-gray-light mb-8">
            Contact us today for a personalized quote and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-gold hover:bg-gold-hover text-navy font-semibold px-8 py-4 text-lg transition-all hover:scale-105">
                Request a Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href={`tel:${mockData.businessInfo.phone.replace(/[^0-9]/g, '')}`}>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-8 py-4 text-lg transition-all">
                Call {mockData.businessInfo.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
