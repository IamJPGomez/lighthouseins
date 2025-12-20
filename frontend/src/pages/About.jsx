import React from 'react';
import { CheckCircle, Users, Target, Heart, Clock } from 'lucide-react';
import { Card } from '../components/ui/card';
import { mockData } from '../mock';

export const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-beige to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-navy mb-6">About Lighthouse Insurance</h1>
            <p className="text-xl text-slate max-w-3xl mx-auto leading-relaxed">
              Your trusted insurance partner in Sunrise, Florida, dedicated to providing personalized coverage solutions with exceptional service.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy mb-6">Our Story</h2>
              <div className="space-y-4 text-slate leading-relaxed">
                <p>
                  Lighthouse Insurance Agency was founded with a simple mission: to provide honest, knowledgeable, and personalized insurance services to the Sunrise, Florida community.
                </p>
                <p>
                  Led by Luis, our agency has built a reputation for exceptional customer service, competitive rates, and unwavering dedication to our clients' needs. With over a decade of experience in the insurance industry, we understand that insurance isn't just about policies—it's about protecting what matters most to you.
                </p>
                <p>
                  Our 4.9-star rating and glowing reviews speak to our commitment to making insurance simple, accessible, and tailored to each client's unique situation.
                </p>
              </div>
            </div>
            
            <div className="bg-navy rounded-2xl p-8 shadow-xl">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-gold text-4xl font-bold mb-2">10+</div>
                  <div className="text-white font-semibold">Years of Experience</div>
                  <div className="text-gray-light text-sm mt-2">Serving the Sunrise community</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-gold text-4xl font-bold mb-2">4.9★</div>
                  <div className="text-white font-semibold">Client Satisfaction</div>
                  <div className="text-gray-light text-sm mt-2">Based on 17 Google reviews</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-gold text-4xl font-bold mb-2">100%</div>
                  <div className="text-white font-semibold">Dedicated Service</div>
                  <div className="text-gray-light text-sm mt-2">Always available when you need us</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-beige">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy mb-4">Why Choose Lighthouse Insurance?</h2>
            <p className="text-lg text-slate max-w-2xl mx-auto">
              We're more than just an insurance agency—we're your partners in protection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockData.whyChooseUs.map((item, index) => {
              const icons = [Users, Target, Clock, Heart];
              const IconComponent = icons[index];
              
              return (
                <Card key={index} className="p-6 bg-white hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                  <p className="text-slate leading-relaxed">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy mb-4">Our Core Values</h2>
            <p className="text-lg text-slate max-w-2xl mx-auto">
              These principles guide everything we do at Lighthouse Insurance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Integrity</h3>
              <p className="text-slate leading-relaxed">
                We believe in honest, transparent communication and always doing what's right for our clients.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Compassion</h3>
              <p className="text-slate leading-relaxed">
                We understand that insurance protects what matters most, and we treat every client with care and respect.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Excellence</h3>
              <p className="text-slate leading-relaxed">
                We strive for excellence in every interaction, ensuring you receive the best service and coverage.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-navy">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience the Lighthouse Difference
          </h2>
          <p className="text-xl text-gray-light mb-8">
            Join the many satisfied clients who trust us with their insurance needs.
          </p>
          <a href={`tel:${mockData.businessInfo.phone.replace(/[^0-9]/g, '')}`} className="inline-block">
            <button className="bg-gold hover:bg-gold-hover text-navy font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 hover:shadow-lg">
              Call Us Today: {mockData.businessInfo.phone}
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};
