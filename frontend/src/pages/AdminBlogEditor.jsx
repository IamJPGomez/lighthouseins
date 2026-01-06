import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { blogAPI } from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { ArrowLeft, Save, Eye, Bold, Italic, List } from 'lucide-react';
import { toast } from 'sonner';

export const AdminBlogEditor = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Insurance Tips',
    author: 'Luis Rodriguez',
    read_time: '5 min read',
    meta_description: '',
    meta_keywords: '',
    status: 'draft'
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const post = await blogAPI.getPostById(token, id);
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        read_time: post.read_time,
        meta_description: post.meta_description || '',
        meta_keywords: post.meta_keywords || '',
        status: post.status
      });
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load post');
      navigate('/admin/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'title' && !isEditMode) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({
        ...prev,
        slug
      }));
    }
  };

  const insertHtml = (tag) => {
    const textarea = document.getElementById('content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    
    let wrappedText = '';
    if (tag === 'bold') {
      wrappedText = `<strong>${selectedText}</strong>`;
    } else if (tag === 'italic') {
      wrappedText = `<em>${selectedText}</em>`;
    } else if (tag === 'h2') {
      wrappedText = `<h2>${selectedText}</h2>`;
    } else if (tag === 'ul') {
      wrappedText = `<ul>\n  <li>${selectedText}</li>\n</ul>`;
    } else if (tag === 'p') {
      wrappedText = `<p>${selectedText}</p>`;
    }
    
    const newContent = 
      formData.content.substring(0, start) +
      wrappedText +
      formData.content.substring(end);
    
    setFormData(prev => ({
      ...prev,
      content: newContent
    }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + wrappedText.length, start + wrappedText.length);
    }, 0);
  };

  const handleSubmit = async (status) => {
    setSaving(true);

    try {
      if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
        toast.error('Please fill in all required fields');
        setSaving(false);
        return;
      }

      const postData = {
        ...formData,
        status
      };

      if (isEditMode) {
        await blogAPI.updatePost(token, id, postData);
        toast.success(`Post ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
      } else {
        await blogAPI.createPost(token, postData);
        toast.success(`Post ${status === 'published' ? 'published' : 'created as draft'} successfully!`);
      }

      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error(error.response?.data?.detail || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-slate">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-navy text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin/blog">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">
                {isEditMode ? 'Edit Post' : 'Create New Post'}
              </h1>
            </div>
            <div className="text-right text-sm">
              <p className="text-gray-light">Logged in as {user}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8">
          <form className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-navy font-semibold">Title *</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter post title" className="mt-1" required />
            </div>

            <div>
              <Label htmlFor="slug" className="text-navy font-semibold">URL Slug *</Label>
              <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} placeholder="url-friendly-slug" className="mt-1" required />
              <p className="text-xs text-slate mt-1">This will be the URL: /blog/{formData.slug || 'your-slug'}</p>
            </div>

            <div>
              <Label htmlFor="excerpt" className="text-navy font-semibold">Excerpt *</Label>
              <Textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="Brief description for post listing" rows={3} className="mt-1" required />
            </div>

            <div>
              <Label className="text-navy font-semibold">Content * (HTML)</Label>
              <div className="mt-1 border rounded-md bg-white">
                <div className="flex items-center space-x-2 p-2 border-b bg-gray-50">
                  <Button type="button" size="sm" variant="outline" onClick={() => insertHtml('bold')} title="Bold"><Bold className="w-4 h-4" /></Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => insertHtml('italic')} title="Italic"><Italic className="w-4 h-4" /></Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => insertHtml('h2')} title="Heading 2">H2</Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => insertHtml('p')} title="Paragraph">P</Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => insertHtml('ul')} title="Bullet List"><List className="w-4 h-4" /></Button>
                </div>
                <Textarea id="content" name="content" value={formData.content} onChange={handleChange} placeholder="Write your blog post content using HTML tags..." rows={20} className="border-0 rounded-none font-mono text-sm" required />
              </div>
              <p className="text-xs text-slate mt-1">Use HTML tags: &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-navy font-semibold">Category</Label>
                <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold">
                  <option value="Insurance Tips">Insurance Tips</option>
                  <option value="Auto Insurance">Auto Insurance</option>
                  <option value="Homeowners Insurance">Homeowners Insurance</option>
                  <option value="Commercial Insurance">Commercial Insurance</option>
                  <option value="Insurance Claims">Insurance Claims</option>
                </select>
              </div>
              <div>
                <Label htmlFor="author" className="text-navy font-semibold">Author</Label>
                <Input id="author" name="author" value={formData.author} onChange={handleChange} className="mt-1" />
              </div>
            </div>

            <div>
              <Label htmlFor="read_time" className="text-navy font-semibold">Read Time</Label>
              <Input id="read_time" name="read_time" value={formData.read_time} onChange={handleChange} placeholder="5 min read" className="mt-1" />
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-navy mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="meta_description" className="text-navy font-semibold">Meta Description</Label>
                  <Textarea id="meta_description" name="meta_description" value={formData.meta_description} onChange={handleChange} placeholder="SEO meta description (150-160 characters)" rows={2} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="meta_keywords" className="text-navy font-semibold">Meta Keywords</Label>
                  <Input id="meta_keywords" name="meta_keywords" value={formData.meta_keywords} onChange={handleChange} placeholder="keyword1, keyword2, keyword3" className="mt-1" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <Link to="/admin/blog"><Button type="button" variant="outline">Cancel</Button></Link>
              <div className="flex space-x-3">
                <Button type="button" onClick={() => handleSubmit('draft')} disabled={saving} variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                  <Save className="w-4 h-4 mr-2" />Save as Draft
                </Button>
                <Button type="button" onClick={() => handleSubmit('published')} disabled={saving} className="bg-gold hover:bg-gold-hover text-navy font-semibold">
                  <Eye className="w-4 h-4 mr-2" />{isEditMode ? 'Update & Publish' : 'Publish'}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};