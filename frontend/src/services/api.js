import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Auth API
export const authAPI = {
  login: async (username, password) => {
    const response = await axios.post(`${API}/auth/login`, { username, password });
    return response.data;
  }
};

// Blog API
export const blogAPI = {
  // Public endpoints
  getPublishedPosts: async (page = 1, category = null) => {
    const params = { page };
    if (category) params.category = category;
    const response = await axios.get(`${API}/blog/posts`, { params });
    return response.data;
  },

  getPostBySlug: async (slug) => {
    const response = await axios.get(`${API}/blog/posts/${slug}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await axios.get(`${API}/blog/categories`);
    return response.data;
  },

  // Admin endpoints (require token)
  getAllPosts: async (token, page = 1, status = null) => {
    const params = { page };
    if (status) params.status = status;
    const response = await axios.get(`${API}/blog/admin/posts`, {
      params,
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getPostById: async (token, postId) => {
    const response = await axios.get(`${API}/blog/admin/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  createPost: async (token, postData) => {
    const response = await axios.post(`${API}/blog/admin/posts`, postData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updatePost: async (token, postId, postData) => {
    const response = await axios.put(`${API}/blog/admin/posts/${postId}`, postData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deletePost: async (token, postId) => {
    const response = await axios.delete(`${API}/blog/admin/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  duplicatePost: async (token, postId) => {
    const response = await axios.post(`${API}/blog/admin/posts/${postId}/duplicate`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};
