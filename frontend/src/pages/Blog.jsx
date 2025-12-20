import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockData } from '../mock';

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Get unique categories
  const categories = ['All', ...new Set(mockData.blogPosts.map(post => post.category))];
  
  // Filter posts by category
  const filteredPosts = selectedCategory === 'All' 
    ? mockData.blogPosts 
    : mockData.blogPosts.filter(post => post.category === selectedCategory);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-beige to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-navy mb-6">Insurance Insights & Tips</h1>
          <p className="text-xl text-slate max-w-3xl mx-auto leading-relaxed">
            Expert advice and guidance to help you make informed insurance decisions.
          </p>
        </div>
      </section>
      
      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gold text-navy shadow-md'
                    : 'bg-gray-100 text-slate hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                {/* Category Badge */}
                <div className="p-6 pb-0">
                  <div className="inline-flex items-center space-x-2 bg-gold/10 px-3 py-1 rounded-full mb-4">
                    <Tag className="w-3 h-3 text-gold" />
                    <span className="text-xs font-semibold text-navy">{post.category}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 pt-2">
                  <h3 className="text-xl font-bold text-navy mb-3 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center space-x-4 text-sm text-slate mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  {/* Read More Link */}
                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="outline" className="w-full border-gold text-navy hover:bg-gold hover:text-navy font-semibold transition-all">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate text-lg">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-navy">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Have Questions About Your Insurance?
          </h2>
          <p className="text-xl text-gray-light mb-8">
            Our team is here to provide personalized guidance and answers.
          </p>
          <Link to="/contact">
            <Button className="bg-gold hover:bg-gold-hover text-navy font-semibold px-8 py-4 text-lg transition-all hover:scale-105">
              Contact Us Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
