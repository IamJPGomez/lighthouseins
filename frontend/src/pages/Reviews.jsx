import React, { useState } from 'react';
import { Star, Filter } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockData } from '../mock';

export const Reviews = () => {
  const [displayCount, setDisplayCount] = useState(6);
  
  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 6, mockData.reviews.length));
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-beige to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-navy mb-6">Client Reviews</h1>
          <p className="text-xl text-slate max-w-3xl mx-auto leading-relaxed mb-8">
            See what our satisfied clients have to say about their experience with Lighthouse Insurance.
          </p>
          
          <div className="inline-flex flex-col items-center bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-8 h-8 text-gold fill-gold" />
              ))}
            </div>
            <div className="text-5xl font-bold text-navy mb-2">{mockData.businessInfo.rating}</div>
            <div className="text-slate text-lg">Based on {mockData.businessInfo.reviewCount} Google Reviews</div>
          </div>
        </div>
      </section>
      
      {/* Reviews Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockData.reviews.slice(0, displayCount).map((review) => (
              <Card key={review.id} className="p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-4 h-4 ${
                        star <= review.rating 
                          ? 'text-gold fill-gold' 
                          : 'text-gray-300'
                      }`} />
                    ))}
                  </div>
                  <span className="text-sm text-slate">{review.date}</span>
                </div>
                
                <p className="text-slate leading-relaxed mb-4">
                  "{review.text}"
                </p>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="font-semibold text-navy">{review.author}</div>
                </div>
              </Card>
            ))}
          </div>
          
          {displayCount < mockData.reviews.length && (
            <div className="text-center mt-12">
              <Button 
                onClick={loadMore}
                className="bg-gold hover:bg-gold-hover text-navy font-semibold px-8 py-4 text-lg transition-all hover:scale-105"
              >
                Load More Reviews
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-beige">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-navy mb-2">4.9★</div>
              <div className="text-slate">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-navy mb-2">17</div>
              <div className="text-slate">Total Reviews</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-navy mb-2">100%</div>
              <div className="text-slate">Would Recommend</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-navy mb-2">10+</div>
              <div className="text-slate">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Highlights Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-navy text-center mb-12">What Clients Love Most</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-navy text-white">
              <div className="text-gold text-3xl font-bold mb-3">Professional Service</div>
              <p className="text-gray-light leading-relaxed">
                Clients consistently praise Luis and the team for their professionalism, knowledge, and attention to detail.
              </p>
            </Card>
            
            <Card className="p-6 bg-navy text-white">
              <div className="text-gold text-3xl font-bold mb-3">Always Available</div>
              <p className="text-gray-light leading-relaxed">
                Our commitment to being accessible and responsive is one of our most valued qualities.
              </p>
            </Card>
            
            <Card className="p-6 bg-navy text-white">
              <div className="text-gold text-3xl font-bold mb-3">Best Rates</div>
              <p className="text-gray-light leading-relaxed">
                Competitive pricing and excellent coverage options keep our clients satisfied year after year.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-navy">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Become Our Next Success Story
          </h2>
          <p className="text-xl text-gray-light mb-8">
            Experience the service that earned us a 4.9-star rating.
          </p>
          <a href={`tel:${mockData.businessInfo.phone.replace(/[^0-9]/g, '')}`}>
            <Button className="bg-gold hover:bg-gold-hover text-navy font-semibold px-8 py-4 text-lg transition-all hover:scale-105">
              Contact Us Today
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};
