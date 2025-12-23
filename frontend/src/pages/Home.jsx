import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Award, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { mockData } from '../mock';

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-beige to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gold/10 px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="text-sm font-semibold text-navy">
                  {mockData.businessInfo.rating} Stars • {mockData.businessInfo.reviewCount} Reviews
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-navy leading-tight">
                Protecting What Matters Most to You
              </h1>
              
              <p className="text-lg text-slate leading-relaxed">
                Expert insurance solutions in Sunrise, Florida. Get personalized coverage with competitive rates and exceptional service from Luis and the Lighthouse team.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button className="bg-gold hover:bg-gold-hover text-navy font-semibold px-8 py-6 text-lg transition-all hover:scale-105 hover:shadow-lg">
                    Get Your Free Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href={`tel:${mockData.businessInfo.phone.replace(/[^0-9]/g, '')}`}>
                  <Button variant="outline" className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold px-8 py-6 text-lg transition-all">
                    Call {mockData.businessInfo.phone}
                  </Button>
                </a>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="!font-bold !text-3xl text-gold">20+</div>
                  <div className="text-sm text-slate mt-1">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">4.9</div>
                  <div className="!text-sm mt-1 text-slate">Google Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">100%</div>
                  <div className="text-sm text-slate mt-1">Dedicated Service</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-navy rounded-2xl p-8 shadow-2xl">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold rounded-full opacity-10"></div>
                
                <div className="relative space-y-6">
                  <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Shield className="w-12 h-12 text-gold" />
                    <div>
                      <div className="!font-semibold !text-lg text-white">Real Protection, Real People</div>
                      <div className="!text-sm text-gray-light">Coverage explained clearly, tailored to your life.</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Award className="w-12 h-12 text-gold" />
                    <div>
                      <div className="!font-semibold !text-lg text-white">Your Advocate on Price & Protection</div>
                      <div className="!text-sm text-gray-light">We compare carriers to protect your wallet and your risk.</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <Clock className="w-12 h-12 text-gold" />
                    <div>
                      <div className="!font-semibold !text-lg text-white">Here When You Need Us</div>
                      <div className="!text-sm text-gray-light">Fast responses from people who know your name.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Our Insurance Services</h2>
            <p className="text-lg text-slate max-w-2xl mx-auto">
              Comprehensive coverage options designed to protect you, your family, and your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mockData.services.map((service) => {
              const IconComponent = require('lucide-react')[service.icon];
              const sectionId = service.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <Card key={service.id} className="p-8 hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-gold">
                  <div className="w-16 h-16 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">{service.title}</h3>
                  <p className="text-slate mb-6 leading-relaxed">{service.description}</p>
                  <Link to={`/services#${sectionId}`}>
                    <Button variant="outline" className="w-full border-gold text-navy hover:bg-gold hover:text-navy font-semibold transition-all">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </Card>);

            })}
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-beige">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">What Our Clients Say</h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) =>
              <Star key={star} className="w-6 h-6 text-gold fill-gold" />
              )}
              <span className="text-xl font-semibold text-navy ml-2">{mockData.businessInfo.rating} out of 5</span>
            </div>
            <p className="text-slate">Based on {mockData.businessInfo.reviewCount} Google reviews</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mockData.reviews.slice(0, 3).map((review) =>
            <Card key={review.id} className="p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) =>
                <Star key={star} className="w-4 h-4 text-gold fill-gold" />
                )}
                </div>
                <p className="text-slate mb-4 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-navy">{review.author}</div>
                  <div className="text-sm text-slate">{review.date}</div>
                </div>
              </Card>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/reviews">
              <Button className="bg-navy hover:bg-navy/90 text-white font-semibold px-8 py-6 text-lg transition-all hover:scale-105">
                Read All Reviews
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get the Best Insurance Coverage?
          </h2>
          <p className="text-xl text-gray-light mb-8">
            Contact us today for a free quote and experience the Lighthouse difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-gold hover:bg-gold-hover text-navy font-semibold px-8 py-6 text-lg transition-all hover:scale-105">
                Get Your Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href={`tel:${mockData.businessInfo.phone.replace(/[^0-9]/g, '')}`}>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-8 py-6 text-lg transition-all">
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>);

};