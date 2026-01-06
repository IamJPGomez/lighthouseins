import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { blogAPI } from '../services/api';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  LogOut, 
  Eye,
  Calendar,
  User
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, published, draft
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const statusFilter = filter === 'all' ? null : filter;
      const data = await blogAPI.getAllPosts(token, 1, statusFilter);
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await blogAPI.deletePost(token, postId);
      toast.success('Post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const handleDuplicate = async (postId) => {
    try {
      await blogAPI.duplicatePost(token, postId);
      toast.success('Post duplicated successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error duplicating post:', error);
      toast.error('Failed to duplicate post');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lighthouse-logo.svg" 
                alt="Lighthouse Insurance" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold">Blog Management</h1>
                <p className="text-sm text-gray-light">Lighthouse Insurance CMS</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-light">Logged in as</p>
                <p className="font-semibold">{user}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-navy"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-2">
            <Button
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'default' : 'outline'}
              className={filter === 'all' ? 'bg-gold text-navy' : ''}
            >
              All Posts ({posts.length})
            </Button>
            <Button
              onClick={() => setFilter('published')}
              variant={filter === 'published' ? 'default' : 'outline'}
              className={filter === 'published' ? 'bg-gold text-navy' : ''}
            >
              Published
            </Button>
            <Button
              onClick={() => setFilter('draft')}
              variant={filter === 'draft' ? 'default' : 'outline'}
              className={filter === 'draft' ? 'bg-gold text-navy' : ''}
            >
              Drafts
            </Button>
          </div>

          <Link to="/admin/blog/new">
            <Button className="bg-gold hover:bg-gold-hover text-navy font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-slate text-lg mb-4">No posts found</p>
            <Link to="/admin/blog/new">
              <Button className="bg-gold hover:bg-gold-hover text-navy">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Post
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-navy">{post.title}</h3>
                      <Badge 
                        className={
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {post.status}
                      </Badge>
                    </div>
                    
                    <p className="text-slate mb-3 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-slate">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.updated_at)}</span>
                      </div>
                      <div>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    {post.status === 'published' && (
                      <Link to={`/blog/${post.slug}`} target="_blank">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    )}
                    
                    <Link to={`/admin/blog/edit/${post.id}`}>
                      <Button 
                        size="sm" 
                        className="w-full bg-navy hover:bg-navy/90 text-white"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDuplicate(post.id)}
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(post.id, post.title)}
                      className="w-full text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
