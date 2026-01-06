import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { blogAPI } from '../services/api';
import { toast } from 'sonner';

export const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const postData = await blogAPI.getPostBySlug(slug);
      setPost(postData);
      
      // Fetch related posts from same category
      const allPosts = await blogAPI.getPublishedPosts(1, postData.category);
      const related = allPosts.posts
        .filter(p => p.id !== postData.id)
        .slice(0, 3);
      setRelatedPosts(related);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-navy mb-4">Post Not Found</h1>
          <p className="text-slate mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button className="bg-gold hover:bg-gold-hover text-navy font-semibold">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog">
            <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Article Header */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="inline-flex items-center space-x-2 bg-gold/10 px-4 py-2 rounded-full mb-6">
            <Tag className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-navy">{post.category}</span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight">
            {post.title}
          </h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-slate">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gold" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gold" />
              <span>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gold" />
              <span>{post.read_time}</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-navy prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-slate prose-p:leading-relaxed prose-p:mb-6
              prose-ul:text-slate prose-ul:my-6
              prose-li:mb-2
              prose-strong:text-navy prose-strong:font-semibold
              prose-a:text-gold prose-a:hover:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
      
      {/* Author CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-beige">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-navy" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy">Written by {post.author}</h3>
                <p className="text-slate">Insurance Agent at Lighthouse Insurance</p>
              </div>
            </div>
            <p className="text-slate mb-6">
              Have questions about this topic or need personalized insurance advice? Our team is here to help you make informed decisions about your coverage.
            </p>
            <Link to="/contact">
              <Button className="bg-gold hover:bg-gold-hover text-navy font-semibold px-6 py-3">
                Get Advice
              </Button>
            </Link>
          </Card>
        </div>
      </section>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">Related Articles</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="p-6">
                    <div className="inline-flex items-center space-x-2 bg-gold/10 px-3 py-1 rounded-full mb-4">
                      <Tag className="w-3 h-3 text-gold" />
                      <span className="text-xs font-semibold text-navy">{relatedPost.category}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-navy mb-3 leading-tight">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-slate text-sm mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    
                    <Link to={`/blog/${relatedPost.slug}`}>
                      <Button variant="outline" className="w-full border-gold text-navy hover:bg-gold hover:text-navy font-semibold text-sm">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-navy">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get the Right Coverage?
          </h2>
          <p className="text-xl text-gray-light mb-8">
            Let us help you find insurance that fits your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-gold hover:bg-gold-hover text-navy font-semibold px-8 py-4 text-lg transition-all hover:scale-105">
                Get a Free Quote
              </Button>
            </Link>
            <a href="tel:9545843417">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-8 py-4 text-lg transition-all">
                Call (954) 584-3417
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
